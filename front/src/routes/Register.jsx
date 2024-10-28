import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isDeploy = import.meta.env.VITE_IS_DEPLOY;
  const apiUrl = isDeploy ? "https://pp2-clinica.onrender.com" : "localhost";
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await fetch(`${apiUrl}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cors: "no-cors",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main>
      <h1>Registro</h1>
      <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          {...register("name", { required: "name es requerido" })}
        />
        {errors.name && (
          <span className="errorMessage">{errors.name.message}</span>
        )}

        <label htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          {...register("lastname", { required: "lastname es requerido" })}
        />
        {errors.lastname && (
          <span className="errorMessage">{errors.lastname.message}</span>
        )}

        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          {...register("phone", {
            required: "Teléfono es requerido",
            pattern: {
              value: /^(?:\+54|54)?(?:11|[2368]\d)\d{8}$/,
              message: "Formato de teléfono inválido",
            },
          })}
          placeholder="Ej: 1123456789"
        />

        {errors.phone && (
          <span className="errorMessage">{errors.phone.message}</span>
        )}

        <label htmlFor="mail">Email</label>
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

        <label htmlFor="dni">DNI</label>
        <input
          id="dni"
          {...register("dni", {
            required: "DNI es requerido",
            pattern: {
              value: /^\d+$/,
              message: "DNI debe ser un número",
            },
          })}
        />
        {errors.dni && (
          <span className="errorMessage">{errors.dni.message}</span>
        )}

        <label htmlFor="date_birth">Fecha de Nacimiento</label>
        <input
          type="date"
          id="date_birth"
          {...register("date_birth", {
            required: "Fecha de nacimiento es requerida",
            validate: {
              minYear: (value) => {
                const year = new Date(value).getFullYear();
                return year >= 1900 || "El año debe ser mayor a 1900";
              },
            },
          })}
        />
        {errors.date_birth && (
          <span className="errorMessage">{errors.date_birth.message}</span>
        )}

        <section>
          <button type="submit" id="registerButton">
            Registrarse
          </button>
          <button type="reset" id="cancelButton">
            Cancelar
          </button>
        </section>
        <Link to="/login">Si ya está registrado, ingrese acá.</Link>
      </form>
    </main>
  );
};

export default RegisterForm;
