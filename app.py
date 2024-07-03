from flask import Flask, jsonify
from config import Config
from models import db, ma

from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    ma.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    #CORS(app)
    # 配置 CORS，详细配置允许的来源和http请求方法
    CORS(app, resources={r"/*": {"origins": "*"}},
        methods=["GET", "POST", "PUT", "OPTIONS"], supports_credentials=True)

    from routes.users import users_bp
    from routes.tasks import tasks_bp
    from routes.subtasks import subtasks_bp
    from routes.tags import tags_bp
    from routes.reminders import reminders_bp
    
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(tasks_bp, url_prefix='/tasks')
    app.register_blueprint(subtasks_bp, url_prefix='/subtasks')
    app.register_blueprint(tags_bp, url_prefix='/tags')
    app.register_blueprint(reminders_bp, url_prefix='/reminders')
    
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Task Management API!"})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port = 8501)

#export FLASK_APP=app.py
#export FLASK_ENV=development
#flask run