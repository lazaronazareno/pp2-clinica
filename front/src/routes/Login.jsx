import "./LoginRegister.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      body: JSON.stringify(data),
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
      <h2>Ingrese aqui</h2>

      <form id="LoginForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="mail">Mail</label>
        <input
          id="mail"
          {...register("mail", {
            required: "Mail es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Formato de Mail inválido",
            },
          })}
        />
        {errors.mail && (
          <span className="errorMessage">{errors.mail.message}</span>
        )}

        <label htmlFor="contraseña">Password</label>
        <input
          id="contraseña"
          type="password"
          {...register("contraseña", {
            required: "Contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.contraseña && (
          <span className="errorMessage">{errors.contraseña.message}</span>
        )}

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
