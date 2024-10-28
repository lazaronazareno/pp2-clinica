import "./Nav.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    Object.keys(cookies).forEach((key) => {
      setCookie(key, "", { path: "/" });
    });
    navigate("/");
  };

  return (
    <nav>
      <ul>
        {/* Verifica si cookies.user y cookies.user.id existen antes de mostrarlos */}
        {cookies.user ? (
          <>
            <li>
              <p id="welcome_user">Bienvenido {cookies.user.name}</p>
            </li>
            <li>
              <button id="logout_button" onClick={handleLogout}>Salir 👋</button>
            </li>
          </>
        ) : (
          <li>
            <p id="login_status">Clinica SePrise  <img id="cat_doc" src="./cat-doc.png" /></p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;