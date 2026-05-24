import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Products = React.lazy(() => import('./pages/Products'))
const Users = React.lazy(() => import('./pages/Users'))
const Roles = React.lazy(() => import('./pages/Roles'))
const Cashier = React.lazy(() => import('./pages/Cashier'))
const Employee = React.lazy(() => import('./pages/Employee'))
const Categories = React.lazy(() => import('./pages/Categories'))
const Costumers = React.lazy(() => import('./pages/Costumers'))
const ProductReport = React.lazy(() => import('./pages/ProductReport'))
const Stock = React.lazy(() => import('./pages/Stock'))
const Suppliers = React.lazy(() => import('./pages/Suppliers'))
const UserActivity = React.lazy(() => import('./pages/userActivity'))

const routes = [
  { path: '/', exact: true, name: 'Home' },

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
    element: Costumers,
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