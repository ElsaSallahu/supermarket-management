const router = require("express").Router();
const db = require("../db");


// GET all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim");
    }

    res.json(results);
  });
});


// ADD customer
router.post("/", (req, res) => {
  const { full_name, phone, email, address } = req.body;

  const sql = `
    INSERT INTO customers
    (full_name, phone, email, address)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, phone, email, address],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne shtim");
      }

      res.send("Customer u shtua");
    }
  );
});


// DELETE customer
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM customers WHERE customer_id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne fshirje");
      }

      res.send("Customer u fshi");
    }
  );
});


// UPDATE customer
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    full_name,
    phone,
    email,
    address,
  } = req.body;

  const sql = `
    UPDATE customers
    SET full_name = ?, phone = ?, email = ?, address = ?
    WHERE customer_id = ?
  `;

  db.query(
    sql,
    [full_name, phone, email, address, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne update");
      }

      res.send("Customer u update");
    }
  );
});

module.exports = router;