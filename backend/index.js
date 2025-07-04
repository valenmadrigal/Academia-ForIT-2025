// Importa express y cors
const express = require("express");
const cors = require("cors");

// Crea la app express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS (permite llamadas desde el frontend)
app.use(cors());

// Array en memoria donde guardamos las tareas
let tasks = [];

// GET /api/tasks - Obtener todas las tareas
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - Crear una nueva tarea
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || "",
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Actualizar una tarea existente
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE /api/tasks/:id - Eliminar una tarea
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Tarea eliminada" });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});