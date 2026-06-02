import React, {
  useEffect,
  useState,
} from "react";

import api from "../api/axiosConfig";
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
const loadSales = async () => {
  try {
    const res = await api.get("/sales");
    setSales(res.data);
  } catch (err) {
    console.log(err);
  }
};

const addSale = async () => {
  if (
    !newSale.customer_id ||
    !newSale.total_amount ||
    !newSale.sale_date
  ) {
    alert("Please fill all fields");
    return;
  }

  if (
    Number(newSale.total_amount) <= 0
  ) {
    alert("Amount must be greater than 0");
    return;
  }

  try {
    await api.post("/sales", {
      customer_id: Number(
        newSale.customer_id
      ),
      total_amount: Number(
        newSale.total_amount
      ),
      sale_date: newSale.sale_date,
    });

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

const deleteSale = async (id) => {
  try {
    await api.delete(`/sales/${id}`);
    loadSales();
  } catch (err) {
    console.log(err);
  }
};

const totalRevenue = sales.reduce(
  (sum, sale) =>
    sum + Number(sale.total_amount || 0),
  0
);
  
  const updateSale = async (
      id
    ) => {
      try {
        const response =
          await fetch(
            `http://localhost:5000/sales/${id}`,
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    customer_id:
                      Number(
                        newSale.customer_id
                      ),

                    total_amount:
                      Number(
                        newSale.total_amount
                      ),

                    sale_date:
                      newSale.sale_date,
                  }
                ),
            }
          );

        const data =
          await response.text();

        console.log(data);

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

  // FILTER
  const filteredSales =
    sales.filter(
      (s) =>
        String(
          s.customer_id
        ).includes(
          search
        )
    );


  return (
    <div className="page">
      {/* HEADER */}
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Financial
            Management
          </p>

          <h1
            className="page-heading"
            style={{
              margin: 0,
            }}
          >
            Sales
          </h1>
        </div>

        <input className="ui-input"
          placeholder="Search customer ID..."
          value={
            search
          }
          onChange={(
            e
          ) =>
            setSearch(
              e.target
                .value
            )
          }
          style={{
            ...inputStyle,
            width: "300px",
          }}
        />
      </div>

      {/* REVENUE */}
      <div
        className="ui-card"
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          borderRadius: "22px",
          padding: "24px",
          marginBottom: "25px",
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
            margin: "10px 0 0",
            fontSize: "42px",
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
        className="ui-card"
        style={{
          background: "white",
          padding: "22px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          marginBottom: "25px",
        }}
      >
        <h2>
          {editingId
            ? "Update Sale"
            : "Add Sale"}
        </h2>

        <div
          style={{
            display:"grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "12px",
            marginTop: "15px",
          }}
        >
          <input
            placeholder="Customer ID"
            value={
              newSale.customer_id
            }
            onChange={(
              e
            ) =>
              setNewSale(
                {
                  ...newSale,
                  customer_id:
                    e
                      .target
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
            onChange={(
              e
            ) =>
              setNewSale(
                {
                  ...newSale,
                  total_amount:
                    e
                      .target
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
            onChange={(
              e
            ) =>
              setNewSale(
                {
                  ...newSale,
                  sale_date:
                    e
                      .target
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
          className="ui-button ui-button-primary"
          style={{
            marginTop: "18px",
            background:
              editingId
                ? "#0f172a"
                : "#059669",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          {editingId
            ? "Update Sale"
            : "Add Sale"}
        </button>
      </div>

        {/* SALES TABLE */}
      <div
        style={{
          background: "white",
          padding: "22px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Sales List
          <p>{sales.length}</p>
        </h2>

<div style={{ overflowX: "auto" }}>
        <table
         style={{
         width: "100%",
         borderCollapse:"separate",
         borderSpacing:"0 12px",
  }}
>
<thead
  style={{
    background: "#f1f5f9",
  }}
>
  <tr>
    <th style={{
    padding: "15px",
    textAlign: "left",
    paddingLeft: "25px",
  }}
>
  ID
</th>

    <th style={{ 
      padding: "15px",
      textAlign: "left",
      paddingLeft: "25px",
     }}>
      Customer ID
    </th>

    <th style={{ 
      padding: "15px",
      textAlign: "left",
      paddingLeft: "25px",
     }}>
      Total
    </th>

    <th style={{ 
      padding: "15px",
      textAlign: "left",
      paddingLeft: "25px",
     }}>
      Date
    </th>

    <th style={{ 
      padding: "15px",
      textAlign: "left",
      paddingLeft: "25px",
     }}>
      Actions
    </th>
  </tr>
</thead>

          <tbody>
  {filteredSales.map(
    (sale) => (
      <tr
        key={sale.sale_id}
        style={{
          background:
            "#f8fafc",
          borderBottom:
            "12px solid white",
        }}
      >
        <td
          style={{
            padding:"18px",
            fontWeight:"600",
              textAlign: "left",
             paddingLeft:"25px",
          }}
        >
          {sale.sale_id}
        </td>

        <td
          style={{
            padding:"18px",
            textAlign: "left",
            paddingLeft: "25px",
          }}
        >
          {sale.customer_id}
        </td>

        <td
          style={{
            padding:"18px",
            color:"#7c3aed",
            fontWeight:"bold",
            textAlign: "left",
            paddingLeft: "25px",
          }}
        >
          €
          {sale.total_amount}
        </td>

        <td
          style={{
            padding:"18px",
            textAlign: "left",
            paddingLeft: "25px",
          }}
        >
          {new Date(
            sale.sale_date
          ).toLocaleDateString()}
        </td>

        <td
          style={{
            padding:"18px",
            textAlign:"left",
            paddingLeft:"25px",
          }}
        >
          <button
            onClick={() => {
              setEditingId(
                sale.sale_id
              );

              setNewSale({
                customer_id:
                  sale.customer_id,
                total_amount:
                  sale.total_amount,
                sale_date:
                  sale.sale_date?.split(
                    "T"
                  )[0],
              });
            }}
            style={{
              background:
                "#3b82f6",
              color:
                "white",
              border:
                "none",
              padding:
                "8px 14px",
              borderRadius:
                "10px",
              marginRight:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteSale(
                sale.sale_id
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
                "8px 14px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  )}
</tbody>
        </table>
        </div>
        </div>
      </div>
  );
};

export default Sales;