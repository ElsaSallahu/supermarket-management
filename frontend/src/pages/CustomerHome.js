import { useEffect, useState } from "react";

const CustomerHome = () => {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/product"
      );

      const data =
        await response.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h1 className="page-heading">
        Welcome Customer
      </h1>

      <p>
        Available Products
      </p>

      <div className="ui-card ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Barcode</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr
              key={
                p.produkti_id
              }
            >
              <td>{p.emri}</td>

              <td>
                {p.barkodi}
              </td>

              <td>
                {
                  p.cmimi_shitjes
                }
                €
              </td>

              <td>
                {p.stoku}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CustomerHome;
