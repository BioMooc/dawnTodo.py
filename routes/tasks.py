from flask import Blueprint, request, jsonify, make_response
from models import db, Task, TaskSchema
from sqlalchemy import or_,and_

from datetime import datetime, timedelta

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
            Task.due_date.asc()
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
            Task.due_date.asc()
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
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    print("1>>", dir(task) )
    print("1.5>", request.json.get("completed"))

    #task.update(request.json)
    task.title = request.json.get("title", task.title)
    task.description = request.json.get("description", task.description)
    task.priority = request.json.get("priority", task.priority)

    # for bool type
    completed=request.json.get("completed", task.completed)
    print("-->0 completed=", completed)
    if isinstance(completed, str):
        print("-->1 completed=", completed)
        task.completed = completed.lower() in ['true', '1', 't', 'y', 'yes']
    if isinstance(completed, bool):
        print("-->2 completed=", completed)
        task.completed = completed

    # for date
    due_date_str = request.json.get("due_date", None)
    if due_date_str is not None:
        task.due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None

    print("2>>", task, task.task_id, task.due_date, task.completed)
    #return jsonify({'error': 'Task not found'}), 404

    db.session.commit()
    return task_schema.jsonify(task), 201



