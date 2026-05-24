const router = require("express").Router();
const db = require("../db");

// GET ALL CASHIERS
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM cashiers",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.json(results);
    }
  );
});

// ADD CASHIER
router.post("/", (req, res) => {
  const {
    full_name,
    shift_time,
    phone,
    salary,
  } = req.body;

  const sql = `
    INSERT INTO cashiers
    (full_name, shift_time, phone, salary)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, shift_time, phone, salary],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne insert");
      }

      res.send("Cashier u shtua");
    }
  );
});

// DELETE CASHIER
router.delete("/:id", (req, res) => {
  const sql =
    "DELETE FROM cashiers WHERE cashier_id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Gabim ne delete");
    }

    res.send("Cashier u fshi");
  });
});

// UPDATE CASHIER
router.put("/:id", (req, res) => {
  const {
    full_name,
    shift_time,
    phone,
    salary,
  } = req.body;

  const sql = `
    UPDATE cashiers
    SET
      full_name = ?,
      shift_time = ?,
      phone = ?,
      salary = ?
    WHERE cashier_id = ?
  `;

  db.query(
    sql,
    [
      full_name,
      shift_time,
      phone,
      salary,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne update");
      }

      res.send("Cashier u editua");
    }
  );
});

module.exports = router;