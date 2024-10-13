import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main id="homeMain">
            <h1>Clinica SirFreezer</h1>
            <section>
                <Link to="/register">
                    <button id="register">Registrarse 🐉</button>
                </Link>
                <Link to="/login">
                    <button id="login">Ingresar 🥶</button>
                </Link>
            </section>

            <h2>Donde los pacientes vienen a morir</h2>
        </main>
    );
};

export default Home;
