import { useEffect, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #dbe3ee",
  outline: "none",
  background: "#fff",
  fontSize: "14px",
};

const buttonStyle = {
  border: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  cursor: "pointer",
  fontWeight: "700",
};

const Categories = () => {
  const [categories, setCategories] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [newCategory, setNewCategory] =
    useState({
      emri: "",
      pershkrimi: "",
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response =
      await fetch(
        "http://localhost:5000/categories"
      );

    const data =
      await response.json();

    setCategories(data);
  };

  const clearForm = () => {
    setNewCategory({
      emri: "",
      pershkrimi: "",
    });

    setEditingId(null);
  };

  const addCategory =
    async () => {
      await fetch(
        "http://localhost:5000/categories",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            newCategory
          ),
        }
      );

      loadData();
      clearForm();
    };

  const updateCategory =
    async () => {
      await fetch(
        `http://localhost:5000/categories/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            newCategory
          ),
        }
      );

      loadData();
      clearForm();
    };

  const deleteCategory =
    async (id) => {
      await fetch(
        `http://localhost:5000/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      loadData();
    };

  const editCategory = (c) => {
    setEditingId(
      c.category_id
    );

    setNewCategory({
      emri: c.emri,
      pershkrimi:
        c.pershkrimi,
    });
  };

  const filteredCategories =
    categories.filter(
      (c) =>
        c.emri
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        c.pershkrimi
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
            "20px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <p
            className="page-kicker"
            style={{
              margin: 0,
              color:
                "#64748b",
            }}
          >
            Management
          </p>

          <h1
            className="page-heading"
            style={{
              margin: 0,
            }}
          >
            Categories
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search category..."
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
        className="ui-card"
        style={{
          background:
            "linear-gradient(135deg, #2563eb, #60a5fa)",
          color: "white",
          borderRadius:
            "20px",
          padding: "20px",
          marginBottom:
            "25px",
          boxShadow:
            "0 10px 25px rgba(37,99,235,0.2)",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          Total Categories
        </p>

        <h1
          style={{
            margin:
              "10px 0 0",
          }}
        >
          {
            categories.length
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
            ? "Update Category"
            : "Add Category"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px,1fr))",
            gap: "12px",
            marginTop:
              "15px",
          }}
        >
          <input
            className="ui-input"
            placeholder="Category Name"
            value={
              newCategory.emri
            }
            onChange={(e) =>
              setNewCategory(
                {
                  ...newCategory,
                  emri:
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
            className="ui-input"
            placeholder="Description"
            value={
              newCategory.pershkrimi
            }
            onChange={(e) =>
              setNewCategory(
                {
                  ...newCategory,
                  pershkrimi:
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
              ? updateCategory
              : addCategory
          }
          style={{
            ...buttonStyle,
            background:
              editingId
                ? "#2563eb"
                : "#16a34a",
            color:
              "white",
            marginTop:
              "18px",
          }}
        >
          {editingId
            ? "Update Category"
            : "Add Category"}
        </button>
      </div>

      {/* CATEGORY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px,1fr))",
          gap: "18px",
        }}
      >
        {filteredCategories.map(
          (c) => (
            <div
              key={
                c.category_id
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
                <h3
                  style={{
                    margin: 0,
                  }}
                >
                  {c.emri}
                </h3>

                <span
                  style={{
                    background:
                      "#dbeafe",
                    color:
                      "#2563eb",
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
                  Category
                </span>
              </div>

              <p
                style={{
                  color:
                    "#64748b",
                  marginTop:
                    "12px",
                }}
              >
                {
                  c.pershkrimi
                }
              </p>

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
                  className="ui-button ui-button-secondary"
                  onClick={() =>
                    editCategory(
                      c
                    )
                  }
                  style={{
                    ...buttonStyle,
                    background:
                      "#2563eb",
                    color:
                      "white",
                    flex: 1,
                  }}
                >
                  Edit
                </button>

                <button
                  className="ui-button ui-button-danger"
                  onClick={() =>
                    deleteCategory(
                      c.category_id
                    )
                  }
                  style={{
                    ...buttonStyle,
                    background:
                      "#ef4444",
                    color:
                      "white",
                    flex: 1,
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
};

export default Categories;
