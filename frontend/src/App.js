<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e2867bcef7aebb25a20fe81e1dc955492f950621
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [produktet, setProduktet] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    emri: "",
    barkodi: "",
    cmimi_blerjes: "",
    cmimi_shitjes: "",
    njesia_matese: "",
    stoku: "",
    pragu_minimumi: "",
    data_skadences: ""
  });

  const merrProduktet = () => {
    axios.get("http://localhost:5000/produktet")
      .then((res) => setProduktet(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    merrProduktet();
  }, []);

  const ndryshoFormen = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const shtoProdukt = () => {
    axios.post("http://localhost:5000/produktet", form)
      .then(() => {
        merrProduktet();
        pastroFormen();
      })
      .catch((err) => console.log(err));
  };

  const fshiProdukt = (id) => {
    axios.delete(`http://localhost:5000/produktet/${id}`)
      .then(() => merrProduktet())
      .catch((err) => console.log(err));
  };

  const editoProdukt = (p) => {
    setEditId(p.produkti_id);
    setForm({
      emri: p.emri || "",
      barkodi: p.barkodi || "",
      cmimi_blerjes: p.cmimi_blerjes || "",
      cmimi_shitjes: p.cmimi_shitjes || "",
      njesia_matese: p.njesia_matese || "",
      stoku: p.stoku || "",
      pragu_minimumi: p.pragu_minimumi || "",
      data_skadences: p.data_skadences ? p.data_skadences.split("T")[0] : ""
    });
  };

  const perditesoProdukt = () => {
    axios.put(`http://localhost:5000/produktet/${editId}`, form)
      .then(() => {
        merrProduktet();
        pastroFormen();
        setEditId(null);
      })
      .catch((err) => console.log(err));
  };

  const pastroFormen = () => {
    setForm({
      emri: "",
      barkodi: "",
      cmimi_blerjes: "",
      cmimi_shitjes: "",
      njesia_matese: "",
      stoku: "",
      pragu_minimumi: "",
      data_skadences: ""
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Menaxhimi i Produkteve</h1>

      <input name="emri" placeholder="Emri" value={form.emri} onChange={ndryshoFormen} />
      <input name="barkodi" placeholder="Barkodi" value={form.barkodi} onChange={ndryshoFormen} />
      <input name="cmimi_blerjes" placeholder="Cmimi blerjes" value={form.cmimi_blerjes} onChange={ndryshoFormen} />
      <input name="cmimi_shitjes" placeholder="Cmimi shitjes" value={form.cmimi_shitjes} onChange={ndryshoFormen} />
      <input name="njesia_matese" placeholder="Njesia" value={form.njesia_matese} onChange={ndryshoFormen} />
      <input name="stoku" placeholder="Stoku" value={form.stoku} onChange={ndryshoFormen} />
      <input name="pragu_minimumi" placeholder="Pragu minimumi" value={form.pragu_minimumi} onChange={ndryshoFormen} />
      <input type="date" name="data_skadences" value={form.data_skadences} onChange={ndryshoFormen} />

      <br /><br />

      {editId ? (
        <button onClick={perditesoProdukt}>Perditeso Produktin</button>
      ) : (
        <button onClick={shtoProdukt}>Shto Produkt</button>
      )}

      <br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Barkodi</th>
            <th>Cmimi Blerjes</th>
            <th>Cmimi Shitjes</th>
            <th>Njesia</th>
            <th>Stoku</th>
            <th>Pragu</th>
            <th>Data</th>
            <th>Veprime</th>
          </tr>
        </thead>

        <tbody>
          {produktet.map((p) => (
            <tr key={p.produkti_id}>
              <td>{p.produkti_id}</td>
              <td>{p.emri}</td>
              <td>{p.barkodi}</td>
              <td>{p.cmimi_blerjes}</td>
              <td>{p.cmimi_shitjes}</td>
              <td>{p.njesia_matese}</td>
              <td>{p.stoku}</td>
              <td>{p.pragu_minimumi}</td>
              <td>{p.data_skadences?.split("T")[0]}</td>
              <td>
                <button onClick={() => editoProdukt(p)}>Edit</button>
                <button onClick={() => fshiProdukt(p.produkti_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

<<<<<<< HEAD
=======
=======
>>>>>>> e2867bcef7aebb25a20fe81e1dc955492f950621
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main app */}
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
>>>>>>> 697f02eaf861ab3a6928287dbe265d226986a2b3
=======
>>>>>>> e2867bcef7aebb25a20fe81e1dc955492f950621
export default App;