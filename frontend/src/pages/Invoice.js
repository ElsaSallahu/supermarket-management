import React, {
  useEffect,
  useState,
} from "react";

function Invoice() {
  const [invoices, setInvoices] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [newInvoice, setNewInvoice] =
    useState({
      sale_id: "",
      invoice_number: "",
      total_amount: "",
      invoice_date: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/invoice"
          );

        const data =
          await response.json();

        setInvoices(data);
      } catch (err) {
        console.log(err);
      }
    };

  // ADD
  const addInvoice =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/invoice",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newInvoice
            ),
          }
        );

        loadInvoices();

        setNewInvoice({
          sale_id: "",
          invoice_number:
            "",
          total_amount:
            "",
          invoice_date:
            "",
        });
      } catch (err) {
        console.log(err);
      }
    };

  // DELETE
  const deleteInvoice =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/invoice/${id}`,
          {
            method:
              "DELETE",
          }
        );

        loadInvoices();
      } catch (err) {
        console.log(err);
      }
    };

  // UPDATE
  const updateInvoice =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/invoice/${editingId}`,
          {
            method:
              "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newInvoice
            ),
          }
        );

        setEditingId(
          null
        );

        setNewInvoice({
          sale_id: "",
          invoice_number:
            "",
          total_amount:
            "",
          invoice_date:
            "",
        });

        loadInvoices();
      } catch (err) {
        console.log(err);
      }
    };

  const editInvoice = (
    invoice
  ) => {
    setEditingId(
      invoice.invoice_id
    );

    setNewInvoice({
      sale_id:
        invoice.sale_id,

      invoice_number:
        invoice.invoice_number,

      total_amount:
        invoice.total_amount,

      invoice_date:
        invoice.invoice_date?.split(
          "T"
        )[0],
    });
  };

  const filteredInvoices =
    invoices.filter(
      (invoice) =>
        invoice.invoice_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const inputStyle = {
    width: "100%",
    padding:
      "12px 14px",
    borderRadius:
      "14px",
    border:
      "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
  };

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

          marginBottom:
            "25px",

          flexWrap:
            "wrap",

          gap: "14px",
        }}
      >
        <div>
          <p
            className="page-kicker"
            style={{
              color:
                "#64748b",
              margin: 0,
            }}
          >
            Billing System
          </p>

          <h1 className="page-heading">
            Invoice
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search invoice..."
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

      {/* FORM */}
      <div
        className="ui-card"
        style={{
          background:
            "white",

          borderRadius:
            "28px",

          padding:
            "24px",

          marginBottom:
            "25px",

          boxShadow:
            "0 14px 35px rgba(15,23,42,0.06)",
        }}
      >
        <h2>
          {editingId
            ? "Update Invoice"
            : "Add Invoice"}
        </h2>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "14px",

            marginTop:
              "20px",
          }}
        >
          <input
            className="ui-input"
            placeholder="Sale ID"
            value={
              newInvoice.sale_id
            }
            onChange={(e) =>
              setNewInvoice({
                ...newInvoice,
                sale_id:
                  e.target
                    .value,
              })
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            placeholder="Invoice Number"
            value={
              newInvoice.invoice_number
            }
            onChange={(e) =>
              setNewInvoice({
                ...newInvoice,
                invoice_number:
                  e.target
                    .value,
              })
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            placeholder="Total Amount"
            value={
              newInvoice.total_amount
            }
            onChange={(e) =>
              setNewInvoice({
                ...newInvoice,
                total_amount:
                  e.target
                    .value,
              })
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            type="date"
            value={
              newInvoice.invoice_date
            }
            onChange={(e) =>
              setNewInvoice({
                ...newInvoice,
                invoice_date:
                  e.target
                    .value,
              })
            }
            style={
              inputStyle
            }
          />
        </div>

        <button
          onClick={
            editingId
              ? updateInvoice
              : addInvoice
          }
          style={{
            marginTop:
              "18px",

            background:
              "#111827",

            color:
              "white",

            border:
              "none",

            padding:
              "12px 20px",

            borderRadius:
              "14px",

            cursor:
              "pointer",

            fontWeight:
              "600",
          }}
        >
          {editingId
            ? "Update Invoice"
            : "Add Invoice"}
        </button>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "18px",
        }}
      >
        {filteredInvoices.map(
          (invoice) => (
            <div
              key={
                invoice.invoice_id
              }
              style={{
                background:
                  "white",

                borderRadius:
                  "28px",

                padding:
                  "22px",

                boxShadow:
                  "0 14px 35px rgba(15,23,42,0.06)",
              }}
            >
              <h3>
                #
                {
                  invoice.invoice_number
                }
              </h3>

              <h1
                style={{
                  margin:
                    "12px 0",
                }}
              >
                $
                {
                  invoice.total_amount
                }
              </h1>

              <p>
            Sale ID:{" "}
                {
                  invoice.sale_id
                }
              </p>

              <p>
            Date:{" "}
                {invoice.invoice_date?.split(
                  "T"
                )[0]}
              </p>

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  marginTop:
                    "18px",
                }}
              >
                <button
                  onClick={() =>
                    editInvoice(
                      invoice
                    )
                  }
                  style={{
                    flex: 1,
                    background:
                      "#111827",
                    color:
                      "white",
                    border:
                      "none",
                    borderRadius:
                      "14px",
                    padding:
                      "12px",
                    cursor:
                      "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteInvoice(
                      invoice.invoice_id
                    )
                  }
                  style={{
                    flex: 1,
                    background:
                      "#f3f4f6",
                    border:
                      "none",
                    borderRadius:
                      "14px",
                    padding:
                      "12px",
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Invoice;
