import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/logout">logout 👻</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
