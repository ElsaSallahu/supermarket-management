const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
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
});

