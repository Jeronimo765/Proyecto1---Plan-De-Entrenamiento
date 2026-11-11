from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models import STATUSES, Task

tasks_bp = Blueprint("tasks", __name__, url_prefix="/api/tasks")


@tasks_bp.get("")
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks])


@tasks_bp.get("/<int:task_id>")
def get_task(task_id):
    task = db.get_or_404(Task, task_id)
    return jsonify(task.to_dict())


@tasks_bp.post("")
def create_task():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "El campo 'title' es obligatorio"}), 400

    task = Task(title=title, description=data.get("description"))
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


@tasks_bp.put("/<int:task_id>")
def update_task(task_id):
    task = db.get_or_404(Task, task_id)
    data = request.get_json(silent=True) or {}

    if "title" in data:
        title = data["title"].strip()
        if not title:
            return jsonify({"error": "El campo 'title' no puede estar vacio"}), 400
        task.title = title
    if "description" in data:
        task.description = data["description"]
    if "status" in data:
        if data["status"] not in STATUSES:
            return jsonify({"error": f"'status' debe ser uno de {STATUSES}"}), 400
        task.status = data["status"]

    db.session.commit()
    return jsonify(task.to_dict())


@tasks_bp.delete("/<int:task_id>")
def delete_task(task_id):
    task = db.get_or_404(Task, task_id)
    db.session.delete(task)
    db.session.commit()
    return "", 204
