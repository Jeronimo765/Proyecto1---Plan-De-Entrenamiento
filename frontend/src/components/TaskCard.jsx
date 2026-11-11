import { useState } from "react";
import { STATUSES, getStatus } from "../data/status";

function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const status = getStatus(task.status);

  const handleSave = () => {
    if (!title.trim()) return;
    updateTask(task.id, { title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{task.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{task.description}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className={`text-xs font-medium ${status.color}`}>
          {status.label}
        </span>

        <select
          value={task.status}
          onChange={(e) => updateTask(task.id, { status: e.target.value })}
          className="rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-600 outline-none focus:border-indigo-400"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 pt-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100"
            >
              Editar
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="flex-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
