import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie"; // Importar useCookies
import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const section = window.location.pathname.replace("/", "").toUpperCase();
  const queryClient = useQueryClient();
  const [editRow, setEditRow] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [cookies, setCookie] = useCookies(["user"]); // Manejar cookies
  const userId = cookies.user?.id || cookies.id; // Obtener el ID del usuario de la cookie
  const isDeploy = import.meta.env.VITE_IS_DEPLOY;
  const apiUrl = isDeploy ? "https://pp2-clinica.onrender.com" : "localhost";
  const { isPending, error, data } = useQuery({
    queryKey: ["getDashboardData", section],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/${DASHBOARD_ENDPOINTS[section]}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedRow) => {
      return axios.put(`${apiUrl}/users/${updatedRow.id}`, updatedRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDashboardData", section]);
      setEditRow(null);
      reset();
      navigate(0);
    },
  });

  const handleEditClick = (row) => {
    setEditRow(row.id);
    Object.keys(row).forEach((key) => setValue(key, row[key]));
  };

  const handleDeleteClick = async (row) => {
    const response = await axios.delete(`${apiUrl}/users/${row.id}`); // Asegúrate de tener el endpoint correcto
    navigate(0);
  };

  const onSubmit = (updatedRow) => {
    mutation.mutate(updatedRow);
  };

  // Actualizar cookies en cada renderizado
  useEffect(() => {
    // Verificar si el ID del usuario está disponible
    if (userId) {
      const fetchToken = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/users/${userId}`,
            { mode: "cors" } // Configurar CORS
          ); // Usar el ID de la cookie
          const tokenData = response.data; // Ajusta esto según la respuesta de tu API
          setCookie("user", tokenData, { path: "/" }); // Guardar en la cookie
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 404) {
            // Limpiar todas las cookies si no se encuentra el usuario
            Object.keys(cookies).forEach((key) => {
              setCookie(key, "", { path: "/" });
            });
          }
        }
      };

      fetchToken();
    } else {
      console.warn("No user ID found in cookies.");
    }
  }, []);
  if (isPending) return `Loading ${DASHBOARD_ENDPOINTS[section]} data...`;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main id="dashboardMain">
      <h1>Dashboard de {section}</h1>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              {Object.keys(data[0]).map((key, index) => (
                <th key={key + index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  {editRow === row.id ? (
                    <button onClick={handleSubmit(onSubmit)}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(row)}>Edit</button>
                      <button onClick={() => handleDeleteClick(row)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
                {editRow === row.id
                  ? Object.keys(row).map((key, index) => (
                      <td key={key + index}>
                        {key === "is_admin" || key === "is_doctor" ? (
                          <input
                            type="checkbox"
                            {...register(key)}
                            defaultChecked={row[key]}
                          />
                        ) : (
                          <input
                            {...register(key)}
                            defaultValue={row[key]}
                            type={
                              key === "password"
                                ? "password"
                                : key === "date_birth"
                                ? "date"
                                : key === "dni"
                                ? "number"
                                : "text"
                            }
                          />
                        )}
                      </td>
                    ))
                  : Object.keys(row).map((key, index) => (
                      <td key={key + index}>
                        {key === "is_admin" || key === "is_doctor"
                          ? row[key]
                            ? "✅"
                            : "❌"
                          : row[key]}
                      </td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay data bro 😲</p>
      )}
    </main>
  );
};

export default Dashboard;
