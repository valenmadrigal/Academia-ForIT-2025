import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:3000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      })
        .then(() => fetchTasks())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div style={{ textAlign: "center" }}>
        <Link to="/create">Crear nueva tarea</Link>
      </div>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;