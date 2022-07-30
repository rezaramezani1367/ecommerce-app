import React from "react";
import { Routes, Route } from "react-router-dom";
import Address from "./components/Address";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Product from "./components/Product";
import Setting from "./components/Setting";
import Signup from "./components/Signup";

function Routers() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/setting" element={<Setting/>} />
      <Route path="/address" element={<Address/>} />
    </Routes>
  );
}

export default Routers;
