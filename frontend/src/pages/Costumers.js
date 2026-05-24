import { useEffect, useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const [newCustomer, setNewCustomer] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/customers"
      );

      const data = await response.json();

      setCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD customer
  const addCustomer = async () => {
    try {
      await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      loadCustomers();

      setNewCustomer({
        full_name: "",
        phone: "",
        email: "",
        address: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE customer
  const deleteCustomer = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      loadCustomers();

    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE customer
  const updateCustomer = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/customers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        }
      );

      setEditingId(null);

      setNewCustomer({
        full_name: "",
        phone: "",
        email: "",
        address: "",
      });

      loadCustomers();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Customers</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Full Name"
          value={newCustomer.full_name}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              full_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Address"
          value={newCustomer.address}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              address: e.target.value,
            })
          }
        />

        {editingId ? (
          <button
            onClick={() =>
              updateCustomer(editingId)
            }
          >
            Update Customer
          </button>
        ) : (
          <button onClick={addCustomer}>
            Add Customer
          </button>
        )}
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.customer_id}>
              <td>{c.full_name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>

              <td>
                <button
                  onClick={() => {
                    setEditingId(
                      c.customer_id
                    );

                    setNewCustomer({
                      full_name: c.full_name,
                      phone: c.phone,
                      email: c.email,
                      address: c.address,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCustomer(
                      c.customer_id
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

export default Customers;