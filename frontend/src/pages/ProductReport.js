import { useEffect, useState } from "react";

const ProductReport = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const response = await fetch("http://localhost:5000/product-report");
    const data = await response.json();
    setReport(data);
  };

  if (!report) {
    return <div>Loading report...</div>;
  }

  return (
    <div>
      <h2>Product Report</h2>

      <div className="report-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{report.total_products}</p>
        </div>

        <div className="card">
          <h3>Total Stock</h3>
          <p>{report.total_stock}</p>
        </div>

        <div className="card">
          <h3>Purchase Value</h3>
          <p>{report.total_purchase_value} €</p>
        </div>

        <div className="card">
          <h3>Sale Value</h3>
          <p>{report.total_sale_value} €</p>
        </div>

        <div className="card">
          <h3>Low Stock Products</h3>
          <p>{report.low_stock_products}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReport;