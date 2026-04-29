const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend po funksionon");
});

// ➡️ Këtu shto endpoint-in GET
app.get("/produktet", (req, res) => {
  db.query("SELECT * FROM Produkti", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim gjatë leximit");
    } else {
      res.json(results);
    }
  });
});

// Endpoint POST për shtim produkti
app.post("/produktet", (req, res) => {
  const { emri, cmimi_shitjes, stoku } = req.body;

  db.query(
  "INSERT INTO produkti (emri, cmimi_shitjes, stoku) VALUES (?, ?, ?)",
  [emri, cmimi_shitjes, stoku],
);
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Gabim");
      } else {
        res.send("Produkti u shtua");
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Serveri po punon ne portin 5000");
});