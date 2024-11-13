import React from "react";

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="todo-list ">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <h3>{todo.title}</h3>
          <p>{todo.message}</p>
          <button onClick={() => onEdit(todo)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
