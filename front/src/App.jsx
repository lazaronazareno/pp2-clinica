import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Aside from "./components/Aside";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Dashboard from "./components/Dashboard";
import Dashboard2 from "./components/Dashboard2";
import BackgroundMusic from "./components/BackgroundMusic";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Aside />
        <Outlet />
        <BackgroundMusic />
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
        element: <Dashboard2 />,
      },
      {
        path: "/estudios",
        element: <Dashboard />,
      },
      {
        path: "/insumos",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Dashboard2 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
