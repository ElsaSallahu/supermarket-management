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
const cashierRoutes = require("./routes/cashierRoutes");
const userActivityRoutes = require("./routes/userActivityRoutes");
const authRoutes = require("./routes/auth");
const salesRoutes = require("./routes/salesRoutes");
const saleItemsRoutes = require("./routes/saleItemsRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");





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
app.use("/cashiers", cashierRoutes);
app.use("/user-activity", userActivityRoutes);
app.use("/api/auth", authRoutes);
app.use("/sales", salesRoutes);
app.use("/sale-items", saleItemsRoutes);
app.use("/customers", customerRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/payment", paymentRoutes);


app.listen(5000, () => {
  console.log("Serveri po funksionon ne portin 5000");
});