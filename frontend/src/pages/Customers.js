import { useEffect, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
};

const Customers = () => {
  const [customers, setCustomers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [newCustomer, setNewCustomer] =
    useState({
      full_name: "",
      phone: "",
      email: "",
      address: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/customers"
          );

        const data =
          await response.json();

        setCustomers(data);
      } catch (err) {
        console.log(err);
      }
    };

  const addCustomer =async () => {
   
if (!newCustomer.full_name || !newCustomer.phone || !newCustomer.email || !newCustomer.address) {
  alert("Please fill all fields");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(newCustomer.email)
) {
  alert("Invalid email format");
  return;
}

if ( newCustomer.phone.length < 8) {
  alert("Phone number is too short");
  return;
}
      try {
        await fetch(
          "http://localhost:5000/customers",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              newCustomer
            ),
          }
        );

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

  const deleteCustomer =
    async (id) => {
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

  const updateCustomer =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/customers/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              newCustomer
            ),
          }
        );

        setEditingId(
          null
        );

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

  const filteredCustomers =
    customers.filter(
      (c) =>
        c.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        c.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

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
          flexWrap: "wrap",
          gap: "15px",
          marginBottom:
            "25px",
        }}
      >
        <div>
          <p
            className="page-kicker"
            style={{
              margin: 0,
              color:
                "#64748b",
            }}
          >
            Customer
            Management
          </p>

          <h1
            className="page-heading"
            style={{
              margin: 0,
            }}
          >
            Customers
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search customer..."
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
        className="ui-card"
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#7c3aed)",
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
            opacity: 0.9,
          }}
        >
          Registered
          Customers
        </p>

        <h1
          style={{
            margin:
              "10px 0 0",
            fontSize:
              "42px",
          }}
        >
          {
            customers.length
          }
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
            ? "Update Customer"
            : "Add Customer"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "12px",
            marginTop: "15px",
          }}
        >
          <input
            placeholder="Full Name"
            value={
              newCustomer.full_name
            }
            onChange={(e) =>
              setNewCustomer(
                {
                  ...newCustomer,
                  full_name:
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
            placeholder="Phone"
            value={
              newCustomer.phone
            }
            onChange={(e) =>
              setNewCustomer(
                {
                  ...newCustomer,
                  phone:
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
            placeholder="Email"
            value={
              newCustomer.email
            }
            onChange={(e) =>
              setNewCustomer(
                {
                  ...newCustomer,
                  email:
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
            placeholder="Address"
            value={
              newCustomer.address
            }
            onChange={(e) =>
              setNewCustomer(
                {
                  ...newCustomer,
                  address:
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
          className="ui-button ui-button-primary"
          onClick={() =>
            editingId
              ? updateCustomer(
                  editingId
                )
              : addCustomer()
          }
          style={{
            marginTop: "18px",
            background:
              editingId
                ? "#4f46e5"
                : "#7c3aed",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          {editingId
            ? "Update Customer"
            : "Add Customer"}
        </button>
      </div>

      {/* CUSTOMER CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >
        {filteredCustomers.map(
          (c) => (
            <div
              key={ c.customer_id }
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                borderTop: "6px solid #7c3aed",
              }}
            >
              <h3>
                { c.full_name }
              </h3>

              <p>
                Phone:{" "}
                { c.phone }
              </p>

              <p>
                Email:{" "}
                { c.email }
              </p>

              <p>
                Address:{" "}
                { c.address }
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  className="ui-button ui-button-secondary"
                  onClick={() => {
                    setEditingId(
                      c.customer_id
                    );

                    setNewCustomer(
                      {
                        full_name:
                          c.full_name,
                        phone:
                          c.phone,
                        email:
                          c.email,
                        address:
                          c.address,
                      }
                    );
                  }}
                  style={{
                    background: "#4f46e5",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    flex: 1,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  className="ui-button ui-button-danger"
                  onClick={() =>
                    deleteCustomer(
                      c.customer_id
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
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Customers;
