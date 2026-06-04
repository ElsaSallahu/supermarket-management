import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const ProductReport = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const response = await api.get("/product-report");
      setReport(response.data);
    } catch (err) {
      console.log("Product Report Error:", err);
    }
  };

  if (!report) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Loading Product Report...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          📦 Product Report Dashboard
        </h1>

        <p
          style={{
            color: "#6b7280",
          }}
        >
          Overview of inventory status and stock valuation
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Card
          icon="📦"
          title="Total Products"
          value={report.total_products}
          color="#2563eb"
        />

        <Card
          icon="📚"
          title="Total Stock"
          value={report.total_stock}
          color="#059669"
        />

        <Card
          icon="💰"
          title="Purchase Value"
          value={`€${Number(
            report.total_purchase_value || 0
          ).toFixed(2)}`}
          color="#d97706"
        />

        <Card
          icon="🛒"
          title="Sale Value"
          value={`€${Number(
            report.total_sale_value || 0
          ).toFixed(2)}`}
          color="#7c3aed"
        />

        <Card
          icon="⚠️"
          title="Low Stock"
          value={report.low_stock_products}
          color="#dc2626"
        />
      </div>

      {/* DETAILS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={panelStyle}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Inventory Overview
          </h2>

          <Row
            label="Total Products"
            value={report.total_products}
          />

          <Row
            label="Total Stock"
            value={report.total_stock}
          />

          <Row
            label="Purchase Value"
            value={`€${Number(
              report.total_purchase_value || 0
            ).toFixed(2)}`}
          />

          <Row
            label="Sale Value"
            value={`€${Number(
              report.total_sale_value || 0
            ).toFixed(2)}`}
          />

          <Row
            label="Low Stock Products"
            value={report.low_stock_products}
          />
        </div>

        <div
          style={panelStyle}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Product Insights
          </h2>

          <Row
            label="Inventory Status"
            value={
              report.low_stock_products > 10
                ? "Attention"
                : "Healthy"
            }
          />

          <Row
            label="Products Available"
            value={report.total_products}
          />

          <Row
            label="Stock Units"
            value={report.total_stock}
          />

          <Row
            label="Low Stock Alerts"
            value={report.low_stock_products}
          />
        </div>
      </div>
    </div>
  );
};

const panelStyle = {
  background: "#fff",
  borderRadius: "18px",
  padding: "25px",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};

const Card = ({
  icon,
  title,
  value,
  color,
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "18px",
      padding: "22px",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.08)",
      borderLeft: `6px solid ${color}`,
      transition: "0.3s",
    }}
  >
    <div
      style={{
        fontSize: "28px",
        marginBottom: "12px",
      }}
    >
      {icon}
    </div>

    <div
      style={{
        color: "#6b7280",
        fontSize: "14px",
      }}
    >
      {title}
    </div>

    <div
      style={{
        fontSize: "28px",
        fontWeight: "700",
        color: "#111827",
        marginTop: "8px",
      }}
    >
      {value}
    </div>
  </div>
);

const Row = ({
  label,
  value,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent:
        "space-between",
      padding: "14px 0",
      borderBottom:
        "1px solid #e5e7eb",
    }}
  >
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

export default ProductReport;