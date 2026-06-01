import React, {
  useEffect,
  useState,
} from "react";

function ProductReport() {
  const [report, setReport] =
    useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/product-report"
          );

        const data =
          await response.json();

        setReport(data);
      } catch (err) {
        console.log(err);
      }
    };

  if (!report) {
    return (
      <div
        style={{
          padding:
            "40px",
          fontSize:
            "18px",
        }}
      >
        Loading report...
      </div>
    );
  }

  const cards = [
    {
      title:
        "Total Products",
      value:
        report.total_products,
      accent: "#2563eb",
    },

    {
      title:
        "Total Stock",
      value:
        report.total_stock,
      accent: "#059669",
    },

    {
      title:
        "Purchase Value",
      value: `${report.total_purchase_value} €`,
      accent: "#7c3aed",
    },

    {
      title:
        "Sale Value",
      value: `${report.total_sale_value} €`,
      accent: "#0f172a",
    },

    {
      title:
        "Low Stock Products",
      value:
        report.low_stock_products,
      accent: "#f59e0b",
    },
  ];

  return (
    <div className="page">
      {/* HEADER */}
      <div
        className="page-header"
        style={{
          marginBottom:
            "30px",
        }}
      >
        <p
          className="page-kicker"
          style={{
            color:
              "#64748b",
            margin: 0,
          }}
        >
          Analytics &
          Statistics
        </p>

        <h1 className="page-heading">
          Product Report
        </h1>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",

          gap: "20px",
        }}
      >
        {cards.map(
          (
            card,
            index
          ) => (
            <div
              className="ui-card"
              key={
                index
              }
              style={{
                background:
                  "white",

                borderRadius:
                  "28px",

                padding:
                  "26px",

                boxShadow:
                  "0 14px 35px rgba(15,23,42,0.06)",

                transition:
                  "0.2s ease",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "4px",
                  borderRadius: "999px",
                  background: card.accent,
                  marginBottom: "16px",
                }}
              />

              <p
                style={{
                  color:
                    "#64748b",

                  marginBottom:
                    "8px",
                }}
              >
                {
                  card.title
                }
              </p>

              <h1
                style={{
                  fontSize:
                    "32px",

                  color:
                    "#111827",
                }}
              >
                {
                  card.value
                }
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProductReport;
