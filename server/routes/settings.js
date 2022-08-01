const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");

//For users to change profile settings
router.put("/changeprofile", [authorization, validInfo], async (req, res) => {
  try {
    //1. Destructure name, email and password
    const { newName, newEmail, newPassword } = req.body;
    //2. Check if email has been taken
    const email = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 AND user_id != $2",
      [newEmail, req.user.id]
    );
    if (email.rows.length !== 0) {
      //3. Email has been taken
      return res.status(400).json("Email has already been taken!");
    } else {
      //4 Bcrypt password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);

      const bcryptPassword = await bcrypt.hash(newPassword, salt);

      //5. Update profile
      const newProfile = await pool.query(
        "UPDATE users SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4 RETURNING *",
        [newName, newEmail, bcryptPassword, req.user.id]
      );
      res.json(newProfile.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
