import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div>
      <main className="register_content">
        <img className="register_img" src="register.jpg" alt="" />
        <div className="form_content">
          <h2>Create an account</h2>
          <p>Enter your details below</p>

          <form>
            <input type="text" placeholder="Name" required />
            <input type="text" placeholder="Email or Phone Number" required />
            <input type="password" placeholder="Password" required />

            <button className="btn-primary">Create Account</button>

            <button type="button" className="btn-google">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
              />
              Sign up with Google
            </button>
          </form>

          <span className="login-text">
            Already have account? <Link>Login</Link>
          </span>
        </div>
      </main>
    </div>
  );
}

export default Register;
