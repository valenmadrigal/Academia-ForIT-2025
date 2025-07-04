import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;