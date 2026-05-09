import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>404 Not Found</h1>
      <p className={style.text}>
        Your visited page not found. You may go home page.
      </p>
      <Link className={style.btn_error} to="/">
        Back to home page
      </Link>
    </div>
  );
}

export default NotFound;
