const router = require("express").Router();
const db = require("../db");

// GET ALL ROLES
router.get("/", (req, res) => {
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim");
    }

    res.json(results);
  });
});

// ADD ROLE
router.post("/", (req, res) => {
  const { role_name } = req.body;

  const sql =
    "INSERT INTO roles (role_name) VALUES (?)";

  db.query(sql, [role_name], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim ne insert");
    }

    res.send("Role u shtua");
  });
});

// DELETE ROLE
router.delete("/:id", (req, res) => {
  const sql =
    "DELETE FROM roles WHERE role_id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim ne delete");
    }

    res.send("Role u fshi");
  });
});

// UPDATE ROLE
router.put("/:id", (req, res) => {
  const { role_name } = req.body;

  const sql = `
    UPDATE roles
    SET role_name = ?
    WHERE role_id = ?
  `;

  db.query(
    sql,
    [role_name, req.params.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne update");
      }

      res.send("Role u editua");
    }
  );
});

module.exports = router;