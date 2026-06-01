import { useEffect, useState } from "react";

const Stock = () => {
  const [stock, setStock] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock =
    async () => {
      const response =
        await fetch(
          "http://localhost:5000/stock"
        );

      const data =
        await response.json();

      setStock(data);
    };

  const filteredStock =
    stock.filter(
      (s) =>
        s.emri
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        s.barkodi
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const lowStockCount =
    stock.filter(
      (s) =>
        s.statusi ===
        "LOW STOCK"
    ).length;

  return (
    <div className="page">
      {/* HEADER */}
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom:
            "25px",
        }}
      >
        <div>
          <p
            className="page-kicker"
            style={{
              margin: 0,
              color:
                "#64748b",
            }}
          >
            Inventory
            Monitoring
          </p>

          <h1
            className="page-heading"
            style={{
              margin: 0,
            }}
          >
            Stock Overview
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            width: "300px",
            padding:
              "12px 14px",
            borderRadius:
              "12px",
            border:
              "1px solid #d1d5db",
            outline:
              "none",
          }}
        />
      </div>

      {/* TOP CARD */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          borderRadius:
            "22px",
          padding: "24px",
          marginBottom:
            "25px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              opacity: 0.8,
            }}
          >
            Products needing
            attention
          </p>

          <h1
            style={{
              margin:
                "10px 0 0",
              fontSize:
                "42px",
            }}
          >
            {
              lowStockCount
            }
          </h1>
        </div>

        <div
          style={{
            background:
              "rgba(255,255,255,0.12)",
            padding:
              "14px 18px",
            borderRadius:
              "16px",
          }}
        >
          Low Stock
          Alerts
        </div>
      </div>

      {/* STOCK CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "18px",
        }}
      >
        {filteredStock.map(
          (s) => (
            <div
              key={
                s.produkti_id
              }
              style={{
                background:
                  "white",
                borderRadius:
                  "20px",
                padding:
                  "20px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
                borderLeft: `6px solid ${
                  s.statusi ===
                  "LOW STOCK"
                    ? "#ef4444"
                    : "#10b981"
                }`,
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin:
                        "0 0 5px",
                    }}
                  >
                    {
                      s.emri
                    }
                  </h3>

                  <p
                    style={{
                      color:
                        "#64748b",
                      margin:
                        0,
                    }}
                  >
                    Barcode:{" "}
                    {
                      s.barkodi
                    }
                  </p>
                </div>

                <span
                  style={{
                    background:
                      s.statusi ===
                      "LOW STOCK"
                        ? "#fee2e2"
                        : "#dcfce7",

                    color:
                      s.statusi ===
                      "LOW STOCK"
                        ? "#dc2626"
                        : "#059669",

                    padding:
                      "8px 12px",

                    borderRadius:
                      "999px",

                    fontWeight:
                      "700",

                    fontSize:
                      "12px",
                  }}
                >
                  {s.statusi ===
                  "LOW STOCK"
                    ? "LOW"
                    : "OK"}
                </span>
              </div>

              <div
                style={{
                  marginTop:
                    "15px",
                  color:
                    "#475569",
                }}
              >
                <p>
                  Stock:
                  <b>
                    {" "}
                    {
                      s.stoku
                    }
                  </b>
                </p>

                <p>
                  Minimum:
                  <b>
                    {" "}
                    {
                      s.pragu_minimumi
                    }
                  </b>
                </p>

                <p>
                  Unit:
                  <b>
                    {" "}
                    {
                      s.njesia_matese
                    }
                  </b>
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Stock;
