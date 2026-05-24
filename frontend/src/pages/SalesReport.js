import { useEffect, useState } from "react";

const SalesReport = () => {
  const [sales, setSales] =
    useState([]);

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/sales"
      );

      const data =
        await response.json();

      setSales(data);

      // total revenue
      const total = data.reduce(
        (sum, sale) =>
          sum +
          Number(sale.total),
        0
      );

      setTotalRevenue(total);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Sales Report 📊
      </h1>

      <h3>
        Total Sales:
        {" "}
        {sales.length}
      </h3>

      <h3>
        Total Revenue:
        {" "}
        {totalRevenue} €
      </h3>

      <table border="1">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Customer ID</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.sale_id}
            >
              <td>
                {sale.sale_id}
              </td>

              <td>
                {
                  sale.customer_id
                }
              </td>

              <td>
                {sale.total} €
              </td>

              <td>
                {sale.sale_date?.split(
                  "T"
                )[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;