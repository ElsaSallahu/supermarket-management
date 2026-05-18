import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [produktet, setProduktet] = useState([]);

  const merrProduktet = () => {
    axios
      .get("http://localhost:5000/produktet")
      .then((res) => {
        setProduktet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    merrProduktet();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Lista e Produkteve</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Barkodi</th>
            <th>Çmimi Blerjes</th>
            <th>Çmimi Shitjes</th>
            <th>Njesia</th>
            <th>Stoku</th>
            <th>Pragu Minimumi</th>
            <th>Data Skadencës</th>
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
              <td>{p.data_skadences}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;