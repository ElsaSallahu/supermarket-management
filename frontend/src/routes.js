import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Products = React.lazy(() => import('./pages/Products'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products', name: 'Products', element: Products },
]

export default routes
