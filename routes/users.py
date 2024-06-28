from flask import Blueprint, request, jsonify
from models import db, User, UserSchema

users_bp = Blueprint('users', __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@users_bp.route('/', methods=['POST'])
def create_user():
    username = request.json.get('username')
    email = request.json.get('email')
    password_hash = request.json.get('password_hash')
    
    new_user = User(username=username, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()
    
    return user_schema.jsonify(new_user), 201

@users_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return users_schema.jsonify(users), 200
