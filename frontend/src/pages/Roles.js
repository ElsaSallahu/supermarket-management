import React, { useEffect, useState } from "react";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // GET ROLES
  const fetchRoles = () => {
  fetch("http://localhost:5000/roles", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ADD ROLE
  const addRole = async () => {
    try {
      await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role_name: roleName,
        }),
      });

      fetchRoles();
      setRoleName("");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ROLE
  const deleteRole = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/roles/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchRoles();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT ROLE
  const editRole = (role) => {
    setEditingId(role.role_id);
    setRoleName(role.role_name);
  };

  // UPDATE ROLE
  const updateRole = async () => {
    try {
      await fetch(
        `http://localhost:5000/roles/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role_name: roleName,
          }),
        }
      );

      fetchRoles();

      setEditingId(null);
      setRoleName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="page-kicker">Administration</p>
          <h1 className="page-heading">Roles</h1>
        </div>
      </div>

      <div className="ui-card" style={{ marginBottom: "22px" }}>
      <div className="form-grid">
      <input
        className="ui-input"
        type="text"
        placeholder="Role Name"
        value={roleName}
        onChange={(e) =>
          setRoleName(e.target.value)
        }
      />

      {editingId ? (
        <button className="ui-button ui-button-primary" onClick={updateRole}>
          Update Role
        </button>
      ) : (
        <button className="ui-button ui-button-primary" onClick={addRole}>
          Add Role
        </button>
      )}
      </div>
      </div>

      <div className="ui-card ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr key={role.role_id}>
              <td>{role.role_id}</td>
              <td>{role.role_name}</td>
              <td>
                <button
                  className="ui-button ui-button-secondary"
                  onClick={() => editRole(role)}
                >
                  Edit
                </button>

                <button
                  className="ui-button ui-button-danger"
                  onClick={() =>
                    deleteRole(role.role_id)
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

export default Roles;
