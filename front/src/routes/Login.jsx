import "./LoginRegister.css";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(formEntries)) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <main>
      <h2>Ingrese aqui</h2>

      <form id="LoginForm" onSubmit={handleSubmit}>
        <label htmlFor="dni">DNI</label>
        <input
          id="dni"
          name="dni"
          type="text"
          placeholder="Ingrese su DNI sin puntos"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Ingrese aqui su password"
        />

        <section>
          <button type="submit" id="accessButton">
            Ingresar
          </button>
          <button type="reset" id="cancelButton">
            Cancelar
          </button>
        </section>
        <Link to="/register">¿Aun no te registraste? Ingresa aqui.</Link>
      </form>
    </main>
  );
};

export default LoginForm;
