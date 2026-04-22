import "./Navbar.css";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa6";
import { useAuth } from "../../stores/user.slice";

function Navbar() {
  const { user } = useAuth();
  return (
    <nav>
      <div className="container">
        <div className="nav_content">
          <Link className="logo" to="/">
            Exclusive
          </Link>
          <ul className="list_menu">
            <li className="list_item">
              <Link className="menu_item" to="/">
                Home
              </Link>
            </li>
            <li className="list_item">
              <Link className="menu_item" to="/about">
                About
              </Link>
            </li>
            <li className="list_item">
              <Link className="menu_item" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="nav_left">
            <div className="nav_search">
              <input type="text" placeholder="What are you looking for?" />
              <IoSearch className="btn_search" />
            </div>
            <div className="btn_content">
              <button className="btn wishlit">
                <FaRegHeart />
              </button>
              <button className="btn trash">
                <SlBasket />
              </button>
              {user ? (
                <div>{user.name}</div>
              ) : (
                <Link className="btn_signup" to="/register">
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
