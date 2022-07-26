const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//All todos and name
router.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload after passing through the middleware authorization
    // res.json(req.user); //wil display the user_id of the user (uuid)

    const user = await pool.query(
      "SELECT users.user_name, todo.todo_id, todo.description, todo.date FROM users LEFT JOIN todo ON users.user_id = todo.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//Create todo
router.post("/todos", authorization, async(req, res) => {
  try {
      const { description, date } = req.body;
      // console.log(req.user);
      const newToDo = await pool.query("INSERT INTO todo (user_id, description, date) VALUES($1, $2, $3) RETURNING *",
      [req.user.id, description, date]
      );

      res.json(newToDo.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
})

//Update todo
router.put("/todos/:id", authorization, async(req, res) => {
  try {
      const {id} = req.params;
      const {description, date} = req.body;
      const updateTodo = await pool.query("UPDATE todo SET description = $1, date = $2 WHERE todo_id = $3 AND user_id = $4 RETURNING *", 
      [description, date, id, req.user.id]);

      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours!")
      }

      res.json("Todo was updated!");
  } catch (err) {
      console.log(err.message);
  }
})

//Delete todo
router.delete("/todos/:id", authorization, async(req, res) => {
  try {
      const {id} = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *", [id, req.user.id]);
      if (deleteTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }

      res.json("Todo was deleted!");
  } catch (err) {
      console.log(err.message);
  }
})

module.exports = router;
