const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//For users to change name
router.put("/", authorization, async (req, res) => {
  try {
    //1. Destructure name
    const { newName } = req.body;
    //2. Check if name is different
    const profile = await pool.query(
      "SELECT * from users WHERE user_id = $1 AND user_name = $2",
      [req.user.id, newName]
    );
    if (profile.rows.length === 0) {
      //3. Change the name
      const newProfile = await pool.query(
        "UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *",
        [newName, req.user.id]
      );
      res.json(newProfile.rows);
    } else {
      //4. Name was same as original
      return res.status(400).json("Name was not changed!");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
