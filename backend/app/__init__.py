import os

from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)

    os.makedirs(app.instance_path, exist_ok=True)

    db.init_app(app)
    CORS(app)

    from app.routes.tasks import tasks_bp

    app.register_blueprint(tasks_bp)

    with app.app_context():
        db.create_all()

    return app
