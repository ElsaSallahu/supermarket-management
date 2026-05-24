import { useEffect, useState } from "react";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ customer_id: "", total_amount: "", sale_date: "",});

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/sales"
      );

      const data = await response.json();

      setSales(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD SALE
  const addSale = async () => {
    try {
      await fetch(
        "http://localhost:5000/sales",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(newSale),
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

  // DELETE SALE
  const deleteSale = async (id) => {
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

  // UPDATE SALE
  const updateSale = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/sales/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(newSale),
        }
      );

      setEditingId(null);

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

  return (
    <div>
      <h1>Sales</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Customer ID"
          value={newSale.customer_id}
          onChange={(e) =>
            setNewSale({
              ...newSale,
              customer_id:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Total"
          value={newSale.total_amount}
          onChange={(e) =>
            setNewSale({
              ...newSale,
              total_amount: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={newSale.sale_date}
          onChange={(e) =>
            setNewSale({
              ...newSale,
              sale_date:
                e.target.value,
            })
          }
        />

        {editingId ? (
          <button
            onClick={() =>
              updateSale(editingId)
            }
          >
            Update Sale
          </button>
        ) : (
          <button onClick={addSale}>
            Add Sale
          </button>
        )}
      </div>

      {/* TABLE */}
      <table border="1">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Customer ID</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s.sale_id}>
              <td>{s.sale_id}</td>
              <td>{s.customer_id}</td>
              <td>{s.total_amount}</td>
              <td>
                {s.sale_date?.split(
                  "T"
                )[0]}
              </td>

              <td>
                <button
                  onClick={() => {
                    setEditingId(
                      s.sale_id
                    );

                    setNewSale({
                      customer_id:
                        s.customer_id,
                      total_amount: s.total,
                      sale_date:
                        s.sale_date?.split(
                          "T"
                        )[0],
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteSale(
                      s.sale_id
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

export default Sales;