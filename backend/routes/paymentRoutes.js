const router = require("express").Router();
const db = require("../db");

// GET payments
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM payments",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.json(results);
    }
  );
});

// ADD payment
router.post("/", (req, res) => {
  const {
    sale_id,
    amount,
    payment_method,
    payment_date,
  } = req.body;

  const sql = `
    INSERT INTO payments
    (sale_id, amount, payment_method, payment_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      sale_id,
      amount,
      payment_method,
      payment_date,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne shtim");
      }
 db.query(
    `
    INSERT INTO invoice
    (
      sale_id,
      invoice_number,
      total_amount,
      invoice_date
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      sale_id,

      // ivoice data
      `INV-${Date.now()}`,

      amount,

      payment_date,
    ]
  );

  res.send(
    "Payment + Invoice created"
  );

    }
  );
});

// DELETE payment
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM payments WHERE payment_id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.send("Payment u fshi");
    }
  );
});

// UPDATE payment
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    sale_id,
    amount,
    payment_method,
    payment_date,
  } = req.body;

  const sql = `
    UPDATE payments
    SET sale_id = ?, amount = ?, payment_method = ?, payment_date = ?
    WHERE payment_id = ?
  `;

  db.query(
    sql,
    [
      sale_id,
      amount,
      payment_method,
      payment_date,
      id,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne update");
      }

      res.send("Payment updated");
    }
  );
});

module.exports = router;