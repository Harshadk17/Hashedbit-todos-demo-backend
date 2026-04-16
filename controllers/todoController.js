const db = require("../config/db");

// Get all todos
exports.getTodos = (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Add todo
exports.addTodo = (req, res) => {
  const { title, description } = req.body;
  db.query("INSERT INTO todos (title, description) VALUES (?, ?)", [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title,description, completed: false });
  });
};

// Update
exports.updateTodo = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE todos SET completed = !completed WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Updated");
  });
};

// Delete
exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted");
  });
};