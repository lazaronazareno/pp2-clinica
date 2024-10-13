import "./Aside.css";
import { Link } from "react-router-dom";

const Aside = () => {
    return (
        <aside>
            <Link to="/">
                <p>Inicio 🤓</p>
            </Link>
            <Link to="/atencion">
                <p>Turnos 🔜</p>
            </Link>
            <Link to="/estudios">
                <p>Estudios ♿</p>
            </Link>
            <Link to="/insumos">
                <p>Insumos ♻️</p>
            </Link>
            <Link to="/admin">
                <p>Admin Central 🆘</p>
            </Link>
        </aside>
    );
};

export default Aside;
