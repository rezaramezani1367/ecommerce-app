import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Product from "./components/Product";

function Routers() {
  return (
    <Routes>
      <Route>

        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
      </Route>
        <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routers;
