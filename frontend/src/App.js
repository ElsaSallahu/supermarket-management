import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerProducts from "./pages/customer/CustomerProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/customer-login"
  element={<CustomerLogin />}
/>

<Route
  path="/customer-register"
  element={<CustomerRegister />}
/>

<Route
  path="/customer-home"
  element={<CustomerHome />}
/>

<Route
  path="/customer-products"
  element={<CustomerProducts />}
/>

        <Route
          path="/*"
          element={<DefaultLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;