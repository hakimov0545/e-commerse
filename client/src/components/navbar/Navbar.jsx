import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BsBasket2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { useAuth } from "../../stores/user.slice";
import { RiAccountPinCircleLine } from "react-icons/ri";

function Navbar() {
  const { user } = useAuth();
  return (
    <nav>
      <div className={style.container}>
        <div className={style.nav_content}>
          <Link className={style.logo} to="/">
            Exclusive
          </Link>
          <ul className={style.list_menu}>
            <li className={style.list_item}>
              <Link className={style.menu_item} to="/">
                Home
              </Link>
            </li>
            <li className={style.list_item}>
              <Link className={style.menu_item} to="/about">
                About
              </Link>
            </li>
            <li className={style.list_item}>
              <Link className={style.menu_item} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className={style.nav_left}>
            <div className={style.nav_search}>
              <input type="text" placeholder="What are you looking for?" />
              <IoSearch className={style.btn_search} />
            </div>
            <div className={style.btn_content}>
              <Link className={style.btn} to="/wishlist">
                <FaRegHeart />
              </Link>
              <Link className={style.btn} to="/trash">
                <BsBasket2 />
              </Link>
              {user ? (
                <Link className={style.btn} to="/account">
                  <RiAccountPinCircleLine />
                </Link>
              ) : (
                <Link className={style.btn_signup} to="/register">
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
