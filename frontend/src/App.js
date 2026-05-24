import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";

import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Employee from "./pages/Employee";
import Stock from "./pages/Stock";
import ProductReport from "./pages/ProductReport";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/product-report" element={<ProductReport />} />


        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;