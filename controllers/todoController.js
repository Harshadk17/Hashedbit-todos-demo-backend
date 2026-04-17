const db = require("../config/db");

// Get all todos
// get the todos
exports.getTodos = (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Add the todo
exports.addTodo = (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO todos (title) VALUES (?)", [title], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title, completed: false });
  

});
};

// Update the todo
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

// Delete all todos
exports.clearAllTodos = (req, res) => {
  db.query("DELETE FROM todos", (err) => {
    if (err) return res.status(500).send(err);
    res.send("All todos deleted");
  });
};