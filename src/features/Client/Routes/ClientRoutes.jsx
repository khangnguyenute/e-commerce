import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { Order } from "../Order";
import { ProductDetail } from "@client/ProductDetail";
import { Product } from "@client/Product";
import { Profile } from "@client/Profile";
import { Cart } from "@client/Cart";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="cart" element={<Cart />} />
      <Route path="phone" element={<Product category="Phone" />} />
      <Route path="phone/:id" element={<ProductDetail />} />
      <Route path="tablet" element={<Product category="Tablet" />} />
      <Route path="tablet/:id" element={<ProductDetail />} />
      <Route path="laptop" element={<Product category="Laptop" />} />
      <Route path="laptop/:id" element={<ProductDetail />} />
      <Route path="order" element={<Order title="Xác nhận đơn hàng " />} />
      <Route path="my/*" element={<Profile />} />
      <Route path="*" element={<Home title="home" />} />
    </Routes>
  );
};

export default memo(ClientRoutes);
