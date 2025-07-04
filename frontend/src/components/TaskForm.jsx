import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/tasks`)
        .then((res) => res.json())
        .then((data) => {
          const task = data.find((t) => t.id === id);
          if (task) {
            setTitle(task.title);
            setDescription(task.description);
          }
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = { title, description };

    if (id) {
     
      fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then(() => navigate("/"));
    } else {
 
      fetch(`http://localhost:3000/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then(() => navigate("/"));
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Tarea" : "Crear Tarea"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default TaskForm;