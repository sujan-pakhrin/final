import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import AuthLayout from "./components/auth/Layout"
import Register from "./pages/auth/Register"
import AdminLayout from './components/admin/Layout'
import AdminDashoboard from './pages/admin/Dashboard'
import AdminProduct from './pages/admin/Product'
import AdminOrder from './pages/admin/Order'
import AdminFeatures from './pages/admin/Features'
import ShopLayout from './components/shop/Layout'
import NotFound from './pages/NotFound/Index'
import ShopHome from './pages/shop/Home'
import ShopList from './pages/shop/Listing'
import ShopAccount from './pages/shop/Account'
import ShopCheckOut from './pages/shop/Checkout'
import Auth from "./components/utils/Auth"
import Unuthorized from './pages/NotFound/Unuthorized'


function App() {
  const isAuthenticated=false
  const user={
    name:"ram",
    role:"admin"
  };


  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="/auth" element={
            <Auth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
             </Auth>
          }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/admin" element={
            <Auth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
             </Auth>
          }>
            <Route path="dashboard" element={<AdminDashoboard />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          <Route path="/shop" element={
            <Auth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </Auth>
          }>
            <Route path="home" element={<ShopHome />} />
            <Route path="list" element={<ShopList />} />
            <Route path="account" element={<ShopAccount />} />
            <Route path="checkout" element={<ShopCheckOut />} />

          </Route>
          <Route path="unauth-page" element={<Unuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
