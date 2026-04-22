import { Link } from "react-router-dom";
import st from "./Login.module.css";

function Login() {
  return (
    <div>
      <main className={st.login_content}>
        <img className={st.login_img} src="register.jpg" alt="" />
        <div className={st.form_content}>
          <h2>Log in to Exclusive</h2>
          <p>Enter your details below</p>

          <form>
            <input type="text" placeholder="Email or Phone Number" required />
            <input type="password" placeholder="Password" required />

            <button className={st.btn_primary}>Log In</button>

            <button type="button" className={st.btn_google}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
              />
              Sign up with Google
            </button>
          </form>

          <span className={st.login_text}>
            Do not have an account yet? <Link to="/register">Register</Link>
          </span>
        </div>
      </main>
    </div>
  );
}

export default Login;
