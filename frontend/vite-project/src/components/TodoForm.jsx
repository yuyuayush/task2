import React, { useState, useEffect } from "react";

const TodoForm = ({ onSave, editingTodo }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setMessage(editingTodo.message);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: editingTodo?.id, title, message });
    setTitle("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">{editingTodo ? "Update" : "Add"} Todo</button>
    </form>
  );
};

export default TodoForm;
