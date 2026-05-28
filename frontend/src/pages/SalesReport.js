import React, {
  useEffect,
  useState,
} from "react";

function SalesReport() {
  const [sales, setSales] =
    useState([]);

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/sales"
          );

        const data =
          await response.json();

        setSales(data);

        const total =
          data.reduce(
            (
              sum,
              sale
            ) =>
              sum +
              Number(
                sale.total_amount ||
                  sale.total ||
                  0
              ),
            0
          );

        setTotalRevenue(
          total
        );
      } catch (err) {
        console.log(err);
      }
    };

  const filteredSales =
    sales.filter(
      (sale) =>
        String(
          sale.customer_id
        ).includes(
          search
        ) ||
        String(
          sale.sale_id
        ).includes(
          search
        )
    );

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
            "30px",
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
            Analytics
            Dashboard
          </p>

          <h1>
            📊 Sales
            Report
          </h1>
        </div>

        <input
          placeholder="🔍 Search sale..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            width:
              "300px",
            padding:
              "12px 14px",
            borderRadius:
              "14px",
            border:
              "1px solid #d1d5db",
            outline:
              "none",
            fontSize:
              "14px",
          }}
        />
      </div>

      {/* STATS */}
      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "18px",
          marginBottom:
            "30px",
        }}
      >
        <div
          style={{
            background:
              "white",
            borderRadius:
              "28px",
            padding:
              "24px",
            boxShadow:
              "0 14px 35px rgba(15,23,42,0.06)",
          }}
        >
          <p
            style={{
              color:
                "#64748b",
            }}
          >
            Total Sales
          </p>

          <h1>
            {
              sales.length
            }
          </h1>
        </div>

        <div
          style={{
            background:
              "white",
            borderRadius:
              "28px",
            padding:
              "24px",
            boxShadow:
              "0 14px 35px rgba(15,23,42,0.06)",
          }}
        >
          <p
            style={{
              color:
                "#64748b",
            }}
          >
            Total Revenue
          </p>

          <h1>
            €
            {
              totalRevenue
            }
          </h1>
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background:
            "white",
          borderRadius:
            "28px",
          padding:
            "24px",
          boxShadow:
            "0 14px 35px rgba(15,23,42,0.06)",
          overflowX:
            "auto",
        }}
      >
        <h2
          style={{
            marginBottom:
              "20px",
          }}
        >
          Sales List
        </h2>

        <table
          style={{
            width:
              "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "#f8fafc",
              }}
            >
              <th
                style={
                  thStyle
                }
              >
                Sale ID
              </th>

              <th
                style={
                  thStyle
                }
              >
                Customer ID
              </th>

              <th
                style={
                  thStyle
                }
              >
                Total
              </th>

              <th
                style={
                  thStyle
                }
              >
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map(
              (
                sale
              ) => (
                <tr
                  key={
                    sale.sale_id
                  }
                >
                  <td
                    style={
                      tdStyle
                    }
                  >
                    #
                    {
                      sale.sale_id
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {
                      sale.customer_id
                    }
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    €
                    {sale.total_amount ||
                      sale.total}
                  </td>

                  <td
                    style={
                      tdStyle
                    }
                  >
                    {sale.sale_date?.split(
                      "T"
                    )[0]}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding:
    "14px",
  textAlign:
    "left",
  color:
    "#64748b",
};

const tdStyle = {
  padding:
    "16px 14px",
  borderTop:
    "1px solid #eef2f7",
};

export default SalesReport;