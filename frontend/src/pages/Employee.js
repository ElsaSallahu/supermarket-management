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

function Employees() {
  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  // GET EMPLOYEES
  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD EMPLOYEE
  const addEmployee =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/employees",
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
                phone,
                position,
                salary,
              }
            ),
          }
        );

        fetchEmployees();

        setFullName("");
        setPhone("");
        setPosition("");
        setSalary("");
      } catch (err) {
        console.log(err);
      }
    };

  // DELETE
  const deleteEmployee =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/employees/${id}`,
          {
            method:
              "DELETE",
          }
        );

        fetchEmployees();
      } catch (err) {
        console.log(err);
      }
    };

  // EDIT
  const editEmployee = (
    employee
  ) => {
    setEditingId(
      employee.employee_id
    );

    setFullName(
      employee.full_name
    );

    setPhone(
      employee.phone
    );

    setPosition(
      employee.position
    );

    setSalary(
      employee.salary
    );
  };

  // UPDATE
  const updateEmployee =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/employees/${editingId}`,
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
                phone,
                position,
                salary,
              }
            ),
          }
        );

        fetchEmployees();

        setEditingId(
          null
        );

        setFullName("");
        setPhone("");
        setPosition("");
        setSalary("");
      } catch (err) {
        console.log(err);
      }
    };

  const filteredEmployees =
    employees.filter(
      (employee) =>
        employee.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        employee.position
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
            Staff Management
          </p>

          <h1 className="page-heading">
            Employees
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search employee..."
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
            ? "Update Employee"
            : "Add Employee"}
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
            type="text"
            placeholder="Position"
            value={
              position
            }
            onChange={(e) =>
              setPosition(
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
              ? updateEmployee
              : addEmployee
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
            ? "Update Employee"
            : "Add Employee"}
        </button>
      </div>

      {/* EMPLOYEE CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "18px",
        }}
      >
        {filteredEmployees.map(
          (
            employee
          ) => (
            <div
              key={
                employee.employee_id
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
                    employee.full_name
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
                    employee.salary
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
                  employee.phone
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
                Position:{" "}
                {
                  employee.position
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
                    editEmployee(
                      employee
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
                    deleteEmployee(
                      employee.employee_id
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

export default Employees;
