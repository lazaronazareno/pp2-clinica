import { useState } from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";
const LoginForm = () => {
    return (
        <main>
            <h2>Logueate capo</h2>

            <form id="LoginForm">
                <label htmlFor="dni">DNI</label>
                <input id="dni" name="dni" type="text" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />

                <section>
                    <button type="submit" id="accessButton">
                        Ingresar
                    </button>
                    <button type="reset" id="cancelButton">
                        Cancelar
                    </button>
                </section>
                <Link to="/register">¿No te registraste aun, GATO? Ingresa aqui.</Link>
            </form>
        </main>
    );
};

export default LoginForm;
