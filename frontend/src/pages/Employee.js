import React, {
  useEffect,
  useState,
} from "react";
import api from "../api/axiosConfig";
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
const fetchEmployees = async () => {
  try {
    const res = await api.get("/employees");
    setEmployees(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchEmployees();
}, []);

// ADD EMPLOYEE
const addEmployee = async () => {
  try {
    await api.post("/employees", {
      full_name: fullName,
      phone,
      position,
      salary,
    });

    fetchEmployees();

    setFullName("");
    setPhone("");
    setPosition("");
    setSalary("");
  } catch (err) {
    console.log(err);
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  try {
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  } catch (err) {
    console.log(err);
  }
};

// EDIT EMPLOYEE
const editEmployee = (employee) => {
  setEditingId(employee.employee_id);

  setFullName(employee.full_name);

  setPhone(employee.phone);

  setPosition(employee.position);

  setSalary(employee.salary);
};

// UPDATE EMPLOYEE
const updateEmployee = async () => {
  try {
    await api.put(`/employees/${editingId}`, {
      full_name: fullName,
      phone,
      position,
      salary,
    });

    fetchEmployees();

    setEditingId(null);

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
    <div
      style={{
        padding: "10px",
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
          marginBottom:
            "25px",
          flexWrap:
            "wrap",
          gap: "14px",
        }}
      >
        <div>
          <p
            style={{
              color:
                "#64748b",
              margin: 0,
            }}
          >
            Staff Management
          </p>

          <h1>
            👨‍💼 Employees
          </h1>
        </div>

        <input
          placeholder="🔍 Search employee..."
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
            ? "✏ Update Employee"
            : "➕ Add Employee"}
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
                📞{" "}
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
                💼{" "}
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