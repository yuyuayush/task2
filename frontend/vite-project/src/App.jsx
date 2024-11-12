import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles/App.scss";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8800/todo");
    const data = await response.json();
    setTodos(data);
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
      <TodoForm onSave={handleSaveTodo} editingTodo={editingTodo} />
      <TodoList todos={todos} onEdit={setEditingTodo} onDelete={handleDeleteTodo} />
    </div>
  );
};

export default App;
