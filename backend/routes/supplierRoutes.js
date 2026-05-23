const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM suppliers ORDER BY supplier_id DESC", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne marrjen e furnitoreve");
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  const { emri_kompanise, personi_kontaktues, email, telefoni, adresa } = req.body;

  db.query(
    "INSERT INTO suppliers (emri_kompanise, personi_kontaktues, email, telefoni, adresa) VALUES (?, ?, ?, ?, ?)",
    [emri_kompanise, personi_kontaktues, email, telefoni, adresa],
    (err) => {
      if (err) res.status(500).send("Gabim ne shtim");
      else res.send("Furnitori u shtua");
    }
  );
});

router.put("/:id", (req, res) => {
  const { emri_kompanise, personi_kontaktues, email, telefoni, adresa } = req.body;

  db.query(
    "UPDATE suppliers SET emri_kompanise=?, personi_kontaktues=?, email=?, telefoni=?, adresa=? WHERE supplier_id=?",
    [emri_kompanise, personi_kontaktues, email, telefoni, adresa, req.params.id],
    (err) => {
      if (err) res.status(500).send("Gabim ne perditesim");
      else res.send("Furnitori u perditesua");
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM suppliers WHERE supplier_id=?", [req.params.id], (err) => {
    if (err) res.status(500).send("Gabim ne fshirje");
    else res.send("Furnitori u fshi");
  });
});

module.exports = router;