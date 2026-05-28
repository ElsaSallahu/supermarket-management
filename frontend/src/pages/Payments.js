import React, {
  useEffect,
  useState,
} from "react";

const Payments = () => {
    const [sale_id, setSaleId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [
    payment_method,
    setPaymentMethod,
  ] = useState("");

  const [payment_date, setPaymentDate,] = useState("");

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

  const loadPayments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/payment"
      );

        const data =
          await response.json();

        setPayments(data);
      } catch (err) {
        console.log(err);
      }
    };

  // ADD
  const addPayment = async () => {
    try {
      await fetch(
        "http://localhost:5000/payment",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({sale_id,amount,payment_method,payment_date,}),
        }
      );

      loadPayments();

        setSaleId("");
        setAmount("");
        setPaymentMethod("");
        setPaymentDate("");
    

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deletePayment = async (
    id
  ) => {
    try {
      await fetch(
        `http://localhost:5000/payment/${id}`,
        {
          method: "DELETE",
        }
      );

      loadPayments();

    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE
  const updatePayment =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/payment/${id}`,
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

    return (
  <div className="customers-page">
    <p className="page-label"> Payment Management</p>

    <div className="page-header">
      <h1>💳 Payments</h1>
    </div>

    {/* Card */}
    <div
      style={{
        background:
          "linear-gradient(135deg,#4f46e5,#9333ea)",
        borderRadius: "25px",
        padding: "30px",
        color: "white",
        marginBottom: "25px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
        }}
      >
        Total Payments
      </p>

      <h1
        style={{
          fontSize: "42px",
        }}
      >
        {payments.length}
      </h1>
    </div>

    {/* Add Payment */}
    <div
      style={{
        background: "white",
        borderRadius: "25px",
        padding: "30px",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          display: "flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"25px",
          flexWrap:"wrap",
          gap:"14px",
        }}
      >
        ➕ Add Payment
      </h2>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
        }}
      >
       <input type="number" placeholder="Sale ID" value={sale_id} onChange={(e) => setSaleId(e.target.value)} />
       <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
       <input type="text" placeholder="Payment Method" value={payment_method} onChange={(e) => setPaymentMethod(e.target.value)} />
       <input type="date" value={payment_date} onChange={(e) => setPaymentDate(e.target.value)} />
      </div>

      <button
        onClick={addPayment}
        style={{
          marginTop: "20px",
          background:
            "linear-gradient(135deg,#7c3aed,#9333ea)",
          color: "white",
          border: "none",
          padding:
            "14px 30px",
          borderRadius:
            "15px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add Payment
      </button>
    </div>

    {/* Table */}
    <div style={{overflowX: "auto", }}>
  
   <table
    style={{
      width: "100%",
      borderCollapse:"separate",
      borderSpacing:"0 12px",
    }}
  >
    <thead>
      <tr>
        <th style={{ textAlign: "center", padding: "15px"}}>ID</th>
        <th style={{ textAlign: "center", padding: "15px"}}>Sale ID</th>
        <th style={{ textAlign: "center", padding: "15px"}}>Amount</th>
        <th style={{ textAlign: "center", padding: "15px"}}>Method</th>
        <th style={{ textAlign: "center", padding: "15px"}}>Date</th>
        <th style={{ textAlign: "center", padding: "15px"}}>Actions</th>
      </tr>
    </thead>

    <tbody>
  {payments.map((payment) => (
    <tr
      key={payment.payment_id}
      style={{
        background: "#f8fafc",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.05)",
        borderRadius: "15px",
      }}
    >
      <td style={{ textAlign: "center", padding: "15px" }}>
        {payment.payment_id}
      </td>

      <td style={{ textAlign: "center", padding: "15px" }}>
        {payment.sale_id}
      </td>

      <td
        style={{
          textAlign: "center",
          padding: "15px",
          fontWeight: "bold",
          color: "#7c3aed",
        }}
      >
        €{payment.amount}
      </td>

      <td style={{ textAlign: "center", padding: "15px" }}>
        <span
          style={{
            background: "#ede9fe",
            color: "#7c3aed",
            padding: "6px 12px",
            borderRadius: "999px",
          }}
        >
          {payment.payment_method}
        </span>
      </td>

      <td style={{ textAlign: "center", padding: "15px" }}>
        {new Date(
          payment.payment_date
        ).toLocaleDateString()}
      </td>

      <td style={{ textAlign: "center", padding: "15px" }}>
        <button
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "8px 12px",
            marginRight: "8px",
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
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "8px 12px",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
    </div>
     </div>
    )}
export default Payments;