import "./Dashboard.css";

const Dashboard = () => {
    return (
        <main id="dashboardMain">
            <table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Nacionalidad</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Puesto</th>
                        <th scope="col">Alta/Baja</th>
                        <th scope="col">Empleado</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Especialidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Luzaro</td>
                        <td>Vuga</td>
                        <td>12345678</td>
                        <td>Argentina</td>
                        <td>luzaro@example.com</td>
                        <td>password123</td>
                        <td>Developer</td>
                        <td>Alta</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>Frontend</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};

export default Dashboard;
