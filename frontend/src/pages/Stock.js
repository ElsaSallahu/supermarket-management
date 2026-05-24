import { useEffect, useState } from "react";

const Stock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock = async () => {
    const response = await fetch("http://localhost:5000/stock");
    const data = await response.json();
    setStock(data);
  };

  return (
    <div>
      <h2>Stock / Low Stock Alert</h2>

      <table>
        <thead>
          <tr>
            <th>Produkti</th>
            <th>Barkodi</th>
            <th>Stoku</th>
            <th>Pragu Minimumi</th>
            <th>Njesia</th>
            <th>Statusi</th>
          </tr>
        </thead>

        <tbody>
          {stock.map((s) => (
            <tr key={s.produkti_id}>
              <td>{s.emri}</td>
              <td>{s.barkodi}</td>
              <td>{s.stoku}</td>
              <td>{s.pragu_minimumi}</td>
              <td>{s.njesia_matese}</td>
              <td>
                {s.statusi === "LOW STOCK" ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    LOW STOCK
                  </span>
                ) : (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    OK
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;