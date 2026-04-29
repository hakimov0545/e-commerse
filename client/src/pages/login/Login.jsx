import { Link, useNavigate } from "react-router-dom";
import st from "./Login.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../stores/user.slice";
import { useEffect } from "react";
import { useAuthForm } from "../../hooks/useAuthForm";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const { onSubmit } = useAuthForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <main className={st.login_content}>
        <img className={st.login_img} src="register.jpg" alt="" />
        <div className={st.form_content}>
          <h2>Log in to Exclusive</h2>
          <p>Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className={st.error}>Email is required</span>
            )}
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className={st.error}>Password is required</span>
            )}

            <button type="submit" className={st.btn_primary}>
              Log In
            </button>

            <button type="button" className={st.btn_google}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
              />
              Sign up with Google
            </button>
          </form>

          <div className={st.login_text}>
            Do not have an account yet? <Link to="/register">Register</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
