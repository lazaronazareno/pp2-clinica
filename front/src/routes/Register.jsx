import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main>
      <h1>Registro</h1>
      <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          {...register("nombre", { required: "Nombre es requerido" })}
        />
        {errors.nombre && (
          <span className="errorMessage">{errors.nombre.message}</span>
        )}

        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          {...register("apellido", { required: "Apellido es requerido" })}
        />
        {errors.apellido && (
          <span className="errorMessage">{errors.apellido.message}</span>
        )}

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

        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
        <input
          type="date"
          id="fecha_nacimiento"
          {...register("fecha_nacimiento", {
            required: "Fecha de nacimiento es requerida",
            validate: {
              minYear: (value) => {
                const year = new Date(value).getFullYear();
                return year >= 1900 || "El año debe ser mayor a 1900";
              },
            },
          })}
        />
        {errors.fecha_nacimiento && (
          <span className="errorMessage">
            {errors.fecha_nacimiento.message}
          </span>
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
