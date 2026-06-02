import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerProducts from "./pages/customer/CustomerProducts";
import CustomerCategories from "./pages/customer/CustomerCategories";
import CustomerOffers from "./pages/customer/CustomerOffers";
import CustomerCart from "./pages/customer/CustomerCart";
import CustomerLayout from "./pages/customer/CustomerLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/login" element={<Login />}/>
<Route path="/register" element={<Register />}/>
<Route path="/customer-login" element={<CustomerLogin />}/>
<Route path="/customer-register" element={<CustomerRegister />}/>
<Route path="/customer" element={<CustomerLayout />}>
<Route path="home" element={<CustomerHome />} />
<Route path="products" element={<CustomerProducts />} />
<Route path="categories" element={<CustomerCategories />} />
<Route path="offers" element={<CustomerOffers />} />
<Route path="cart" element={<CustomerCart />} />
<Route path="/customer-login" element={<CustomerLogin />}
/>
</Route>

<Route path="/*" element={<DefaultLayout />}/>
</Routes>
    </BrowserRouter>
  );
}

export default App;