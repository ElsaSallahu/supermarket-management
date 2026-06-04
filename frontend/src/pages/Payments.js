import React, {
  useEffect,
  useState,
} from "react";
import api from "../api/axiosConfig";

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
    const response =
      await api.get(
        "/payments"
      );

    setPayments(
      response.data
    );
  } catch (err) {
    console.log(err);
  }
};

// ADD
const addPayment =
  async () => {
    if (
      !sale_id ||
      !amount ||
      !payment_method ||
      !payment_date
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    if (
      Number(amount) <= 0
    ) {
      alert(
        "Amount must be greater than 0"
      );
      return;
    }

    try {
      await api.post(
        "/payments",
        {
          sale_id,
          amount,
          payment_method,
          payment_date,
        }
      );

      await loadPayments();

      setSaleId("");
      setAmount("");
      setPaymentMethod("");
      setPaymentDate("");
    } catch (err) {
      console.log(err);
    }
  };

// DELETE
const deletePayment =
  async (id) => {
    try {
      await api.delete(
        `/payments/${id}`
      );

      await loadPayments();
    } catch (err) {
      console.log(err);
    }
  };

// UPDATE
const updatePayment =
  async (id) => {
    try {
      await api.put(
        `/payments/${id}`,
        newPayment
      );

      await loadPayments();

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

    const filteredPayments = payments.filter(
    (p) =>
      String(
        p.sale_id
      ).includes(search) ||
      p.payment_method
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

    return (
  <div className="page">

    <div
  className="page-header"
  style={{
    display: "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    marginBottom:
      "20px",
  }}
>   
  <div>
    <p className="page-kicker">Payment Management</p>
    <h1 className="page-heading">
      Payments
    </h1>
  </div>

  <input
    className="ui-input"
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    style={{
      padding: "10px",
      borderRadius:
        "10px",
      border:
        "1px solid #ddd",
    }}
  />
</div>

    {/* Card */}
    <div
      className="ui-card"
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
      className="ui-card"
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
        Add Payment
      </h2>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
        }}
      >
       <input className="ui-input" type="number" placeholder="Sale ID" value={sale_id} onChange={(e) => setSaleId(e.target.value)} />
       <input className="ui-input" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
       <input className="ui-input" type="text" placeholder="Payment Method" value={payment_method} onChange={(e) => setPaymentMethod(e.target.value)} />
       <input className="ui-input" type="date" value={payment_date} onChange={(e) => setPaymentDate(e.target.value)} />
      </div>

      <button
        className="ui-button ui-button-primary"
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

  {filteredPayments.map((payment) => (
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
          className="ui-button ui-button-secondary"
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
          className="ui-button ui-button-danger"
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
