import { Cookies, useCookies } from "react-cookie";
import "./Aside.css";
import { Link } from "react-router-dom";

const Aside = () => {
  const [cookies] = useCookies(["user"]);
  return (
    <aside>
      <Link to="/">
        <p>Inicio 🏥</p>
      </Link>

      {cookies.user && (
        <>
          <Link to="/turnos">
            <p>Turnos 🗓️</p>
          </Link>
          <Link to="/estudios">
            <p>Estudios 🪦</p>
          </Link>
        </>
      )}

      {cookies.user && cookies.is_empleado === true && (
        <Link to="/insumos">
          <p>Insumos 💊</p>
        </Link>
      )}
      {cookies.user && cookies.is_admin === true && (
        <Link to="/admin">
          <p>Admin 🔐</p>
        </Link>
      )}
    </aside>
  );
};

export default Aside;
