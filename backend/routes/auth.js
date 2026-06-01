const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", (req, res) => {
  const {
    full_name,
    email,
    password,
    role = "cashier",
  } = req.body;

  const sql = `
    INSERT INTO users
    (full_name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      full_name,
      email,
      password,
      role,
    ],
    (err, result) => {
      if (err) {
        console.log(
          "REGISTER ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
        message:
          "User u regjistrua",
      });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(
    sql,
    [email, password],
    (err, results) => {
      if (err) {
        console.log(err);

        return res
          .status(500)
          .send(
            "Gabim serveri"
          );
      }

      if (
        results.length > 0
      ) {
        const user =
          results[0];

        const token =
          jwt.sign(
            {
              user_id:
                user.user_id,
              email:
                user.email,
              role:
                user.role,
            },
            "supermarket_secret",
            {
              expiresIn:
                "1h",
            }
          );

        res.json({
          success: true,
          user,
          token,
        });
      } else {
        res.json({
          success: false,
          message:
            "Email ose password gabim",
        });
      }
    }
  );
});

module.exports = router;