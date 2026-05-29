import React from 'react'

const CustomerProducts = React.lazy(() =>
  import('./pages/customer/CustomerProducts')
)

const CustomerLogin = React.lazy(() =>
  import('./pages/customer/CustomerLogin')
)

const CustomerRegister = React.lazy(() =>
  import('./pages/customer/CustomerRegister')
) 

const Dashboard = React.lazy(() =>
  import('./pages/Dashboard')
)

const Products = React.lazy(() =>
  import('./pages/Products')
)

const Users = React.lazy(() =>
  import('./pages/Users')
)

const Roles = React.lazy(() =>
  import('./pages/Roles')
)

const Cashier = React.lazy(() =>
  import('./pages/Cashier')
)

const Employee = React.lazy(() =>
  import('./pages/Employee')
)

const Categories = React.lazy(() =>
  import('./pages/Categories')
)

const Customers = React.lazy(() =>
  import('./pages/Customers')
)

const CustomerHome = React.lazy(() =>
  import('./pages/CustomerHome')
)

const ProductReport = React.lazy(() =>
  import('./pages/ProductReport')
)

const Stock = React.lazy(() =>
  import('./pages/Stock')
)

const Suppliers = React.lazy(() =>
  import('./pages/Suppliers')
)

const UserActivity = React.lazy(() =>
  import('./pages/userActivity')
)

const Invoice = React.lazy(() =>
  import('./pages/Invoice')
)

const Payments = React.lazy(() =>
  import('./pages/Payments')
)

const SaleItems = React.lazy(() =>
  import('./pages/SaleItems')
)

const Sales = React.lazy(() =>
  import('./pages/Sales')
)

const SalesReport = React.lazy(() =>
  import('./pages/SalesReport')
)

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
  },

  {
    path: '/products',
    name: 'Products',
    element: Products,
  },

  {
    path: '/users',
    name: 'Users',
    element: Users,
  },

  {
    path: '/roles',
    name: 'Roles',
    element: Roles,
  },

  {
    path: '/cashiers',
    name: 'Cashiers',
    element: Cashier,
  },

  {
    path: '/employees',
    name: 'Employees',
    element: Employee,
  },

  {
    path: '/categories',
    name: 'Categories',
    element: Categories,
  },

  {
    path: '/customers',
    name: 'Customers',
    element: Customers,
  },

  {
    path: '/customer-home',
    name: 'Customer Home',
    element: CustomerHome,
  },

  {
    path: '/stock',
    name: 'Stock',
    element: Stock,
  },

  {
    path: '/suppliers',
    name: 'Suppliers',
    element: Suppliers,
  },

  {
  path: '/customer-products',
  name: 'Customer Products',
  element: CustomerProducts,
},

{
  path: '/customer-login',
  name: 'Customer Login',
  element: CustomerLogin,
},

{
  path: '/customer-register',
  name: 'Customer Register',
  element: CustomerRegister,
},

  {
    path: '/invoice',
    name: 'Invoice',
    element: Invoice,
  },

  {
    path: '/payments',
    name: 'Payments',
    element: Payments,
  },

  {
    path: '/sales',
    name: 'Sales',
    element: Sales,
  },

  {
    path: '/sale-items',
    name: 'Sale Items',
    element: SaleItems,
  },

  {
    path: '/sales-report',
    name: 'Sales Report',
    element: SalesReport,
  },

  {
    path: '/user-activity',
    name: 'User Activity',
    element: UserActivity,
  },

  {
    path: '/product-report',
    name: 'Product Report',
    element: ProductReport,
  },
]

export default routes