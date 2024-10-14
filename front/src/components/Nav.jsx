import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    const bla = new Audio("./bla.mp3");

    bla.play();
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
