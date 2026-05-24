import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilCart,
  cilPeople,
  cilUser,
  cilBriefcase,
} from '@coreui/icons'

import { CNavItem } from '@coreui/react'

const getNavigation = () => {
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  const role =
    user?.role || 'cashier'

  return [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: (
        <CIcon
          icon={cilSpeedometer}
          customClassName="nav-icon"
        />
      ),
    },

    {
      component: CNavItem,
      name: 'Products',
      to: '/products',
      icon: (
        <CIcon
          icon={cilCart}
          customClassName="nav-icon"
        />
      ),
    },

    ...(role === 'admin'
      ? [
          {
            component:
              CNavItem,
            name: 'Users',
            to: '/users',
            icon: (
              <CIcon
                icon={cilUser}
                customClassName="nav-icon"
              />
            ),
          },

          {
            component:
              CNavItem,
            name: 'Roles',
            to: '/roles',
            icon: (
              <CIcon
                icon={cilPeople}
                customClassName="nav-icon"
              />
            ),
          },
        ]
      : []),

    ...(role !==
    'cashier'
      ? [
          {
            component:
              CNavItem,
            name:
              'Employees',
            to: '/employees',
            icon: (
              <CIcon
                icon={
                  cilBriefcase
                }
                customClassName="nav-icon"
              />
            ),
          },
        ]
      : []),
  ]
}

export default getNavigation