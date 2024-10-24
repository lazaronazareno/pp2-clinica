import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
const Home = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    const endpoints = [
      "users",
      "appointments",
      "supplies",
      "department",
      "medical-record",
    ];

    const checkServerStatus = async () => {
      try {
        const results = await Promise.all(
          endpoints.map((endpoint) =>
            axios
              .get(`http://127.0.0.1:8000/${endpoint}`)
              .then((response) => ({ endpoint, status: response.status }))
              .catch(() => ({ endpoint, status: "error" }))
          )
        );

        const successfulEndpoints = results
          .filter((result) => result.status === 200)
          .map((result) => result.endpoint);
        const failedEndpoints = results
          .filter((result) => result.status !== 200)
          .map((result) => result.endpoint);

        if (failedEndpoints.length === 0) {
          setDialogMessage(
            `All endpoints are up and running! ${successfulEndpoints.join(
              ", "
            )}`
          );
        } else {
          setDialogMessage(
            `The following endpoints are not responding as expected: ${failedEndpoints.join(
              ", "
            )}`
          );
        }
      } catch (error) {
        setDialogMessage("Failed to reach the server.");
      } finally {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 3000);
      }
    };

    checkServerStatus();
  }, []);

  return (
    <main id="homeMain">
      {showDialog && <dialog open>{dialogMessage}</dialog>}
   
      <h1>Clinica SePrise</h1>


      <section>
      {cookies.user && (
        <h2>
          Bienvenido {cookies.user} {cookies.user}
        </h2>
      )}
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
