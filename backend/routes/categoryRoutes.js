const express = require("express");
const router = express.Router();
const db = require("../db");

// GET categories
router.get("/", (req, res) => {
  db.query("SELECT * FROM categories ORDER BY category_id DESC", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne marrjen e kategorive");
    } else {
      res.json(results);
    }
  });
});

// ADD category
router.post("/", (req, res) => {
  const { emri, pershkrimi } = req.body;

  db.query(
    "INSERT INTO categories (emri, pershkrimi) VALUES (?, ?)",
    [emri, pershkrimi],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gabim ne shtimin e kategorise");
      } else {
        res.send("Kategoria u shtua");
      }
    }
  );
});

// UPDATE category
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { emri, pershkrimi } = req.body;

  db.query(
    "UPDATE categories SET emri=?, pershkrimi=? WHERE category_id=?",
    [emri, pershkrimi, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gabim ne perditesim");
      } else {
        res.send("Kategoria u perditesua");
      }
    }
  );
});

// DELETE category
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM categories WHERE category_id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gabim ne fshirje");
      } else {
        res.send("Kategoria u fshi");
      }
    }
  );
});

module.exports = router;