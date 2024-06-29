from flask import Blueprint, request, jsonify
from models import db, Task, TaskSchema
from sqlalchemy import or_,and_

from datetime import datetime, timedelta
import json

tasks_bp = Blueprint('tasks', __name__)
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


# add one item
@tasks_bp.route('/', methods=['POST', 'OPTIONS'])
def create_task():
    print("POST method=", "add item")
    if request.method == 'OPTIONS':
        print(">>OPTIONS in create_task")
        #return jsonify({'error': 'Method is OPTIONS'}), 404
        return 'xx', 200 #这个必须有，否则报错，似乎第一次是 OPTIONS 请求，所谓的预请求？
    
    action = request.args.get('action')
    print(">>", "create_task: action=", action)
    
    # PUT 一直失败，用这个代替: update
    if action=="put":
        task_id = request.json.get('task_id')
        task = Task.query.get(task_id)
        task.completed = request.json.get("completed", task.completed)

        db.session.commit()
        return task_schema.jsonify(task), 201
    

    # 新增
    user_id = request.json.get('user_id')
    title = request.json.get('title')
    description = request.json.get('description')
    priority = request.json.get('priority')

    due_date_str = request.json.get('due_date')
    due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None
    
    new_task = Task(user_id=user_id, title=title, description=description, priority=priority, due_date=due_date)
    db.session.add(new_task)
    db.session.commit()
    
    return task_schema.jsonify(new_task), 201


@tasks_bp.route('/', methods=['GET'])
def get_tasks():
    print("get method=", "tasks")
    # url 参数?next_period=""
    next_period = request.args.get('next_period', '')
    print("next_period=", next_period)

    # 计算过去一个月的日期范围，互斥
    #now = datetime.utcnow()
    now = datetime.now()
    next_season = now + timedelta(days=92)
    next_month = now + timedelta(days=30)
    next_week = now + timedelta(days=7)
    next_day = now + timedelta(days=1)

    if next_period in ("season","month", "week", "day"):
        if "season"==next_period:
            time1=next_month
            time2=next_season
        if "month"==next_period:
            time1=next_week
            time2=next_month
        elif "week"==next_period:
            time1=next_day
            time2=next_week
        elif "day"==next_period:
            time1=now
            time2=next_day
        #print("if1, next_period=", next_period, time1, time2)
        # 使用SQLAlchemy查询过去一个时间段的记录
        tasks = Task.query.filter(
            Task.due_date.between(time1, time2),
            (Task.completed == None) | (Task.completed == False)
        ).order_by(
            Task.due_date.desc()
        ).all()
    elif next_period == "due": #过期日程，且未完成
        #print("if2>, next_period=", next_period)
        now = datetime.now()
        tasks = Task.query.filter(
            Task.due_date < now,
            (Task.completed == None) | (Task.completed == False)
        ).order_by(
            Task.due_date.desc()
        ).all()
    elif next_period == "completed": #已完成
        #print("if3, next_period=", next_period)
        tasks = Task.query.filter(
            Task.completed == True
        ).order_by(
            Task.due_date.desc()
        ).all()
    elif next_period == "uncompleted": #未完成
        #print("if3, next_period=", next_period)
        tasks = Task.query.filter(
            (Task.completed == None) | (Task.completed == False)
        ).order_by(
            Task.due_date.desc()
        ).all()
    else:
        #print("else, next_period=", next_period)
        tasks = Task.query.order_by(Task.due_date.asc()).all() #desc, asc

    return tasks_schema.jsonify(tasks), 200


# 查询具体一个任务，通过 task_id
@tasks_bp.route('/<int:task_id>', methods=['GET'])
def get_task(task_id):
    print("get method=", task_id)
    task=Task.query.get(task_id)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    return task_schema.jsonify(task), 201


#更新
@tasks_bp.route('/<int:task_id>', methods=['PUT', "OPTIONS"])
def update_task(task_id):
    print("0>>update_task: ", task_id)
    if request.method == 'OPTIONS':
        print("1>>OPTIONS in update_task")
        #return jsonify({'error': 'Method is OPTIONS'}), 404
        return 'xx', 200 #这个必须有，否则报错，似乎第一次是 OPTIONS 请求，所谓的预请求？
    
    print("2>>update_task: ", task_id)
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    def is_it_true(value):
        return value.lower() == 'true'
    
    task.completed = request.form.get("completed", type=is_it_true)
    db.session.commit()
    
    return task_schema.jsonify(task), 201