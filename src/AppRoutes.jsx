import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import UsersPage from "./pages/UsersPage";
import UserInfoPage from "./pages/UserInfoPage";
import OrdersPage from "./pages/OrdersPage";
import OrderInfoPage from "./pages/OrderInfoPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<UpdateProductPage />} />
      <Route path="/products/new-product" element={<AddProductPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserInfoPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:orderId" element={<OrderInfoPage />} />
    </Routes>
  );
}

export default AppRoutes;
