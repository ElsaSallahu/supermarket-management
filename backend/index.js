const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/products", (req, res) => {
  res.json([]);
});

app.listen(5000, () => {

  console.log("Serveri po punon ne portin 5000");
});

