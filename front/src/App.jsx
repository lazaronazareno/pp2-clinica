import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginRegister from "./routes/LoginRegister";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <nav>nav</nav>
        <aside>aside</aside>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <LoginRegister />,
      },
      {
        path: "/atencion",
        element: <main>Dashboard de turnos</main>,
      },
      {
        path: "/estudios",
        element: <main>Dashboard de estudios</main>,
      },
      {
        path: "/insumos",
        element: <main>Dashboard de insumos</main>,
      },
      {
        path: "/admin",
        element: <main>Dashboard de adm</main>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
