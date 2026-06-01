import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Users() {

  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");

  const [editingId, setEditingId] = useState(null);

 // GET USERS
const fetchUsers = async () => {
  try {
    const res = await api.get("/users");
    setUsers(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

// ADD USER
const addUser = async () => {
  try {
    await api.post("/users", {
      full_name: fullName,
      email,
      password,
      role,
    });

    fetchUsers();

    setFullName("");
    setEmail("");
    setPassword("");
    setRole("cashier");
  } catch (err) {
    console.log(err);
  }
};

// DELETE USER
const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    fetchUsers();
  } catch (err) {
    console.log(err);
  }
};

// EDIT USER
const editUser = (user) => {
  setEditingId(user.user_id);
  setFullName(user.full_name);
  setEmail(user.email);
  setPassword(user.password);
  setRole(user.role);
};

// UPDATE USER
const updateUser = async () => {
  try {
    await api.put(`/users/${editingId}`, {
      full_name: fullName,
      email,
      password,
      role,
    });

    fetchUsers();

    setEditingId(null);
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("cashier");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-kicker">Administration</p>
          <h1 className="page-heading">Users</h1>
        </div>
      </div>

      <div className="ui-card" style={{ marginBottom: "22px" }}>
        <div className="form-grid">
        <input
          className="ui-input"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="ui-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="ui-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="ui-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="cashier">Cashier</option>
        </select>

        {editingId ? (
          <button className="ui-button ui-button-primary" onClick={updateUser}>
            Update User
          </button>
        ) : (
          <button className="ui-button ui-button-primary" onClick={addUser}>
            Add User
          </button>
        )}
        </div>
      </div>

      <div className="ui-card ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="ui-button ui-button-secondary"
                  onClick={() => editUser(user)}
                >
                  Edit
                </button>

                <button
                  className="ui-button ui-button-danger"
                  onClick={() =>
                    deleteUser(user.user_id)
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
    </div>
  );
}

export default Users;
