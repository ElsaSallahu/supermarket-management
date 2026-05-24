const router = require("express").Router();
const db = require("../db");


// GET sales
router.get("/", (req, res) => {
  db.query("SELECT * FROM sales", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Gabim");
    }

    res.json(results);
  });
});


// ADD sale
router.post("/", (req, res) => {
  const {
    customer_id,
    total_amount,
    sale_date,
  } = req.body;

  const sql = `
    INSERT INTO sales
    (customer_id, total_amount, sale_date)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [customer_id, total_amount, sale_date],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne shtim");
      }

      res.send("Sale u shtua");
    }
  );
});


// DELETE sale
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM sales WHERE sale_id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne fshirje");
      }

      res.send("Sale u fshi");
    }
  );
});


// UPDATE sale
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    customer_id,
    total_amount,
    sale_date,
  } = req.body;

  const sql = `
    UPDATE sales
    SET customer_id = ?, total_amount = ?, sale_date = ?
    WHERE sale_id = ?
  `;

  db.query(
    sql,
    [customer_id, total_amount, sale_date, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne update");
      }

      res.send("Sale u update");
    }
  );
});

module.exports = router;