import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./Layout.css";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main_content">
        {/* Sub-pages will render here */}

        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
