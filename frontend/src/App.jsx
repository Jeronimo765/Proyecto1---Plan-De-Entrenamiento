import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks().then(setTasks).catch((err) => setError(err.message));
  }, []);

  function handleCreate(task) {
    createTask(task)
      .then((newTask) => setTasks((prev) => [...prev, newTask]))
      .catch((err) => setError(err.message));
  }

  function handleDelete(id) {
    deleteTask(id)
      .then(() => setTasks((prev) => prev.filter((task) => task.id !== id)))
      .catch((err) => setError(err.message));
  }

  function handleUpdate(id, changes) {
    updateTask(id, changes)
      .then((updated) =>
        setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
      )
      .catch((err) => setError(err.message));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Mis Tareas</h1>
        {error && (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
        <TaskForm createTask={handleCreate} />
        <TaskList tasks={tasks} deleteTask={handleDelete} updateTask={handleUpdate} />
      </div>
    </div>
  );
}

export default App;
