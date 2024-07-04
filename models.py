from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.Enum('low', 'medium', 'high'), default='medium')
    due_date = db.Column(db.Date)
    completed = db.Column(db.Boolean, default=False)
    current_step = db.Column(db.Integer, default=0)
    total_steps = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    user = db.relationship('User', backref=db.backref('tasks', lazy=True))


class Subtask(db.Model):
    subtask_id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.task_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    task = db.relationship('Task', backref=db.backref('subtasks', lazy=True))

class Tag(db.Model):
    tag_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(7), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    user = db.relationship('User', backref=db.backref('tags', lazy=True))

class TaskTag(db.Model):
    task_id = db.Column(db.Integer, db.ForeignKey('task.task_id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.tag_id'), primary_key=True)

class Reminder(db.Model):
    reminder_id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.task_id'), nullable=False)
    reminder_time = db.Column(db.DateTime, nullable=False)
    message = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    task = db.relationship('Task', backref=db.backref('reminders', lazy=True))

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        include_fk = True

class SubtaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Subtask
        include_fk = True

class TagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
        include_fk = True

class ReminderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reminder
        include_fk = True