import React, {
  useEffect, 
  useState, 
} from 'react'

const Dashboard = () => {
  const [stats, setStats] =
    useState({
      totalSales: 0,
      products: 0,
      customers: 0,
      lowStock: 0,
    })

const [activities, setActivities] =
  useState([]);

  //  kur hapet faqja i merr statistikat
  useEffect(() => {
    loadStats()
  }, [])

  // merr data prej backend
  const loadStats =
    async () => {
      try {

  const activityRes =
       await fetch("http://localhost:5000/user-activity");

const activityData = await activityRes.json();

setActivities(activityData);

        // SALES
        const salesRes =
          await fetch(
            'http://localhost:5000/sales'
          )

        const sales =
          await salesRes.json()
          console.log(sales)

        // PRODUCTS
        const productsRes =
          await fetch(
            'http://localhost:5000/products'
          )

        const products =
          await productsRes.json()
          console.log(products)

        // CUSTOMERS
        const customersRes =
          await fetch(
            'http://localhost:5000/customers'
          )

        const customers =
          await customersRes.json()
          console.log(customers)

        // TOTAL SALES
        const totalRevenue =
          sales.reduce(
            (sum, sale) =>
              sum +
              Number(
                sale.total_amount
              ),
            0
          )

        //  LOW STOCK
        const lowStock =
          products.filter(
            (p) =>
              Number(
                p.stock
              ) < 10
          ).length

        // ruan statistikat
        setStats({
          totalSales:
            totalRevenue,
          products:
            products.length,
          customers:
            customers.length,
          lowStock,
        })

      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <p className="page-kicker">Operations</p>
          <h1 className="page-heading">Dashboard Overview</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>
            Total Sales
          </span>
          <strong>
            €{ stats.totalSales}
          </strong>
          <small>
            Today
          </small>
        </div>

        <div className="stat-card">
          <span>
            Products
          </span>
          <strong>
             {stats.products}
          </strong>
          <small>
            In Stock
          </small>
        </div>

        <div className="stat-card">
          <span>
            Customers
          </span>
          <strong>
             {
    stats.customers
  }
          </strong>
          <small>
            This Month
          </small>
        </div>

        <div className="stat-card warning">
          <span>
            Low Stock
          </span>
          <strong>
            {stats.lowStock }
          </strong>
          <small>
            Need Attention
          </small>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-grid">
        <section className="panel">
<h2>
  Recent Activity
</h2>

{
  activities.length > 0 ? (
    activities.map((activity) => (
      <div
        key={activity.activity_id}
        className="activity-row"
      >
        <span>
          {activity.user_name}
        </span>

        <b>
          {activity.activity_type}
        </b>
      </div>
    ))
  ) : (
    <p>No recent activity</p>
  )
}
          
        </section>

        <section className="panel">
          <h2>
            Business Overview
          </h2>

          <div className="meter">
            <span>
              Daily Target
            </span>

            <div>
              <i
                style={{
                  width:
                    '72%',
                }}
              />
            </div>
          </div>

          <div className="meter">
            <span>
              Inventory
              Health
            </span>

            <div>
              <i
                style={{
                  width:
                    '84%',
                }}
              />
            </div>
          </div>

          <div className="meter">
            <span>
              Staff
              Coverage
            </span>

            <div>
              <i
                style={{
                  width:
                    '65%',
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop:
            '30px',
        }}
      >
        <div className="panel">
          <h3>
            Orders
          </h3>
          <h1>
            320
          </h1>
        </div>

        <div className="panel">
          <h3>
            Employees
          </h3>
          <h1>
            28
          </h1>
        </div>

        <div className="panel">
          <h3>
            Payments
          </h3>
          <h1>
            180
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
