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

function Roles() {
  const [roles, setRoles] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [roleName, setRoleName] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  // GET ROLES
  const fetchRoles = () => {
    fetch(
      "http://localhost:5000/roles"
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setRoles(data)
      )
      .catch((err) =>
        console.log(err)
      );
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ADD ROLE
  const addRole =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/roles",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                role_name:
                  roleName,
              }
            ),
          }
        );

        fetchRoles();
        setRoleName("");
      } catch (err) {
        console.log(err);
      }
    };

  // DELETE ROLE
  const deleteRole =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/roles/${id}`,
          {
            method:
              "DELETE",
          }
        );

        fetchRoles();
      } catch (err) {
        console.log(err);
      }
    };

  // EDIT ROLE
  const editRole = (
    role
  ) => {
    setEditingId(
      role.role_id
    );

    setRoleName(
      role.role_name
    );
  };

  // UPDATE ROLE
  const updateRole =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/roles/${editingId}`,
          {
            method:
              "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                role_name:
                  roleName,
              }
            ),
          }
        );

        fetchRoles();

        setEditingId(
          null
        );

        setRoleName("");
      } catch (err) {
        console.log(err);
      }
    };

  const filteredRoles =
    roles.filter(
      (role) =>
        role.role_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const getRoleColor = (
    role
  ) => {
    switch (
      role.toLowerCase()
    ) {
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
            Permissions
          </p>

          <h1>
            🛡 Roles
          </h1>
        </div>

        <input
          placeholder="🔍 Search role..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            ...inputStyle,
            width: "280px",
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
            ? "✏ Update Role"
            : "➕ Add Role"}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "14px",
            marginTop:
              "20px",
            flexWrap:
              "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Role Name"
            value={
              roleName
            }
            onChange={(e) =>
              setRoleName(
                e.target
                  .value
              )
            }
            style={{
              ...inputStyle,
              flex: 1,
            }}
          />

          <button
            onClick={
              editingId
                ? updateRole
                : addRole
            }
            style={{
              background:
                "#111827",
              color:
                "white",
              border:
                "none",
              borderRadius:
                "14px",
              padding:
                "12px 22px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            {editingId
              ? "Update"
              : "Add Role"}
          </button>
        </div>
      </div>

      {/* ROLES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "18px",
        }}
      >
        {filteredRoles.map(
          (role) => {
            const roleStyle =
              getRoleColor(
                role.role_name
              );

            return (
              <div
                key={
                  role.role_id
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
                      role.role_name
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
                      role.role_name
                    }
                  </span>
                </div>

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
                      editRole(
                        role
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
                      deleteRole(
                        role.role_id
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

export default Roles;