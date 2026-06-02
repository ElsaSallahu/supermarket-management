require("dotenv").config();
const express = require("express");
const cors = require("cors");

const verifyToken = require("./routes/middleware/verifyToken");

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
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend po funksionon");
});

// PROTECTED ROUTES
app.use("/products", verifyToken, productRoutes);
app.use("/categories", verifyToken, categoryRoutes);
app.use("/suppliers", verifyToken, supplierRoutes);
app.use("/users", verifyToken, userRoutes);
app.use("/roles", verifyToken, roleRoutes);
app.use("/employees", verifyToken, employeeRoutes);
app.use("/stock", verifyToken, stockRoutes);
app.use("/product-report", verifyToken, productReportRoutes);
app.use("/cashiers", verifyToken, cashierRoutes);
app.use("/user-activity", verifyToken, userActivityRoutes);
app.use("/sales", verifyToken, salesRoutes);
app.use("/sale-items", verifyToken, saleItemsRoutes);
app.use("/customers", verifyToken, customerRoutes);
app.use("/invoice", verifyToken, invoiceRoutes);
app.use("/payments", verifyToken, paymentRoutes);
app.use("/orders", verifyToken, orderRoutes);

// AUTH ROUTES (PA TOKEN)
app.use("/api/auth", authRoutes);
app.use("/api/customer-auth", customerAuthRoutes);

// Nese e perdor diku ne frontend
app.use("/api/saleitems", verifyToken, saleItemsRoutes);

app.listen(5000, () => {
  console.log(
    "Serveri po funksionon ne portin 5000"
  );
});