import React from "react";
import { Link } from "react-router-dom";

const TaskItem = ({ task, onDelete }) => {
  let formattedDate = "Fecha desconocida";
  if (task.createdAt) {
    formattedDate = new Date(task.createdAt).toLocaleString();
  }

  return (
    <li>
      <strong>{task.title}</strong> - {task.description}
      <br />
      <small>Creado: {formattedDate}</small>
      <br />
      <Link to={`/edit/${task.id}`}>Editar</Link>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </li>
  );
};

export default TaskItem;