import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import authService from "../../service/auth.service";
import { setAuth, useAuth } from "../../stores/user.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await authService.register(data);
      console.log(res);
      if (res.status == 201) {
        const { user, accessToken } = res.data;
        dispatch(setAuth({ user, accessToken }));
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      let message = "Xatolik yuz berdi";
      if (error.response) {
        // Server javobi bor (400, 401, 500, etc.)
        message =
          error.response.data?.message || `Xato: ${error.response.status}`;
      } else if (error.request) {
        // Server javobi yo'q (network error)
        message = "Serverga ulanish mumkin emas";
      } else {
        message = error.message;
      }
      alert(message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <main className={styles.register_content}>
        <img className={styles.register_img} src="register.jpg" alt="" />
        <div className={styles.form_content}>
          <h2>Create an account</h2>
          <p>Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true, minLength: 2 })}
            />
            {errors.name && (
              <span className={styles.error}>Name is required</span>
            )}
            <input
              type="text"
              placeholder="Lastname"
              {...register("lastname", { required: true, minLength: 2 })}
            />
            {errors.name && (
              <span className={styles.error}>Lastname is required</span>
            )}
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className={styles.error}>Email is required</span>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className={styles.error}>Passoword is required</span>
            )}
            <button type="submit" className={styles.btn_primary}>
              Create Account
            </button>

            <button type="button" className={styles.btn_google}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
              />
              Sign up with Google
            </button>
          </form>

          <div className={styles.login_text}>
            Already have account? <Link to="/login">Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
