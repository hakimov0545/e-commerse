import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import style from "./Layout.module.css";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

function Layout() {
  return (
    <div className={style.container}>
      <Navbar />
      <main className="main_content">
        {/* Sub-pages will render here */}
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
