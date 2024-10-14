import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Aside from "./components/Aside";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Aside />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/turnos",
        element: <Dashboard />,
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
