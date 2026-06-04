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
      categories: 0,
      suppliers: 0,
      employees: 0,
      cashiers: 0,
      payments: 0,
      invoices: 0,
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
          categoriesRes,
          suppliersRes,
          employeesRes,
          cashiersRes,
          paymentsRes,
          invoicesRes,
        ] = await Promise.all([
          api.get("/sales"),
          api.get("/products"),
          api.get("/customers"),
          api.get("/categories"),
          api.get("/suppliers"),
          api.get("/employees"),
          api.get("/cashiers"),
          api.get("/payments"),
          api.get("/invoice"),
        ]);

        const sales =
          salesRes.data || [];

        const products =
          productsRes.data || [];

        const customers =
          customersRes.data || [];

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
          categories:
            categoriesRes.data
              ?.length || 0,
          suppliers:
            suppliersRes.data
              ?.length || 0,
          employees:
            employeesRes.data
              ?.length || 0,
          cashiers:
            cashiersRes.data
              ?.length || 0,
          payments:
            paymentsRes.data
              ?.length || 0,
          invoices:
            invoicesRes.data
              ?.length || 0,
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
      {/* HERO */}

      <div
        className="panel"
        style={{
          marginBottom: "25px",
          padding: "35px",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: "700",
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            marginTop: "10px",
            opacity: 0.85,
          }}
        >
          Monitor inventory,
          sales, staff,
          suppliers and
          customer activity in
          real time.
        </p>
      </div>

      {/* MAIN CARDS */}

      <div className="stats-grid">
        <div className="stat-card card-green">
          <div className="card-badge">
            Revenue
          </div>

          <div className="card-icon">
            💰
          </div>

          <span>
            Total Revenue
          </span>

          <strong>
            €
            {Number(
              stats.revenue
            ).toLocaleString()}
          </strong>

          <small>
            Total supermarket
            income
          </small>
        </div>

        <div className="stat-card card-blue">
          <div className="card-badge">
            Inventory
          </div>

          <div className="card-icon">
            📦
          </div>

          <span>
            Products
          </span>

          <strong>
            {stats.products}
          </strong>

          <small>
            Available products
          </small>
        </div>

        <div className="stat-card card-purple">
          <div className="card-badge">
            Customers
          </div>

          <div className="card-icon">
            👥
          </div>

          <span>
            Registered
          </span>

          <strong>
            {stats.customers}
          </strong>

          <small>
            Active customers
          </small>
        </div>

        <div className="stat-card card-red">
          <div className="card-badge">
            Alert
          </div>

          <div className="card-icon">
            ⚠️
          </div>

          <span>
            Low Stock
          </span>

          <strong>
            {stats.lowStock}
          </strong>

          <small>
            Products requiring
            attention
          </small>
        </div>
      </div>

      {/* SECOND CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <div className="stat-card">
          <span>
            📂 Categories
          </span>

          <strong>
            {stats.categories}
          </strong>

          <small>
            Product Categories
          </small>
        </div>

        <div className="stat-card">
          <span>
            🚚 Suppliers
          </span>

          <strong>
            {stats.suppliers}
          </strong>

          <small>
            Active Suppliers
          </small>
        </div>

        <div className="stat-card">
          <span>
            👨‍💼 Employees
          </span>

          <strong>
            {stats.employees}
          </strong>

          <small>
            Staff Members
          </small>
        </div>

        <div className="stat-card">
          <span>
            🛒 Cashiers
          </span>

          <strong>
            {stats.cashiers}
          </strong>

          <small>
            Registered
            Cashiers
          </small>
        </div>

        <div className="stat-card">
          <span>
            💳 Payments
          </span>

          <strong>
            {stats.payments}
          </strong>

          <small>
            Processed
            Payments
          </small>
        </div>

        <div className="stat-card">
          <span>
            🧾 Invoices
          </span>

          <strong>
            {stats.invoices}
          </strong>

          <small>
            Generated
            Invoices
          </small>
        </div>
      </div>

      {/* SUMMARY */}

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
              marginBottom:
                "20px",
            }}
          >
            Business Summary
          </h2>

          <div className="activity-row">
            <span>
              Total Revenue
            </span>

            <b>
              €
              {Number(
                stats.revenue
              ).toLocaleString()}
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
              Categories
            </span>

            <b>
              {
                stats.categories
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Suppliers
            </span>

            <b>
              {
                stats.suppliers
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Customers
            </span>

            <b>
              {
                stats.customers
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Employees
            </span>

            <b>
              {
                stats.employees
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Date
            </span>

            <b>
              {new Date().toLocaleDateString()}
            </b>
          </div>
        </section>

        <section className="panel">
          <h2
            style={{
              marginBottom:
                "20px",
            }}
          >
            System Status
          </h2>

          <div className="activity-row">
            <span>
              Payments
            </span>

            <b>
              {
                stats.payments
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Invoices
            </span>

            <b>
              {
                stats.invoices
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Low Stock
            </span>

            <b>
              {
                stats.lowStock
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Cashiers
            </span>

            <b>
              {
                stats.cashiers
              }
            </b>
          </div>

          <div className="activity-row">
            <span>
              Status
            </span>

            <b
              style={{
                color:
                  "#10b981",
              }}
            >
              Active
            </b>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;