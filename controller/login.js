const jwt = require("jsonwebtoken");
const db = require("../router/database-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({
      status: "error",
      error: "please enter email and password",
    });
  else {
    db.query(
      "SELECT * FROM users WHERE email =?",
      [email],
      async (Err, result) => {
        if (Err) throw Err;
        if (
          !result.length ||
          !(await bcrypt.compare(password, result[0].password))
        )
          return res.json({
            status: "error",
            error: "Incorrect email or password",
          });
        else {
          const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
          });
          const cookieOptions = {
            expiresIn: new Date(
              Date.now() + process.env.COOKIE_EXPRIS * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("user", token, cookieOptions);
          return res.json({
            status: "success",
            success: "User has been logged In",
          });
        }
      }
    );
  }
};
module.exports = login;