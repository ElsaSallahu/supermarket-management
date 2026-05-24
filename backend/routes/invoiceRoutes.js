const router = require("express").Router();
const db = require("../db");

// GET invoices
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM invoice",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.json(results);
    }
  );
});

// ADD invoice
router.post("/", (req, res) => {
  const {
    sale_id,
    invoice_number,
    total_amount,
    invoice_date,
  } = req.body;

  const sql = `
    INSERT INTO invoice
    (
      sale_id,
      invoice_number,
      total_amount,
      invoice_date
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      sale_id,
      invoice_number,
      total_amount,
      invoice_date,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne shtim");
      }

      res.send("Invoice u shtua");
    }
  );
});

// DELETE invoice
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM invoice WHERE invoice_id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim");
      }

      res.send("Invoice u fshi");
    }
  );
});

// UPDATE invoice
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    sale_id,
    invoice_number,
    total_amount,
    invoice_date,
  } = req.body;

  const sql = `
    UPDATE invoice
    SET sale_id = ?,
        invoice_number = ?,
        total_amount = ?,
        invoice_date = ?
    WHERE invoice_id = ?
  `;

  db.query(
    sql,
    [
      sale_id,
      invoice_number,
      total_amount,
      invoice_date,
      id,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("Gabim ne update");
      }

      res.send(
        "Invoice updated"
      );
    }
  );
});

module.exports = router;