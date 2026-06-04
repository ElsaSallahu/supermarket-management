import React from "react";

import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = React.lazy(() =>
  import("./pages/Dashboard")
);

const Products = React.lazy(() =>
  import("./pages/Products")
);

const Users = React.lazy(() =>
  import("./pages/Users")
);

const Roles = React.lazy(() =>
  import("./pages/Roles")
);

const Cashier = React.lazy(() =>
  import("./pages/Cashier")
);

const Employee = React.lazy(() =>
  import("./pages/Employee")
);

const Categories = React.lazy(() =>
  import("./pages/Categories")
);

const Customers = React.lazy(() =>
  import("./pages/Customers")
);

const CustomerHome = React.lazy(() =>
  import("./pages/CustomerHome")
);

const ProductReport =
  React.lazy(() =>
    import(
      "./pages/ProductReport"
    )
  );

const Stock = React.lazy(() =>
  import("./pages/Stock")
);

const Suppliers =
  React.lazy(() =>
    import(
      "./pages/Suppliers"
    )
  );

const UserActivity =
  React.lazy(() =>
    import(
      "./pages/userActivity"
    )
  );

const Invoice = React.lazy(() =>
  import("./pages/Invoice")
);

const Payments =
  React.lazy(() =>
    import(
      "./pages/Payments"
    )
  );

const SaleItems =
  React.lazy(() =>
    import(
      "./pages/SaleItems"
    )
  );

const Sales = React.lazy(() =>
  import("./pages/Sales")
);

const SalesReport =
  React.lazy(() =>
    import(
      "./pages/SalesReport"
    )
  );

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
        ]}
      >
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/products",
    name: "Products",
    element: Products,
  },
  {
  path: "/product-report",
  name: "Product Report",
  element: () => (
    <ProtectedRoute
      allowedRoles={[
        "admin",
        "manager",
      ]}
    >
      <ProductReport />
    </ProtectedRoute>
  ),
},

  {
    path: "/users",
    name: "Users",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
        ]}
      >
        <Users />
      </ProtectedRoute>
    ),
  },

  {
    path: "/roles",
    name: "Roles",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
        ]}
      >
        <Roles />
      </ProtectedRoute>
    ),
  },

  {
    path: "/cashiers",
    name: "Cashiers",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
        ]}
      >
        <Cashier />
      </ProtectedRoute>
    ),
  },

  {
    path: "/employees",
    name: "Employees",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
        ]}
      >
        <Employee />
      </ProtectedRoute>
    ),
  },

  {
    path: "/categories",
    name: "Categories",
    element: Categories,
  },

  {
    path: "/customers",
    name: "Customers",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
          "cashier",
        ]}
      >
        <Customers />
      </ProtectedRoute>
    ),
  },

  {
    path: "/customer-home",
    name: "Customer Home",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "customer",
        ]}
      >
        <CustomerHome />
      </ProtectedRoute>
    ),
  },


  {
    path: "/stock",
    name: "Stock",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
        ]}
      >
        <Stock />
      </ProtectedRoute>
    ),
  },

  {
    path: "/suppliers",
    name: "Suppliers",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
        ]}
      >
        <Suppliers />
      </ProtectedRoute>
    ),
  },

  {
    path: "/invoice",
    name: "Invoice",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
          "cashier",
        ]}
      >
        <Invoice />
      </ProtectedRoute>
    ),
  },

  {
    path: "/payments",
    name: "Payments",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
          "cashier",
        ]}
      >
        <Payments />
      </ProtectedRoute>
    ),
  },

  {
    path: "/sales",
    name: "Sales",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
          "cashier",
        ]}
      >
        <Sales />
      </ProtectedRoute>
    ),
  },

  {
    path: "/sale-items",
    name: "Sale Items",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
          "cashier",
        ]}
      >
        <SaleItems />
      </ProtectedRoute>
    ),
  },

  {
    path: "/sales-report",
    name: "Sales Report",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
          "manager",
        ]}
      >
        <SalesReport />
      </ProtectedRoute>
    ),
  },

  {
    path: "/user-activity",
    name: "User Activity",
    element: () => (
      <ProtectedRoute
        allowedRoles={[
          "admin",
        ]}
      >
        <UserActivity />
      </ProtectedRoute>
    ),
  },


   {
  path: "/products",
  name: "Products",
  element: () => (
    <ProtectedRoute
      allowedRoles={[
        "admin",
        "manager",
        "cashier",
        "customer",
      ]}
    >
      <Products />
    </ProtectedRoute>
  ),
},
  
];

export default routes;