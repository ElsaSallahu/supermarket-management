import React, {
  useEffect,
  useState,
} from "react";

import api from "../api/axiosConfig";

const Dashboard = () => {
  const [stats, setStats] =
    useState({
      revenue: 0,
      products: 0,
      customers: 0,
      lowStock: 0,
    });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const [
          salesRes,
          productsRes,
          customersRes,
        ] = await Promise.all([
          api.get("/sales"),
          api.get("/products"),
          api.get("/customers"),
        ]);

        const sales =
          salesRes.data || [];

        const products =
          productsRes.data || [];

        const customers =
          customersRes.data || [];

        console.log(
          "SALES:",
          sales
        );

        console.log(
          "PRODUCTS:",
          products
        );

        console.log(
          "CUSTOMERS:",
          customers
        );

        const revenue =
          sales.reduce(
            (
              sum,
              sale
            ) =>
              sum +
              Number(
                sale.total_amount ||
                  0
              ),
            0
          );

        const lowStock =
          products.filter(
            (p) =>
              Number(
                p.stoku || 0
              ) < 10
          ).length;

        setStats({
          revenue,
          products:
            products.length,
          customers:
            customers.length,
          lowStock,
        });
      } catch (err) {
        console.log(
          "Dashboard error:",
          err
        );
      }
    };

 return (
  <div className="dashboard-page">
    <div
      className="panel"
      style={{
        marginBottom: "25px",
        padding: "30px",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        borderRadius: "20px",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "34px",
        }}
      >
        Dashboard Overview
      </h1>

      <p
        style={{
          marginTop: "10px",
          opacity: 0.8,
        }}
      >
        Monitor products, customers and
        supermarket performance.
      </p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <span>💰 Revenue</span>

        <strong>
          €{stats.revenue || stats.totalSales}
        </strong>

        <small>Total Revenue</small>
      </div>

      <div className="stat-card">
        <span>📦 Products</span>

        <strong>
          {stats.products}
        </strong>

        <small>
          Available Products
        </small>
      </div>

      <div className="stat-card">
        <span>👥 Customers</span>

        <strong>
          {stats.customers}
        </strong>

        <small>
          Registered Customers
        </small>
      </div>

      <div className="stat-card warning">
        <span>⚠ Low Stock</span>

        <strong>
          {stats.lowStock}
        </strong>

        <small>
          Need Attention
        </small>
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "2fr 1fr",
        gap: "25px",
        marginTop: "25px",
      }}
    >
      <section className="panel">
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Store Summary
        </h2>

        <div className="activity-row">
          <span>
            Total Revenue
          </span>

          <b>
            €
            {stats.revenue || stats.totalSales}
          </b>
        </div>

        <div className="activity-row">
          <span>
            Products
          </span>

          <b>
            {stats.products}
          </b>
        </div>

        <div className="activity-row">
          <span>
            Customers
          </span>

          <b>
            {stats.customers}
          </b>
        </div>

        <div className="activity-row">
          <span>
            Low Stock
          </span>

          <b>
            {stats.lowStock}
          </b>
        </div>

        <div className="activity-row">
          <span>
            System Date
          </span>

          <b>
            {new Date().toLocaleDateString()}
          </b>
        </div>
      </section>

      <section className="panel">
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Quick Information
        </h2>

        <div className="activity-row">
          <span>
            Products Available
          </span>

          <b>
            {stats.products}
          </b>
        </div>

        <div className="activity-row">
          <span>
            Registered Customers
          </span>

          <b>
            {stats.customers}
          </b>
        </div>

        <div className="activity-row">
          <span>
            Low Stock Alerts
          </span>

          <b>
            {stats.lowStock}
          </b>
        </div>

        <div className="activity-row">
          <span>
            System Status
          </span>

          <b
            style={{
              color: "#10b981",
            }}
          >
            Active
          </b>
        </div>
      </section>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginTop: "25px",
      }}
    >
      <div className="panel">
        <h3>
          📦 Inventory
        </h3>

        <h1>
          {stats.products}
        </h1>

        <p>
          Total products in
          supermarket
        </p>
      </div>

      <div className="panel">
        <h3>
          👥 Customers
        </h3>

        <h1>
          {stats.customers}
        </h1>

        <p>
          Active customer
          records
        </p>
      </div>

      <div className="panel">
        <h3>
          ⚠ Alerts
        </h3>

        <h1>
          {stats.lowStock}
        </h1>

        <p>
          Products below stock
          threshold
        </p>
      </div>
    </div>
  </div>
);
};

export default Dashboard;