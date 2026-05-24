const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const stockRoutes = require("./routes/stockRoutes");
const productReportRoutes = require("./routes/productReportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend po funksionon");
});

app.use("/produktet", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/employees", employeeRoutes);
app.use("/stock", stockRoutes);
app.use("/product-report", productReportRoutes);



app.listen(5000, () => {
  console.log("Serveri po funksionon ne portin 5000");
});