const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
    SELECT 
      produkti_id,
      emri,
      barkodi,
      stoku,
      pragu_minimumi,
      njesia_matese,
      CASE
        WHEN stoku <= pragu_minimumi THEN 'LOW STOCK'
        ELSE 'OK'
      END AS statusi
    FROM produkti
    ORDER BY stoku ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne marrjen e stokut");
    } else {
      res.json(results);
    }
  });
});

module.exports = router;