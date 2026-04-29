import style from "./Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer_container}>
        <div className={style.footer_col}>
          <h3>Exclusive</h3>
          <p className={style.subscribe}>Subscribe</p>
          <p>Get 10% off your first order</p>

          <div className={style.email_box}>
            <input type="email" placeholder="Enter your email" />
            <button>➤</button>
          </div>
        </div>

        <div className={style.footer_col}>
          <h4>Support</h4>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div className={style.footer_col}>
          <h4>Account</h4>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </div>

        <div className={style.footer_col}>
          <h4>Quick Link</h4>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>

        <div className={style.footer_col}>
          <h4>Download App</h4>
          <p className={style.small_text}>Save $3 with App New User Only</p>

          <div className={style.app_box}>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Example"
              alt="qr"
            />

            <div className={style.store_buttons}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="google play"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="app store"
              />
            </div>
          </div>

          <div className={style.socials}>
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © Copyright Rimel 2026. All right reserved
      </div>
    </footer>
  );
}

export default Footer;
