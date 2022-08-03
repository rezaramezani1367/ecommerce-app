import React from "react";
import { Routes, Route } from "react-router-dom";
import Address from "./components/Address";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Order from "./components/Order";
import Orders from "./components/Orders";
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
      <Route path="/setting" element={<Setting />} />
      <Route path="/address" element={<Address />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders">
        <Route index element={<Orders />} />
        <Route path=":id" element={<Order />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routers;
