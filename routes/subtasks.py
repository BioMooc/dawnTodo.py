from flask import Blueprint, request, jsonify
from models import db, Subtask, SubtaskSchema

subtasks_bp = Blueprint('subtasks', __name__)
subtask_schema = SubtaskSchema()
subtasks_schema = SubtaskSchema(many=True)

@subtasks_bp.route('/', methods=['POST'])
def create_subtask():
    task_id = request.json.get('task_id')
    title = request.json.get('title')
    
    new_subtask = Subtask(task_id=task_id, title=title)
    db.session.add(new_subtask)
    db.session.commit()
    
    return subtask_schema.jsonify(new_subtask), 201

@subtasks_bp.route('/', methods=['GET'])
def get_subtasks():
    subtasks = Subtask.query.all()
    return subtasks_schema.jsonify(subtasks), 200
