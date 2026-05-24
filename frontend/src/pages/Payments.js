import { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] =
    useState([]);

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
        "http://localhost:5000/payments"
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
        "http://localhost:5000/payments",
        {
          method: "POST",
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
        payment_method: "",
        payment_date: "",
      });

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
        `http://localhost:5000/payments/${id}`,
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
          `http://localhost:5000/payments/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              newPayment
            ),
          }
        );

        setEditingId(null);

        setNewPayment({
          sale_id: "",
          amount: "",
          payment_method: "",
          payment_date: "",
        });

        loadPayments();

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
      <h1>Payments</h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Sale ID"
          value={newPayment.sale_id}
          onChange={(e) =>
            setNewPayment({
              ...newPayment,
              sale_id:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Amount"
          value={newPayment.amount}
          onChange={(e) =>
            setNewPayment({
              ...newPayment,
              amount:
                e.target.value,
            })
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
                e.target.value,
            })
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
                e.target.value,
            })
          }
        />

        {editingId ? (
          <button
            onClick={() =>
              updatePayment(
                editingId
              )
            }
          >
            Update
          </button>
        ) : (
          <button
            onClick={addPayment}
          >
            Add
          </button>
        )}
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sale ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr
              key={p.payment_id}
            >
              <td>
                {p.payment_id}
              </td>

              <td>{p.sale_id}</td>

              <td>{p.amount}</td>

              <td>
                {
                  p.payment_method
                }
              </td>

              <td>
                {p.payment_date?.split(
                  "T"
                )[0]}
              </td>

              <td>
                <button
                  onClick={() => {
                    setEditingId(
                      p.payment_id
                    );

                    setNewPayment({
                      sale_id:
                        p.sale_id,
                      amount:
                        p.amount,
                      payment_method:
                        p.payment_method,
                      payment_date:
                        p.payment_date?.split(
                          "T"
                        )[0],
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deletePayment(
                      p.payment_id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;