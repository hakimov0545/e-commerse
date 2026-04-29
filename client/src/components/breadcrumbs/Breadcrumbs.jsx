import { Link, useLocation } from "react-router-dom";
import style from "./Breadcrumbs.module.css";

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  // ❌ если Home — ничего не показываем
  if (pathnames.length === 0) return null;

  return (
    <div className={style.breadcrumbs}>
      <Link to="/">Home</Link>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo}>
            {" / "}
            {isLast ? (
              <span className={style.active}>{formatName(name)}</span>
            ) : (
              <Link to={routeTo}>{formatName(name)}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

const formatName = (name) => {
  return name.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export default Breadcrumbs;
