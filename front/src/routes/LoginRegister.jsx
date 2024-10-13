import "./LoginRegister.css";
import { useState } from "react";

function LoginRegister() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Format fecha_nacimiento to yyyy-mm-dd
    if (data.fecha_nacimiento) {
      const date = new Date(data.fecha_nacimiento);
      const formattedDate = date.toISOString().split('T')[0];
      data.fecha_nacimiento = formattedDate;
    }

    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "An error occurred" });
    }
  };

  return (
    <main>
      <h2>Inicio de sesion</h2>

      <form id="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" />
        <label htmlFor="apellido">Apellido</label>
        <input id="apellido" name="apellido" type="text" />
        <label htmlFor="dni">DNI</label>
        <input id="dni" name="dni" type="text" />
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
        <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" />
        <label htmlFor="telefono">Telefono</label>
        <input id="telefono" name="telefono" type="text" />

        <button type="submit" id="registerButton">
          Registrarse
        </button>
        <button type="reset" id="cancelButton">
          Cancelar
        </button>
      </form>

      {response && (
        <div className="response">
          <h3>Response from backend:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}

export default LoginRegister;
