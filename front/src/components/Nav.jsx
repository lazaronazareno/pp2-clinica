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
        {cookies.user && (
          <>
            <li>
              <p>Bienvenido {cookies.user.name}</p>{" "}
            </li>
            <li>
              <button onClick={handleLogout}>logout 👻</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
