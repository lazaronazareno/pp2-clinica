import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    const bla = new Audio("./bla.mp3");

  return (
    <nav>
      <ul>
        <li>
          <Link onClick={bla.play()}to="/logout">logout 👻</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
