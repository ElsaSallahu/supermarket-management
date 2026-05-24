import React, { useEffect, useState } from "react";

function Cashiers() {
  const [cashiers, setCashiers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [shiftTime, setShiftTime] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");

  const [editingId, setEditingId] = useState(null);

  // GET CASHIERS
  const fetchCashiers = () => {
    fetch("http://localhost:5000/cashiers")
      .then((res) => res.json())
      .then((data) => setCashiers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  // ADD CASHIER
  const addCashier = async () => {
    try {
      await fetch("http://localhost:5000/cashiers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          shift_time: shiftTime,
          phone,
          salary,
        }),
      });

      fetchCashiers();

      setFullName("");
      setShiftTime("");
      setPhone("");
      setSalary("");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE CASHIER
  const deleteCashier = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/cashiers/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchCashiers();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT CASHIER
  const editCashier = (cashier) => {
    setEditingId(cashier.cashier_id);
    setFullName(cashier.full_name);
    setShiftTime(cashier.shift_time);
    setPhone(cashier.phone);
    setSalary(cashier.salary);
  };

  // UPDATE CASHIER
  const updateCashier = async () => {
    try {
      await fetch(
        `http://localhost:5000/cashiers/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            shift_time: shiftTime,
            phone,
            salary,
          }),
        }
      );

      fetchCashiers();

      setEditingId(null);
      setFullName("");
      setShiftTime("");
      setPhone("");
      setSalary("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Cashiers Management</h2>

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
        placeholder="Shift Time"
        value={shiftTime}
        onChange={(e) =>
          setShiftTime(e.target.value)
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
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) =>
          setSalary(e.target.value)
        }
      />

      {editingId ? (
        <button onClick={updateCashier}>
          Update Cashier
        </button>
      ) : (
        <button onClick={addCashier}>
          Add Cashier
        </button>
      )}

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Shift Time</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cashiers.map((cashier) => (
            <tr key={cashier.cashier_id}>
              <td>{cashier.cashier_id}</td>
              <td>{cashier.full_name}</td>
              <td>{cashier.shift_time}</td>
              <td>{cashier.phone}</td>
              <td>{cashier.salary}</td>

              <td>
                <button
                  onClick={() =>
                    editCashier(cashier)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCashier(
                      cashier.cashier_id
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

export default Cashiers;