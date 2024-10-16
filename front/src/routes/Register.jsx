import "./LoginRegister.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    /*
   {
  "dni": 0,
  "nombre": "string",
  "apellido": "string",
  "mail": "string",
  "telefono": "string",
  "fecha_nacimiento": "2024-10-16",
  "is_admin": false,
  "is_empleado": false
    }
   */
    console.log(event);
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(formEntries)) {
      console.log(`${key}: ${value}`);
    }
    console.log(formEntries);

    await fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      body: JSON.stringify(formEntries),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main>
      <h2>Registrese</h2>

      <form
        action="http://127.0.0.1:8000/users"
        method="post"
        id="registerForm"
        onSubmit={handleSubmit}
      >
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Ingrese su nombre..."
        />
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          placeholder="Ingrese su apellido..."
        />
        <label htmlFor="contraseña">Contraseña</label>
        <input
          id="contraseña"
          name="contraseña"
          type="password"
          placeholder="Ingrese su contraseña..."
        />
        <label htmlFor="dni">DNI</label>
        <input
          id="dni"
          name="dni"
          type="text"
          placeholder="Ingrese su DNI sin puntos"
        />
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
        <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" />
        <label htmlFor="mail">Email</label>
        <input
          id="mail"
          name="mail"
          type="text"
          placeholder="Ingrese su mail..."
        />
        <label htmlFor="telefono">Telefono</label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          placeholder="Ingrese su telefono..."
        />

        <section>
          <button type="submit" id="registerButton">
            Registrarse
          </button>
          <button type="reset" id="cancelButton">
            Cancelar
          </button>
        </section>
        <Link to="/login">Si ya esta registado, ingresa aca.</Link>
      </form>
    </main>
  );
};

export default RegisterForm;
