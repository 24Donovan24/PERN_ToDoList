module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
    const { newEmail, newName, newPassword } = req.body;  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      // console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/changeprofile") {
      if (![newEmail, newName, newPassword].every(Boolean)) {
        return res.status(400).json("Missing credentials!");
      } else if (!validEmail(newEmail)) {
        return res.status(400).json("Invalid Email");
      }
    }
  
    next();
  };