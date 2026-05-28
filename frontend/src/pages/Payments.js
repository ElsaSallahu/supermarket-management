import React, {
  useEffect,
  useState,
} from "react";

function Payments() {
  const [payments, setPayments] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [newPayment, setNewPayment] =
    useState({
      sale_id: "",
      amount: "",
      payment_method: "",
      payment_date: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/payments"
          );

        const data =
          await response.json();

        setPayments(data);
      } catch (err) {
        console.log(err);
      }
    };

  const addPayment =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/payments",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newPayment
            ),
          }
        );

        loadPayments();

        setNewPayment({
          sale_id: "",
          amount: "",
          payment_method:
            "",
          payment_date:
            "",
        });
      } catch (err) {
        console.log(err);
      }
    };

  const deletePayment =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/payments/${id}`,
          {
            method:
              "DELETE",
          }
        );

        loadPayments();
      } catch (err) {
        console.log(err);
      }
    };

  const updatePayment =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/payments/${editingId}`,
          {
            method:
              "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newPayment
            ),
          }
        );

        loadPayments();

        setEditingId(
          null
        );

        setNewPayment({
          sale_id: "",
          amount: "",
          payment_method:
            "",
          payment_date:
            "",
        });
      } catch (err) {
        console.log(err);
      }
    };

  const editPayment = (
    payment
  ) => {
    setEditingId(
      payment.payment_id
    );

    setNewPayment({
      sale_id:
        payment.sale_id,
      amount:
        payment.amount,
      payment_method:
        payment.payment_method,
      payment_date:
        payment.payment_date?.split(
          "T"
        )[0],
    });
  };

  const filteredPayments =
    payments.filter(
      (payment) =>
        payment.payment_method
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
    <div
      style={{
        padding: "10px",
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
          marginBottom:
            "25px",
          flexWrap:
            "wrap",
          gap: "14px",
        }}
      >
        <div>
          <p
            style={{
              color:
                "#64748b",
              margin: 0,
            }}
          >
            Transaction
            Management
          </p>

          <h1>
            💳 Payments
          </h1>
        </div>

        <input
          placeholder="🔍 Search payment..."
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
        style={{
          background:
            "white",
          borderRadius:
            "28px",
          padding: "24px",
          marginBottom:
            "25px",
          boxShadow:
            "0 14px 35px rgba(15,23,42,0.06)",
        }}
      >
        <h2>
          {editingId
            ? "✏ Update Payment"
            : "➕ Add Payment"}
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
            placeholder="Sale ID"
            value={
              newPayment.sale_id
            }
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
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
            placeholder="Amount"
            value={
              newPayment.amount
            }
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                amount:
                  e.target
                    .value,
              })
            }
            style={
              inputStyle
            }
          />

          <input
            placeholder="Payment Method"
            value={
              newPayment.payment_method
            }
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                payment_method:
                  e.target
                    .value,
              })
            }
            style={
              inputStyle
            }
          />

          <input
            type="date"
            value={
              newPayment.payment_date
            }
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                payment_date:
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
              ? updatePayment
              : addPayment
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
            ? "Update Payment"
            : "Add Payment"}
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
        {filteredPayments.map(
          (payment) => (
            <div
              key={
                payment.payment_id
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
                Sale #
                {
                  payment.sale_id
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
                  payment.amount
                }
              </h1>

              <p>
                💳{" "}
                {
                  payment.payment_method
                }
              </p>

              <p>
                📅{" "}
                {payment.payment_date?.split(
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
                    editPayment(
                      payment
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
                    deletePayment(
                      payment.payment_id
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

export default Payments;