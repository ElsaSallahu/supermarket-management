const express = require("express");
const db = require("../db");

const router = express.Router();

// CREATE ORDER
router.post("/", (req, res) => {
  const { customer_id, customer_name, total_amount, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Shporta eshte e zbrazet" });
  }

  const orderSql = `
    INSERT INTO orders (customer_id, customer_name, total_amount, status)
    VALUES (?, ?, ?, 'Pending')
  `;

  db.query(orderSql, [customer_id, customer_name, total_amount], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gabim ne krijimin e porosise" });
    }

    const orderId = result.insertId;

    const orderItems = items.map((item) => [
      orderId,
      item.produkti_id,
      item.emri,
      item.quantity,
      item.cmimi_shitjes,
      Number(item.cmimi_shitjes) * Number(item.quantity),
    ]);

    const itemsSql = `
      INSERT INTO order_items 
      (order_id, produkti_id, product_name, quantity, price, subtotal)
      VALUES ?
    `;

    db.query(itemsSql, [orderItems], (err2) => {
      if (err2) {
        console.log(err2);
        return res.status(500).json({ message: "Gabim ne ruajtjen e produkteve" });
      }

      res.status(201).json({
        message: "Porosia u konfirmua me sukses",
        order_id: orderId,
      });
    });
  });
});

// GET ALL ORDERS
router.get("/", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY order_id DESC", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gabim ne leximin e porosive" });
    }

    res.json(results);
  });
});

module.exports = router;