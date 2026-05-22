const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend po funksionon");
});

app.get("/produktet", (req, res) => {
<<<<<<<<< Temporary merge branch 1
  db.query("SELECT * FROM produkti", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim");
=========
  db.query("SELECT * FROM produkti ORDER BY produkti_id DESC", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne leximin e produkteve");
>>>>>>>>> Temporary merge branch 2
    } else {
      res.json(results);
    }
  });
});

app.post("/produktet", (req, res) => {
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

  db.query(sql, [emri, barkodi, cmimi_blerjes, cmimi_shitjes, njesia_matese, stoku, pragu_minimumi, data_skadences], (err) => {
<<<<<<<<< Temporary merge branch 1
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne shtim");
    } else {
      res.send("Produkti u shtua");
=========
     if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).send(err.sqlMessage);
>>>>>>>>> Temporary merge branch 2
    }
  });
});

app.delete("/produktet/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM produkti WHERE produkti_id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne fshirje");
    } else {
      res.send("Produkti u fshi");
    }
  });
});

app.put("/produktet/:id", (req, res) => {
  const id = req.params.id;

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

  db.query(sql, [
    emri,
    barkodi,
    cmimi_blerjes,
    cmimi_shitjes,
    njesia_matese,
    stoku,
    pragu_minimumi,
    data_skadences,
    id
  ], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim ne perditesim");
    } else {
      res.send("Produkti u perditesua");
    }
  });
});



app.listen(5000, () => {
  console.log("Serveri po funksionon ne portin 5000");
<<<<<<<<< Temporary merge branch 1
});
=========
});
>>>>>>>>> Temporary merge branch 2
