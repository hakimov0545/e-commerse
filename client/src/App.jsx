import Home from "./pages/home/Home";
import Trash from "./pages/trash/Trash";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import Account from "./pages/account/Account";
import Category from "./pages/category/Category";
import Register from "./pages/register/Register";
import Wishlist from "./pages/wishlist/Wishlist";
import Payment from "./pages/payment/Payment";
import NotFound from "./pages/notfound/NotFound";
import Product from "./pages/product/Product";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wishlist" element={<Payment />} />
        <Route path="/product/:slug" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
