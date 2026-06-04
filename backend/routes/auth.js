const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const refreshTokens = [];

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
    (err) => {
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
       user,
       accessToken,
       refreshToken,
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

        const accessToken =
          jwt.sign(
            {
              user_id:
                user.user_id,
              email:
                user.email,
              role:
                user.role,
            },
            process.env.JWT_SECRET,
            {
              expiresIn:
                "1h",
            }
          );

        const refreshToken =
          jwt.sign(
            {
              user_id:
                user.user_id,
              email:
                user.email,
              role:
                user.role,
            },
            process.env.REFRESH_SECRET,
            {
              expiresIn:
                "7d",
            }
          );

        refreshTokens.push(
          refreshToken
        );

        res.json({
          success: true,
          user,
          accessToken,
          refreshToken,
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

// REFRESH TOKEN
router.post(
  "/refresh",
  (req, res) => {
    const {
      refreshToken,
    } = req.body;

    if (
      !refreshToken
    ) {
      return res
        .status(401)
        .json({
          message:
            "Refresh token missing",
        });
    }

    if (
      !refreshTokens.includes(
        refreshToken
      )
    ) {
      return res
        .status(403)
        .json({
          message:
            "Invalid refresh token",
        });
    }

    jwt.verify(
      refreshToken,
      process.env
        .REFRESH_SECRET,
      (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({
              message:
                "Token expired",
            });
        }

        const accessToken =
          jwt.sign(
            {
              user_id:
                user.user_id,
              email:
                user.email,
              role:
                user.role,
            },
            process.env.JWT_SECRET,
            {
              expiresIn:
                "1h",
            }
          );

        res.json({
          accessToken,
        });
      }
    );
  }
);
router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  const index =
    refreshTokens.indexOf(
      refreshToken
    );

  if (index > -1) {
    refreshTokens.splice(
      index,
      1
    );
  }

  res.json({
    success: true,
    message:
      "Logged out successfully",
  });
});

module.exports = router;