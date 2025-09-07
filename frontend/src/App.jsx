import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import AuthLayout from "./components/auth/Layout";
import Register from "./pages/auth/Register";

import AdminLayout from "./components/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProduct from "./pages/admin/product/Product";
import AdminProductAdd from "./pages/admin/product/AddProduct";
import AdminUpdateProduct from "./pages/admin/product/UpdateProduct";
import AdminOrder from "./pages/admin/Order";
import AdminFeatures from "./pages/admin/Features";

import ShopLayout from "./components/shop/Layout";
import ShopHome from "./pages/shop/Home";
import ShopList from "./pages/shop/Listing";
import ShopAccount from "./pages/shop/Account";
import ShopCheckOut from "./pages/shop/Checkout";

import NotFound from "./pages/NotFound/Index";
import Unauthorized from "./pages/NotFound/Unuthorized";
import Home from "./pages/Home";

import AdminUser from "./pages/admin/user/User";
import AdminAddUser from "./pages/admin/user/AddUser";
import AdminUpdateUser from "./pages/admin/user/UpdateUser";
import Product from "./pages/shop/Product";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="product">
            <Route index element={<AdminProduct />} />
            <Route path="add" element={<AdminProductAdd />} />
            <Route path="update/:id" element={<AdminUpdateProduct />} />
          </Route>
          <Route path="user">
            <Route index element={<AdminUser />} />
            <Route path="add" element={<AdminAddUser />} />
            <Route path="update/:id" element={<AdminUpdateUser />} />
          </Route>

          <Route path="order" element={<AdminOrder />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<ShopHome />} />
          <Route path="home" element={<ShopHome />} />
          <Route path="list" element={<ShopList />} />
          <Route path="account" element={<ShopAccount />} />
          <Route path="checkout" element={<ShopCheckOut />} />
          <Route path="product" element={<Product />} />
        </Route>

        <Route path="/unauth-page" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
