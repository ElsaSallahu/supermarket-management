import { useEffect, useState } from "react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [newSupplier, setNewSupplier] = useState({
    emri_kompanise: "",
    personi_kontaktues: "",
    email: "",
    telefoni: "",
    adresa: "",
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const response = await fetch("http://localhost:5000/suppliers");
    const data = await response.json();
    setSuppliers(data);
  };

  const clearForm = () => {
    setNewSupplier({
      emri_kompanise: "",
      personi_kontaktues: "",
      email: "",
      telefoni: "",
      adresa: "",
    });
    setEditingId(null);
  };

  const addSupplier = async () => {
    await fetch("http://localhost:5000/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSupplier),
    });

    loadSuppliers();
    clearForm();
  };

  const updateSupplier = async () => {
    await fetch(`http://localhost:5000/suppliers/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSupplier),
    });

    loadSuppliers();
    clearForm();
  };

  const deleteSupplier = async (id) => {
    await fetch(`http://localhost:5000/suppliers/${id}`, {
      method: "DELETE",
    });

    loadSuppliers();
  };

  const editSupplier = (s) => {
    setEditingId(s.supplier_id);
    setNewSupplier({
      emri_kompanise: s.emri_kompanise || "",
      personi_kontaktues: s.personi_kontaktues || "",
      email: s.email || "",
      telefoni: s.telefoni || "",
      adresa: s.adresa || "",
    });
  };

  return (
    <div>
      <h2>Suppliers</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Emri kompanise"
          value={newSupplier.emri_kompanise}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, emri_kompanise: e.target.value })
          }
        />

        <input
          placeholder="Personi kontaktues"
          value={newSupplier.personi_kontaktues}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, personi_kontaktues: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={newSupplier.email}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, email: e.target.value })
          }
        />

        <input
          placeholder="Telefoni"
          value={newSupplier.telefoni}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, telefoni: e.target.value })
          }
        />

        <input
          placeholder="Adresa"
          value={newSupplier.adresa}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, adresa: e.target.value })
          }
        />

        {editingId ? (
          <button onClick={updateSupplier}>Update Supplier</button>
        ) : (
          <button onClick={addSupplier}>Add Supplier</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Emri Kompanise</th>
            <th>Personi Kontaktues</th>
            <th>Email</th>
            <th>Telefoni</th>
            <th>Adresa</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((s) => (
            <tr key={s.supplier_id}>
              <td>{s.emri_kompanise}</td>
              <td>{s.personi_kontaktues}</td>
              <td>{s.email}</td>
              <td>{s.telefoni}</td>
              <td>{s.adresa}</td>
              <td>
                <button onClick={() => editSupplier(s)}>Edit</button>
                <button onClick={() => deleteSupplier(s.supplier_id)}>
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

export default Suppliers;