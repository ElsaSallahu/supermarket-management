const router = require("express").Router();
const db = require("../db");
const verifyToken = require("./middleware/verifyToken");

// GET ALL EMPLOYEES
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM employees",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.json(results);
    }
  );
});

// ADD EMPLOYEE
router.post("/", (req, res) => {
  const {
    full_name,
    phone,
    position,
    salary,
  } = req.body;

  const sql = `
    INSERT INTO employees
    (full_name, phone, position, salary)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, phone, position, salary],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne insert");
      }

      res.send("Employee u shtua");
    }
  );
});

// DELETE EMPLOYEE
router.delete("/:id", (req, res) => {
  const sql =
    "DELETE FROM employees WHERE employee_id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Gabim ne delete");
    }

    res.send("Employee u fshi");
  });
});

// UPDATE EMPLOYEE
router.put("/:id", (req, res) => {
  const {
    full_name,
    phone,
    position,
    salary,
  } = req.body;

  const sql = `
    UPDATE employees
    SET
      full_name = ?,
      phone = ?,
      position = ?,
      salary = ?
    WHERE employee_id = ?
  `;

  db.query(
    sql,
    [
      full_name,
      phone,
      position,
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

      res.send("Employee u editua");
    }
  );
});

module.exports = router;