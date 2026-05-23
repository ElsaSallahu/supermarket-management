const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const employeeRoutes = require("./routes/employeeRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend po funksionon");
});

app.use("/produktet", productRoutes);
app.use("/employees", employeeRoutes);

app.listen(5000, () => {
  console.log("Serveri po funksionon ne portin 5000");
});