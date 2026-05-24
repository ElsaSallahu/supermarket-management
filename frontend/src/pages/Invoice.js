import { useEffect, useState } from "react";

const Invoice = () => {
  const [invoices, setInvoices] =
    useState([]);

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

  const loadInvoices = async () => {
    try {
      const response = await fetch(
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
  const addInvoice = async () => {
    try {
      await fetch(
        "http://localhost:5000/invoice",
        {
          method: "POST",
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
        invoice_number: "",
        total_amount: "",
        invoice_date: "",
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
            method: "DELETE",
          }
        );

        loadInvoices();

      } catch (err) {
        console.log(err);
      }
    };

  // UPDATE
  const updateInvoice =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/invoice/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              newInvoice
            ),
          }
        );

        setEditingId(null);

        setNewInvoice({
          sale_id: "",
          invoice_number: "",
          total_amount: "",
          invoice_date: "",
        });

        loadInvoices();

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
      <h1>Invoice</h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Sale ID"
          value={
            newInvoice.sale_id
          }
          onChange={(e) =>
            setNewInvoice({
              ...newInvoice,
              sale_id:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Invoice Number"
          value={
            newInvoice.invoice_number
          }
          onChange={(e) =>
            setNewInvoice({
              ...newInvoice,
              invoice_number:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Total Amount"
          value={
            newInvoice.total_amount
          }
          onChange={(e) =>
            setNewInvoice({
              ...newInvoice,
              total_amount:
                e.target.value,
            })
          }
        />

        <input
          type="date"
          value={
            newInvoice.invoice_date
          }
          onChange={(e) =>
            setNewInvoice({
              ...newInvoice,
              invoice_date:
                e.target.value,
            })
          }
        />

        {editingId ? (
          <button
            onClick={() =>
              updateInvoice(
                editingId
              )
            }
          >
            Update
          </button>
        ) : (
          <button
            onClick={addInvoice}
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
            <th>Invoice No</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((i) => (
            <tr
              key={i.invoice_id}
            >
              <td>
                {i.invoice_id}
              </td>

              <td>
                {i.sale_id}
              </td>

              <td>
                {
                  i.invoice_number
                }
              </td>

              <td>
                {
                  i.total_amount
                }
              </td>

              <td>
                {i.invoice_date?.split(
                  "T"
                )[0]}
              </td>

              <td>
                <button
                  onClick={() => {
                    setEditingId(
                      i.invoice_id
                    );

                    setNewInvoice({
                      sale_id:
                        i.sale_id,
                      invoice_number:
                        i.invoice_number,
                      total_amount:
                        i.total_amount,
                      invoice_date:
                        i.invoice_date?.split(
                          "T"
                        )[0],
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteInvoice(
                      i.invoice_id
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

export default Invoice;