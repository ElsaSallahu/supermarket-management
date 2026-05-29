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

function Users() {
  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("cashier");

  const [editingId, setEditingId] =
    useState(null);

  const fetchUsers = () => {
    fetch(
      "http://localhost:5000/users"
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setUsers(data)
      )
      .catch((err) =>
        console.log(err)
      );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/users",
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
                email,
                password,
                role,
              }
            ),
          }
        );

        fetchUsers();

        setFullName("");
        setEmail("");
        setPassword("");
        setRole(
          "cashier"
        );
      } catch (err) {
        console.log(err);
      }
    };

  const deleteUser =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/users/${id}`,
          {
            method:
              "DELETE",
          }
        );

        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    };

  const editUser = (
    user
  ) => {
    setEditingId(
      user.user_id
    );

    setFullName(
      user.full_name
    );

    setEmail(
      user.email
    );

    setPassword(
      user.password
    );

    setRole(
      user.role
    );
  };

  const updateUser =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/users/${editingId}`,
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
                email,
                password,
                role,
              }
            ),
          }
        );

        fetchUsers();

        setEditingId(
          null
        );

        setFullName("");
        setEmail("");
        setPassword("");
        setRole(
          "cashier"
        );
      } catch (err) {
        console.log(err);
      }
    };

  const filteredUsers =
    users.filter(
      (user) =>
        user.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const getRoleColor = (
    role
  ) => {
    switch (role) {
      case "admin":
        return {
          bg: "#fee2e2",
          color:
            "#dc2626",
        };

      case "manager":
        return {
          bg: "#dbeafe",
          color:
            "#2563eb",
        };

      default:
        return {
          bg: "#dcfce7",
          color:
            "#059669",
        };
    }
  };

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
            Access Control
          </p>

          <h1>
            👥 Users
          </h1>
        </div>

        <input
          placeholder="🔍 Search user..."
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
            ? "✏ Update User"
            : "➕ Add User"}
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
            type="email"
            placeholder="Email"
            value={
              email
            }
            onChange={(e) =>
              setEmail(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={
              password
            }
            onChange={(e) =>
              setPassword(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          >
            <option value="admin">
              Admin
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="cashier">
              Cashier
            </option>
          </select>
        </div>

        <button
          onClick={
            editingId
              ? updateUser
              : addUser
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
            ? "Update User"
            : "Add User"}
        </button>
      </div>

      {/* USERS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

          gap: "18px",
        }}
      >
        {filteredUsers.map(
          (user) => {
            const roleStyle =
              getRoleColor(
                user.role
              );

            return (
              <div
                key={
                  user.user_id
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
                      user.full_name
                    }
                  </h3>

                  <span
                    style={{
                      background:
                        roleStyle.bg,

                      color:
                        roleStyle.color,

                      padding:
                        "8px 12px",

                      borderRadius:
                        "999px",

                      fontSize:
                        "12px",

                      fontWeight:
                        "700",
                    }}
                  >
                    {
                      user.role
                    }
                  </span>
                </div>

                <p
                  style={{
                    color:
                      "#64748b",
                    marginTop:
                      "8px",
                  }}
                >
                  📧{" "}
                  {
                    user.email
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
                      editUser(
                        user
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
                      deleteUser(
                        user.user_id
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
            );
          }
        )}
      </div>
    </div>
  );
}

export default Users;