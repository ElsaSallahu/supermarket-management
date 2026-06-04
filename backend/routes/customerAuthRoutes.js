const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

const JWT_SECRET = "supermarket_secret_key";

// REGISTER CUSTOMER
router.post("/register", async (req, res) => {
  const { full_name, email, password, phone, address } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "Ploteso emrin, email dhe passwordin" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO customers 
      (full_name, email, password, phone, address)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [full_name, email, hashedPassword, phone, address], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Email ekziston ose ka gabim", error: err });
      }

      res.status(201).json({
        message: "Klienti u regjistrua me sukses",
        customer_id: result.insertId
      });
    });
  }catch (error) {
  console.log(error);

  alert(
    error.response?.data?.message
  );
}
});

// LOGIN CUSTOMER
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM customers WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Gabim ne server" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Email ose password gabim" });
    }

    const customer = results[0];

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email ose password gabim" });
    }

    const token = jwt.sign(
      {
        customer_id: customer.customer_id,
        email: customer.email,
        role: "customer"
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login me sukses",
      token,
      customer: {
        customer_id: customer.customer_id,
        full_name: customer.full_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      }
    });
  });
});

module.exports = router;