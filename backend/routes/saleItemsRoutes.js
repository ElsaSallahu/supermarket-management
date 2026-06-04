const router = require("express").Router();
const db = require("../db");

// GET sale items
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM sale_items",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.json(results);
    }
  );
});

// ADD sale item
router.post("/", (req, res) => {
  const {
    sale_id,
    produkti_id,
    quantity,
    price,
    subtotal,
  } = req.body;

  const sql = `
    INSERT INTO sale_items
    (sale_id, produkti_id, quantity, price, subtotal)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      sale_id,
      produkti_id,
      quantity,
      price,
      subtotal,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim ne shtim");
      }

      res.send("Sale item u shtua");
    }
  );
});

// DELETE sale item
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM sale_items WHERE sale_item_id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gabim");
      }

      res.send("Sale item u fshi");
    }
  );
});

// UPDATE sale item
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    sale_id,
    produkti_id,
    quantity,
    price,
    subtotal,
    id
  } = req.body;

  const sql = `
    UPDATE sale_items
    SET sale_id = ?, produkti_id = ?, quantity = ?, price = ?, subtotal = ?
    WHERE sale_item_id = ?
  `;

db.query(
  sql,
  [
    sale_id,
    produkti_id,
    quantity,
    price,
    subtotal,
  ],

  // 🔥 AFTER INSERT
  (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    db.query(
      `
      UPDATE produkti
      SET stoku = stoku - ?
      WHERE produkti_id = ?
      `,
      [ quantity,produkti_id,]
    );

    res.send(
      "Sale item u shtua"
    );
  }
);
});

module.exports = router;