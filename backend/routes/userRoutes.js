const router = require("express").Router();
const db = require("../db");
const verifyToken = require("./middleware/verifyToken");

// GET ALL USERS
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim");
    }

    res.json(results);
  });
});

// ADD USER
router.post("/", (req, res) => {
  const { full_name, email, password, role } = req.body;

  const sql = `
    INSERT INTO users
    (full_name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, email, password, role],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne insert");
      }

      res.send("User u shtua");
    }
  );
});


// DELETE USER
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE user_id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim ne delete");
    }

    res.send("User u fshi");
  });
});
// UPDATE USER
router.put("/:id", (req, res) => {
  const { full_name, email, password, role } = req.body;

  const sql = `
    UPDATE users
    SET full_name = ?, email = ?, password = ?, role = ?
    WHERE user_id = ?
  `;

  db.query(
    sql,
    [full_name, email, password, role, req.params.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne update");
      }

      res.send("User u editua");
    }
  );
});
module.exports = router;