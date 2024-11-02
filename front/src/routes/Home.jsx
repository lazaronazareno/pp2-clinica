import "./Home.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Home = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <main id="homeMain">
      <h1 id="greeting2">Bienvenidos</h1>

      <h2 id="greeting2">Clinica <span style={{ marginLeft: '60px' }}></span> SePrise</h2>


      <section>
        {!cookies.user && (
          <>
            <Link to="/register">
              <button id="register">Registrarse </button>
            </Link>
            <Link to="/login">
              <button id="login">Ingresar </button>
            </Link>
          </>
        )}
      </section>


      <h3 id="text_in">
        Cuidamos de usted, porque su bienestar, es lo primero.
      </h3>
    </main>
  );
};

export default Home;
