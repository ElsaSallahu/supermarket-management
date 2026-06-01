import React, {
  useEffect,
  useState,
} from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
};

function Cashiers() {
  const [cashiers, setCashiers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [shiftTime, setShiftTime] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  // GET CASHIERS
  const fetchCashiers = () => {
    fetch(
      "http://localhost:5000/cashiers"
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setCashiers(data)
      )
      .catch((err) =>
        console.log(err)
      );
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  // ADD
  const addCashier =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/cashiers",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                full_name:
                  fullName,
                shift_time:
                  shiftTime,
                phone,
                salary,
              }
            ),
          }
        );

        fetchCashiers();

        setFullName("");
        setShiftTime("");
        setPhone("");
        setSalary("");
      } catch (err) {
        console.log(err);
      }
    };

  // DELETE
  const deleteCashier =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/cashiers/${id}`,
          {
            method:
              "DELETE",
          }
        );

        fetchCashiers();
      } catch (err) {
        console.log(err);
      }
    };

  // EDIT
  const editCashier = (
    cashier
  ) => {
    setEditingId(
      cashier.cashier_id
    );

    setFullName(
      cashier.full_name
    );

    setShiftTime(
      cashier.shift_time
    );

    setPhone(
      cashier.phone
    );

    setSalary(
      cashier.salary
    );
  };

  // UPDATE
  const updateCashier =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/cashiers/${editingId}`,
          {
            method:
              "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                full_name:
                  fullName,
                shift_time:
                  shiftTime,
                phone,
                salary,
              }
            ),
          }
        );

        fetchCashiers();

        setEditingId(
          null
        );

        setFullName("");
        setShiftTime("");
        setPhone("");
        setSalary("");
      } catch (err) {
        console.log(err);
      }
    };

  const filteredCashiers =
    cashiers.filter(
      (cashier) =>
        cashier.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        cashier.shift_time
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
            Register Staff
          </p>

          <h1 className="page-heading">
            Cashiers
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search cashier..."
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
          padding: "24px",
          marginBottom:
            "25px",
          boxShadow:
            "0 14px 35px rgba(15,23,42,0.06)",
        }}
      >
        <h2>
          {editingId
            ? "Update Cashier"
            : "Add Cashier"}
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
            type="text"
            placeholder="Full Name"
            value={
              fullName
            }
            onChange={(e) =>
              setFullName(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            type="text"
            placeholder="Shift Time"
            value={
              shiftTime
            }
            onChange={(e) =>
              setShiftTime(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            type="number"
            placeholder="Salary"
            value={
              salary
            }
            onChange={(e) =>
              setSalary(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />
        </div>

        <button
          className="ui-button ui-button-primary"
          onClick={
            editingId
              ? updateCashier
              : addCashier
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
            ? "Update Cashier"
            : "Add Cashier"}
        </button>
      </div>

      {/* CASHIER CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",

          gap: "18px",
        }}
      >
        {filteredCashiers.map(
          (
            cashier
          ) => (
            <div
              key={
                cashier.cashier_id
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
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",
                }}
              >
                <h3>
                  {
                    cashier.full_name
                  }
                </h3>

                <span
                  style={{
                    background:
                      "#dcfce7",

                    color:
                      "#059669",

                    padding:
                      "8px 12px",

                    borderRadius:
                      "999px",

                    fontWeight:
                      "700",

                    fontSize:
                      "13px",
                  }}
                >
                  $
                  {
                    cashier.salary
                  }
                </span>
              </div>

              <p
                style={{
                  color:
                    "#64748b",
                  marginTop:
                    "10px",
                }}
              >
                Phone:{" "}
                {
                  cashier.phone
                }
              </p>

              <p
                style={{
                  color:
                    "#64748b",
                  marginTop:
                    "6px",
                }}
              >
                ⏰ Shift:{" "}
                {
                  cashier.shift_time
                }
              </p>

              <div
                style={{
                  display:
                    "flex",
                  gap: "10px",
                  marginTop:
                    "20px",
                }}
              >
                <button
                  onClick={() =>
                    editCashier(
                      cashier
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
                    deleteCashier(
                      cashier.cashier_id
                    )
                  }
                  style={{
                    flex: 1,
                    background:
                      "#f3f4f6",
                    color:
                      "#111827",
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

export default Cashiers;
