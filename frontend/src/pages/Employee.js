import React, { useEffect, useState } from "react";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  const [editingId, setEditingId] = useState(null);

  // GET EMPLOYEES
  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD EMPLOYEE
  const addEmployee = async () => {
    try {
      await fetch(
        "http://localhost:5000/employees",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            phone,
            position,
            salary,
          }),
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

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/employees/${id}`,
        {
          method: "DELETE",
        }
      );

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
      await fetch(
        `http://localhost:5000/employees/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            phone,
            position,
            salary,
          }),
        }
      );

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

  return (
    <div>
      <h2>Employees Management</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) =>
          setPosition(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) =>
          setSalary(e.target.value)
        }
      />

      {editingId ? (
        <button
          onClick={updateEmployee}
        >
          Update Employee
        </button>
      ) : (
        <button onClick={addEmployee}>
          Add Employee
        </button>
      )}

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>
                {employee.employee_id}
              </td>
              <td>
                {employee.full_name}
              </td>
              <td>{employee.phone}</td>
              <td>
                {employee.position}
              </td>
              <td>
                {employee.salary}
              </td>

              <td>
                <button
                  onClick={() =>
                    editEmployee(employee)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteEmployee(
                      employee.employee_id
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
}

export default Employees;

