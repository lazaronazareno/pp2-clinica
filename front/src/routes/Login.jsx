import "./LoginRegister.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
const LoginForm = () => {
  
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isDeploy = import.meta.env.VITE_IS_DEPLOY;
  const apiUrl = isDeploy ? "https://pp2-clinica.onrender.com" : "localhost";
  const onSubmit = async (data) => {
    await fetch(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cors: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Object.keys(data).forEach((key) => {
          if (key != "detail") setCookie(key, data[key]);
        });
        navigate("/");
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

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "password es requerida",
            minLength: {
              value: 6,
              message: "La password debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <span className="errorMessage">{errors.password.message}</span>
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
