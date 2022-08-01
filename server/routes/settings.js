const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");

//For users to change name
router.put("/changename", authorization, async (req, res) => {
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

//For users to change email
router.put("/changeemail", authorization, async (req, res) => {
  try {
    //1. Destructure email
    const { newEmail } = req.body;
    //Function to check validity of email
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    //2. Check if email is valid
    if (!validEmail(newEmail)) {
      return res.status(400).json("Invalid Email");
    } else {
      const email = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [newEmail]
      );
      const profile = await pool.query(
        "SELECT * from users WHERE user_id = $1 AND user_email = $2",
        [req.user.id, newEmail]
      );
      if (profile.rows.length !== 0) {
        //3. Email is the same
        return res.status(400).json("Email was not changed!");
      } else if (email.rows.length !== 0) {
        //4. Email has been taken
        return res.status(400).json("Email has already been taken!");
      } else {
        //5. Change the email
        const newProfile = await pool.query(
          "UPDATE users SET user_email = $1 WHERE user_id = $2 RETURNING *",
          [newEmail, req.user.id]
        );
        res.json(newProfile.rows);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//For users to change password
router.put("/changepassword", authorization, async (req, res) => {
  try {
    //1. Destructure password
    const { newPassword } = req.body;
    //2 Bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(newPassword, salt);
    //3. Change the password
    const newProfile = await pool.query(
      "UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *",
      [bcryptPassword, req.user.id]
    );
    res.json(newProfile.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
