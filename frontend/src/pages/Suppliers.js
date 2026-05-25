import { useEffect, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
};

const Suppliers = () => {
  const [suppliers, setSuppliers] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [newSupplier, setNewSupplier] =
    useState({
      emri_kompanise: "",
      personi_kontaktues: "",
      email: "",
      telefoni: "",
      adresa: "",
    });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers =
    async () => {
      const response =
        await fetch(
          "http://localhost:5000/suppliers"
        );

      const data =
        await response.json();

      setSuppliers(data);
    };

  const clearForm = () => {
    setNewSupplier({
      emri_kompanise: "",
      personi_kontaktues: "",
      email: "",
      telefoni: "",
      adresa: "",
    });

    setEditingId(null);
  };

  const addSupplier =
    async () => {
      await fetch(
        "http://localhost:5000/suppliers",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            newSupplier
          ),
        }
      );

      loadSuppliers();
      clearForm();
    };

  const updateSupplier =
    async () => {
      await fetch(
        `http://localhost:5000/suppliers/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            newSupplier
          ),
        }
      );

      loadSuppliers();
      clearForm();
    };

  const deleteSupplier =
    async (id) => {
      await fetch(
        `http://localhost:5000/suppliers/${id}`,
        {
          method: "DELETE",
        }
      );

      loadSuppliers();
    };

  const editSupplier = (s) => {
    setEditingId(
      s.supplier_id
    );

    setNewSupplier({
      emri_kompanise:
        s.emri_kompanise ||
        "",
      personi_kontaktues:
        s.personi_kontaktues ||
        "",
      email:
        s.email || "",
      telefoni:
        s.telefoni ||
        "",
      adresa:
        s.adresa || "",
    });
  };

  const filteredSuppliers =
    suppliers.filter(
      (s) =>
        s.emri_kompanise
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        s.personi_kontaktues
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      style={{
        padding: "24px",
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
          flexWrap: "wrap",
          gap: "15px",
          marginBottom:
            "25px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color:
                "#64748b",
            }}
          >
            Business Partners
          </p>

          <h1
            style={{
              margin: 0,
            }}
          >
            🚚 Suppliers
          </h1>
        </div>

        <input
          placeholder="🔍 Search supplier..."
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

      {/* STATS */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          borderRadius:
            "20px",
          padding: "22px",
          marginBottom:
            "25px",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          Total Suppliers
        </p>

        <h1
          style={{
            margin:
              "10px 0 0",
          }}
        >
          {
            suppliers.length
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
            ? "✏ Update Supplier"
            : "➕ Add Supplier"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "12px",
            marginTop:
              "15px",
          }}
        >
          <input
            placeholder="Company Name"
            value={
              newSupplier.emri_kompanise
            }
            onChange={(e) =>
              setNewSupplier(
                {
                  ...newSupplier,
                  emri_kompanise:
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
            placeholder="Contact Person"
            value={
              newSupplier.personi_kontaktues
            }
            onChange={(e) =>
              setNewSupplier(
                {
                  ...newSupplier,
                  personi_kontaktues:
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
              newSupplier.email
            }
            onChange={(e) =>
              setNewSupplier(
                {
                  ...newSupplier,
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
            placeholder="Phone"
            value={
              newSupplier.telefoni
            }
            onChange={(e) =>
              setNewSupplier(
                {
                  ...newSupplier,
                  telefoni:
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
              newSupplier.adresa
            }
            onChange={(e) =>
              setNewSupplier(
                {
                  ...newSupplier,
                  adresa:
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
          onClick={
            editingId
              ? updateSupplier
              : addSupplier
          }
          style={{
            marginTop:
              "18px",
            background:
              editingId
                ? "#0f172a"
                : "#059669",
            color:
              "white",
            border:
              "none",
            padding:
              "12px 18px",
            borderRadius:
              "12px",
            cursor:
              "pointer",
            fontWeight:
              "700",
          }}
        >
          {editingId
            ? "Update Supplier"
            : "Add Supplier"}
        </button>
      </div>

      {/* SUPPLIER CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "18px",
        }}
      >
        {filteredSuppliers.map(
          (s) => (
            <div
              key={
                s.supplier_id
              }
              style={{
                background:
                  "white",
                borderRadius:
                  "20px",
                padding:
                  "20px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
                borderLeft:
                  "6px solid #059669",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin:
                        "0 0 5px",
                    }}
                  >
                    🏢{" "}
                    {
                      s.emri_kompanise
                    }
                  </h3>

                  <p
                    style={{
                      color:
                        "#64748b",
                      margin:
                        0,
                    }}
                  >
                    👤{" "}
                    {
                      s.personi_kontaktues
                    }
                  </p>
                </div>

                <span
                  style={{
                    background:
                      "#dcfce7",
                    color:
                      "#059669",
                    padding:
                      "6px 10px",
                    borderRadius:
                      "999px",
                    fontSize:
                      "12px",
                    fontWeight:
                      "700",
                  }}
                >
                  Supplier
                </span>
              </div>

              <div
                style={{
                  marginTop:
                    "15px",
                  color:
                    "#475569",
                }}
              >
                <p>
                  📧{" "}
                  {s.email}
                </p>

                <p>
                  📞{" "}
                  {
                    s.telefoni
                  }
                </p>

                <p>
                  📍{" "}
                  {s.adresa}
                </p>
              </div>

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  marginTop:
                    "15px",
                }}
              >
                <button
                  onClick={() =>
                    editSupplier(
                      s
                    )
                  }
                  style={{
                    background:
                      "#0f172a",
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
                  ✏ Edit
                </button>

                <button
                  onClick={() =>
                    deleteSupplier(
                      s.supplier_id
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
                  🗑 Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Suppliers;