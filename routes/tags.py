from flask import Blueprint, request, jsonify
from models import db, Tag, TagSchema

tags_bp = Blueprint('tags', __name__)
tag_schema = TagSchema()
tags_schema = TagSchema(many=True)

@tags_bp.route('/', methods=['POST'])
def create_tag():
    user_id = request.json.get('user_id')
    name = request.json.get('name')
    color = request.json.get('color')
    
    new_tag = Tag(user_id=user_id, name=name, color=color)
    db.session.add(new_tag)
    db.session.commit()
    
    return tag_schema.jsonify(new_tag), 201

