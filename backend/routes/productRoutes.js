const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM produkti ORDER BY produkti_id DESC", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne lexim");
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  const {
    emri,
    barkodi,
    cmimi_blerjes,
    cmimi_shitjes,
    njesia_matese,
    stoku,
    pragu_minimumi,
    data_skadences
  } = req.body;

  const sql = `
    INSERT INTO produkti
    (emri, barkodi, cmimi_blerjes, cmimi_shitjes, njesia_matese, stoku, pragu_minimumi, data_skadences)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [emri, barkodi, cmimi_blerjes, cmimi_shitjes, njesia_matese, stoku, pragu_minimumi, data_skadences],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gabim ne shtim");
      } else {
        res.send("Produkti u shtua");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM produkti WHERE produkti_id = ?", [req.params.id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne fshirje");
    } else {
      res.send("Produkti u fshi");
    }
  });
});

router.put("/:id", (req, res) => {
  const {
    emri,
    barkodi,
    cmimi_blerjes,
    cmimi_shitjes,
    njesia_matese,
    stoku,
    pragu_minimumi,
    data_skadences
  } = req.body;

  const sql = `
    UPDATE produkti
    SET emri = ?, barkodi = ?, cmimi_blerjes = ?, cmimi_shitjes = ?,
        njesia_matese = ?, stoku = ?, pragu_minimumi = ?, data_skadences = ?
    WHERE produkti_id = ?
  `;

  db.query(
    sql,
    [emri, barkodi, cmimi_blerjes, cmimi_shitjes, njesia_matese, stoku, pragu_minimumi, data_skadences, req.params.id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gabim ne perditesim");
      } else {
        res.send("Produkti u perditesua");
      }
    }
  );
});

module.exports = router;