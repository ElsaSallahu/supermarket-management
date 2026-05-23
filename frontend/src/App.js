import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<DefaultLayout />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<Suppliers />} />

      </Routes>
    </BrowserRouter>
  );
} 
export default App;
