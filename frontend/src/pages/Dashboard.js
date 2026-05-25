import React from 'react'

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1
        style={{
          marginBottom: '20px',
        }}
      >
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>
            💰 Total Sales
          </span>
          <strong>
            $12,480
          </strong>
          <small>
            Today
          </small>
        </div>

        <div className="stat-card">
          <span>
            📦 Products
          </span>
          <strong>
            248
          </strong>
          <small>
            In Stock
          </small>
        </div>

        <div className="stat-card">
          <span>
            👥 Customers
          </span>
          <strong>
            1,824
          </strong>
          <small>
            This Month
          </small>
        </div>

        <div className="stat-card warning">
          <span>
            ⚠ Low Stock
          </span>
          <strong>
            17
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

          <div className="activity-row">
            <span>
              🥛 Milk 1L
              restocked
            </span>

            <b>
              +40
            </b>
          </div>

          <div className="activity-row">
            <span>
              🍞 Bread
              sold
            </span>

            <b>
              -18
            </b>
          </div>

          <div className="activity-row">
            <span>
              👤 Cashier
              shift opened
            </span>

            <b>
              09:00
            </b>
          </div>

          <div className="activity-row">
            <span>
              🍎 Apples
              low stock
            </span>

            <b>
              5 left
            </b>
          </div>
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
            🛒 Orders
          </h3>
          <h1>
            320
          </h1>
        </div>

        <div className="panel">
          <h3>
            👨‍💼 Employees
          </h3>
          <h1>
            28
          </h1>
        </div>

        <div className="panel">
          <h3>
            💳 Payments
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