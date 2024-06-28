from flask import Blueprint, request, jsonify
from models import db, Task, TaskSchema

from datetime import datetime, timedelta

tasks_bp = Blueprint('tasks', __name__)
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@tasks_bp.route('/', methods=['POST'])
def create_task():
    user_id = request.json.get('user_id')
    title = request.json.get('title')
    description = request.json.get('description')
    priority = request.json.get('priority')
    due_date = request.json.get('due_date')
    
    new_task = Task(user_id=user_id, title=title, description=description, priority=priority, due_date=due_date)
    db.session.add(new_task)
    db.session.commit()
    
    return task_schema.jsonify(new_task), 201

@tasks_bp.route('/', methods=['GET'])
def get_tasks():
    # url 参数?next_period=""
    next_period = request.args.get('next_period', '')
    print("next_period=", next_period)

    # 计算过去一个月的日期范围，互斥
    #now = datetime.utcnow()
    now = datetime.now()
    next_month = now + timedelta(days=30)
    next_week = now + timedelta(days=7)
    next_day = now + timedelta(days=1)

    if next_period in ("month", "week", "day"):
        if "month"==next_period:
            time1=next_week
            time2=next_month
        elif "week"==next_period:
            time1=next_day
            time2=next_week
        elif "day"==next_period:
            time1=now
            time2=next_day
        print("if1, next_period=", next_period, time1, time2)
        # 使用SQLAlchemy查询过去一个时间段的记录
        tasks = Task.query.filter(
            Task.due_date.between(time1, time2),
            Task.completed == None
        ).order_by(
            Task.due_date.desc()
        ).all()
    elif next_period == "due": #过期日程
        print("if2>, next_period=", next_period)
        now = datetime.now()
        tasks = Task.query.filter(
            Task.due_date < now,
            Task.completed == None
        ).order_by(
            Task.due_date.desc()
        ).all()
    elif next_period == "completed": #已完成
        print("if3, next_period=", next_period)
        tasks = Task.query.filter(
            Task.completed == True
        ).order_by(
            Task.due_date.desc()
        ).all()
    else:
        print("else, next_period=", next_period)
        tasks = Task.query.order_by(Task.due_date.asc()).all() #desc, asc

    return tasks_schema.jsonify(tasks), 200


# 查询具体一个任务，通过 task_id
@tasks_bp.route('/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task=Task.query.get(task_id)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    return task_schema.jsonify(task), 201

