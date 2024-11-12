import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "todo",
});

// Get all todos
app.get("/todo", (req, res) => {
  const q = "SELECT * FROM todo";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a single todo by ID
app.get("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "SELECT * FROM todo WHERE id = ?";
  db.query(q, [todoId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

// Add a new todo
app.post("/todo", (req, res) => {
  const q = "INSERT INTO todo(`title`, `message`) VALUES (?, ?)";
  const values = [req.body.title, req.body.message];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json({ message: "Todo added successfully", data });
  });
});

// Update an existing todo
app.put("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "UPDATE todo SET `title`= ?, `message`= ? WHERE id = ?";
  const values = [req.body.title, req.body.message];

  db.query(q, [...values, todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json({ message: "Todo updated successfully", data });
  });
});

// Delete a todo
app.delete("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "DELETE FROM todo WHERE id = ?";

  db.query(q, [todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json({ message: "Todo deleted successfully", data });
  });
});

// Start server
app.listen(8800, () => {
  console.log("Connected to backend on port 8800.");
});
