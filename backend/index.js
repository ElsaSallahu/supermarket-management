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
  db.query("SELECT * FROM produkti", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gabim");
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log("Serveri po funksionon ne portin 5000");
});