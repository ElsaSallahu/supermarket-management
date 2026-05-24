const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS total_products,
      SUM(stoku) AS total_stock,
      SUM(stoku * cmimi_blerjes) AS total_purchase_value,
      SUM(stoku * cmimi_shitjes) AS total_sale_value,
      SUM(CASE WHEN stoku <= pragu_minimumi THEN 1 ELSE 0 END) AS low_stock_products
    FROM produkti
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne raportin e produkteve");
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;