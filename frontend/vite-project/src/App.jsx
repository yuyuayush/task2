import React, { useEffect, useState } from "react";

import "./App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([{id:"1", title:"this test tood",message:"this is only for testing"},{id:"2", title:"this test tood",message:"this is only for testing"}]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8800/todo");
    const data = await response.json();
    setTodos((prevTodos) => [...prevTodos, data]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or update a todo
  const handleSaveTodo = async (todo) => {
    if (todo.id) {
      await fetch(`http://localhost:8800/todo/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
    } else {
      alert("having some issues check the  backend code ");
      await fetch("http://localhost:8800/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
    }
    fetchTodos();
    setEditingTodo(null);
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:8800/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="" style={{display:'flex' , gap:"40px"}}>
      <TodoForm onSave={handleSaveTodo} editingTodo={editingTodo} />
      <TodoList todos={todos} onEdit={setEditingTodo} onDelete={handleDeleteTodo} />
      </div>
    </div>
  );
};

export default App;
