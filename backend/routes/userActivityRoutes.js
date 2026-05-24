const router = require("express").Router();
const db = require("../db");

// GET ALL ACTIVITIES
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM user_activity",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.json(results);
    }
  );
});

// ADD ACTIVITY
router.post("/", (req, res) => {
  const { user_name, activity_type } =
    req.body;

  const sql = `
    INSERT INTO user_activity
    (user_name, activity_type)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [user_name, activity_type],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne insert");
      }

      res.send("Activity u shtua");
    }
  );
});

// DELETE ACTIVITY
router.delete("/:id", (req, res) => {
  const sql =
    "DELETE FROM user_activity WHERE activity_id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Gabim ne delete");
    }

    res.send("Activity u fshi");
  });
});

// UPDATE ACTIVITY
router.put("/:id", (req, res) => {
  const { user_name, activity_type } =
    req.body;

  const sql = `
    UPDATE user_activity
    SET
      user_name = ?,
      activity_type = ?
    WHERE activity_id = ?
  `;

  db.query(
    sql,
    [
      user_name,
      activity_type,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne update");
      }

      res.send("Activity u editua");
    }
  );
});

module.exports = router;