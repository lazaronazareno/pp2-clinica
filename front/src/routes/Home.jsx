import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
return (
    <main id="homeMain">
        <iframe 
            src="https://lottie.host/embed/798fa7f8-8c0c-42af-b4fd-5090bbd8a81e/VTSHgxYgGx.json" 
            style={{ width: '100%', height: '500px', border: 'none' }}
        ></iframe>
        <h1>Clinica SePrise</h1>
        <section>
            <Link to="/register">
                <button id="register">Registrarse </button>
            </Link>
            <Link to="/login">
                <button id="login">Ingresar </button>
            </Link>
        </section>

        <h2>¡Bienvenidos a SePrise!</h2>
        <p id="greeting">
            En SePrise, nuestra prioridad es tu salud y bienestar. Somos una clínica
            integral especializada en brindar atención médica de alta calidad,
            respaldada por un equipo de profesionales altamente capacitados.
            Ofrecemos una amplia gama de servicios médicos que van desde consultas
            generales hasta estudios clínicos avanzados, asegurando que cada
            paciente reciba un tratamiento personalizado y humano. Nos distinguimos
            por nuestra innovación tecnológica, dedicación al paciente y enfoque
            preventivo, que nos permiten no solo tratar, sino también mejorar la
            calidad de vida de quienes confían en nosotros. Además, en SePrise
            garantizamos una experiencia cálida y cercana, donde cada visita es una
            oportunidad para cuidarte mejor. Ya sea que necesites una consulta
            rutinaria, un estudio especializado o atención médica de urgencia,
            nuestro equipo está aquí para apoyarte en cada paso. ¡Tu salud es
            nuestra misión!
        </p>
        <h3>
            Clínica SePrise Cuidamos de usted, porque tu bienestar es lo primero.
        </h3>
    </main>
);
};

export default Home;
