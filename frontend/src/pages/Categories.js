import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [newCategory, setNewCategory] = useState({
    emri: "",
    pershkrimi: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/categories");
    const data = await response.json();
    setCategories(data);
  };

  const clearForm = () => {
    setNewCategory({
      emri: "",
      pershkrimi: "",
    });

    setEditingId(null);
  };

  const addCategory = async () => {
    await fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    loadData();
    clearForm();
  };

  const updateCategory = async () => {
    await fetch(`http://localhost:5000/categories/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    loadData();
    clearForm();
  };

  const deleteCategory = async (id) => {
    await fetch(`http://localhost:5000/categories/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  const editCategory = (c) => {
    setEditingId(c.category_id);

    setNewCategory({
      emri: c.emri,
      pershkrimi: c.pershkrimi,
    });
  };

  return (
    <div>
      <h2>Categories</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Emri"
          value={newCategory.emri}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              emri: e.target.value,
            })
          }
        />

        <input
          placeholder="Pershkrimi"
          value={newCategory.pershkrimi}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              pershkrimi: e.target.value,
            })
          }
        />

        {editingId ? (
          <button onClick={updateCategory}>
            Update Category
          </button>
        ) : (
          <button onClick={addCategory}>
            Add Category
          </button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Emri</th>
            <th>Pershkrimi</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.category_id}>
              <td>{c.emri}</td>
              <td>{c.pershkrimi}</td>

              <td>
                <button onClick={() => editCategory(c)}>
                  Edit
                </button>

                <button onClick={() => deleteCategory(c.category_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;