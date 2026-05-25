import { useEffect, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
};

const Sales = () => {
  const [sales, setSales] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [newSale, setNewSale] =
    useState({
      customer_id: "",
      total_amount: "",
      sale_date: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/sales"
          );

        const data =
          await response.json();

        setSales(data);
      } catch (err) {
        console.log(err);
      }
    };

  const addSale =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/sales",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              newSale
            ),
          }
        );

        loadSales();

        setNewSale({
          customer_id: "",
          total_amount: "",
          sale_date: "",
        });
      } catch (err) {
        console.log(err);
      }
    };

  const deleteSale =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/sales/${id}`,
          {
            method: "DELETE",
          }
        );

        loadSales();
      } catch (err) {
        console.log(err);
      }
    };

  const updateSale =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/sales/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              newSale
            ),
          }
        );

        setEditingId(
          null
        );

        setNewSale({
          customer_id: "",
          total_amount: "",
          sale_date: "",
        });

        loadSales();
      } catch (err) {
        console.log(err);
      }
    };

  const filteredSales =
    sales.filter(
      (s) =>
        String(
          s.customer_id
        ).includes(search)
    );

  const totalRevenue =
    sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.total_amount ||
            0
        ),
      0
    );

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      {/* HEADER */}
      <div
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
            style={{
              margin: 0,
              color:
                "#64748b",
            }}
          >
            Financial
            Management
          </p>

          <h1
            style={{
              margin: 0,
            }}
          >
            💰 Sales
          </h1>
        </div>

        <input
          placeholder="🔍 Search customer ID..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            ...inputStyle,
            width: "300px",
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
        }}
      >
        <p
          style={{
            margin: 0,
            opacity: 0.8,
          }}
        >
          Total Revenue
        </p>

        <h1
          style={{
            margin:
              "10px 0 0",
            fontSize:
              "42px",
          }}
        >
          €
          {totalRevenue.toFixed(
            2
          )}
        </h1>
      </div>

      {/* FORM */}
      <div
        style={{
          background:
            "white",
          padding: "22px",
          borderRadius:
            "20px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
          marginBottom:
            "25px",
        }}
      >
        <h2>
          {editingId
            ? "✏ Update Sale"
            : "➕ Add Sale"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "12px",
            marginTop:
              "15px",
          }}
        >
          <input
            placeholder="Customer ID"
            value={
              newSale.customer_id
            }
            onChange={(e) =>
              setNewSale(
                {
                  ...newSale,
                  customer_id:
                    e.target
                      .value,
                }
              )
            }
            style={
              inputStyle
            }
          />

          <input
            placeholder="Total Amount"
            value={
              newSale.total_amount
            }
            onChange={(e) =>
              setNewSale(
                {
                  ...newSale,
                  total_amount:
                    e.target
                      .value,
                }
              )
            }
            style={
              inputStyle
            }
          />

          <input
            type="date"
            value={
              newSale.sale_date
            }
            onChange={(e) =>
              setNewSale(
                {
                  ...newSale,
                  sale_date:
                    e.target
                      .value,
                }
              )
            }
            style={
              inputStyle
            }
          />
        </div>

        <button
          onClick={() =>
            editingId
              ? updateSale(
                  editingId
                )
              : addSale()
          }
          style={{
            marginTop:
              "18px",
            background:
              editingId
                ? "#0f172a"
                : "#059669",
            color:
              "white",
            border:
              "none",
            padding:
              "12px 18px",
            borderRadius:
              "12px",
            cursor:
              "pointer",
            fontWeight:
              "700",
          }}
        >
          {editingId
            ? "Update Sale"
            : "Add Sale"}
        </button>
      </div>

      {/* SALES CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "18px",
        }}
      >
        {filteredSales.map(
          (s) => (
            <div
              key={s.sale_id}
              style={{
                background:
                  "white",
                borderRadius:
                  "20px",
                padding:
                  "20px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
                borderLeft:
                  "6px solid #059669",
              }}
            >
              <h3>
                💵 Sale #
                {s.sale_id}
              </h3>

              <p>
                👤 Customer:
                <b>
                  {" "}
                  {
                    s.customer_id
                  }
                </b>
              </p>

              <p>
                💰 Total:
                <b>
                  {" "}
                  €
                  {
                    s.total_amount
                  }
                </b>
              </p>

              <p>
                📅 Date:
                <b>
                  {" "}
                  {s.sale_date?.split(
                    "T"
                  )[0]}
                </b>
              </p>

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  marginTop:
                    "15px",
                }}
              >
                <button
                  onClick={() => {
                    setEditingId(
                      s.sale_id
                    );

                    setNewSale(
                      {
                        customer_id:
                          s.customer_id,

                        total_amount:
                          s.total_amount,

                        sale_date:
                          s.sale_date?.split(
                            "T"
                          )[0],
                      }
                    );
                  }}
                  style={{
                    background:
                      "#0f172a",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px",
                    borderRadius:
                      "10px",
                    flex: 1,
                    cursor:
                      "pointer",
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() =>
                    deleteSale(
                      s.sale_id
                    )
                  }
                  style={{
                    background:
                      "#ef4444",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px",
                    borderRadius:
                      "10px",
                    flex: 1,
                    cursor:
                      "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sales;