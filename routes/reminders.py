from flask import Blueprint, request, jsonify
from models import db, Reminder, ReminderSchema

reminders_bp = Blueprint('reminders', __name__)
reminder_schema = ReminderSchema()
reminders_schema = ReminderSchema(many=True)

@reminders_bp.route('/', methods=['POST'])
def create_reminder():
    task_id = request.json.get('task_id')
    reminder_time = request.json.get('reminder_time')
    message = request.json.get('message')
    
    new_reminder = Reminder(task_id=task_id, reminder_time=reminder_time, message=message)
    db.session.add(new_reminder)
    db.session.commit()
    
    return reminder_schema.jsonify(new_reminder), 201

@reminders_bp.route('/', methods=['GET'])
def get_reminders():
    reminders = Reminder.query.all()
    return reminders_schema.jsonify(reminders), 200
