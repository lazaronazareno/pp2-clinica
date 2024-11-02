import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie"; // Importar useCookies
import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import DASHBOARD_HEADERS from "../constants/headers";
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
    mutationFn: async (row) => {
      if (editRow === null) {
        return axios.post(`${apiUrl}/${DASHBOARD_ENDPOINTS[section]}`, row);
      } else {
        return axios.put(
          `${apiUrl}/${DASHBOARD_ENDPOINTS[section]}/${row.id}`,
          row
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDashboardData", section]);
      setEditRow(null);
      reset();
      // navigate(0);
    },
  });

  const handleEditClick = (row) => {
    //si el row.is_admin o row.is_doctor es un array vacio, entonces se le asigna false
    console.dir(row);
    setEditRow(row.id);
    Object.keys(row).forEach((key) => setValue(key, row[key]));
  };

  const handleDeleteClick = async (row) => {
    const response = await axios.delete(
      `${apiUrl}/${DASHBOARD_ENDPOINTS[section]}/${row.id}`
    ); // Asegúrate de tener el endpoint correcto
    navigate(0);
  };

  const onSubmit = (row) => {
    mutation.mutate(row);
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
          console.dir(tokenData)
          setCookie("user", tokenData, { path: "/" }); // Guardar en la cookie
          invalidateQueries(["getDashboardData", section]); // Invalidar la consulta
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

  const headers =
    data && data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "id")
      : DASHBOARD_HEADERS[section].filter((key) => key !== "id");

  const getInputType = (key) => {
    switch (key) {
      case "dni":
      case "stock":
      case "price":
      case "phone":
      case "patient_id":
      case "doctor_id":
      case "department_id":
      case "medical_record_id":
      case "user_id":
      case "status":
        return "number";
      case "date_birth":
      case "time":
      case "date":
        return "date";
      case "is_admin":
      case "is_doctor":
      case "active":
        return "checkbox";
      case "mail":
        return "email";
      default:
        return "text";
    }
  };

  return (
    <main id="dashboardMain">
      <h1>Dashboard de {section}</h1>
      <table>
        <thead>
          <tr>
            <th>Actions</th>
            {headers.map((key, index) => (
              <th key={key + index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row) => (
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
                  ? Object.keys(row)
                      .filter((key) => key !== "id")
                      .map((key, index) => (
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
                              type={getInputType(key)}
                            />
                          )}
                        </td>
                      ))
                  : Object.keys(row)
                      .filter((key) => key !== "id")
                      ?.map((key, index) => (
                        <td key={key + index}>
                          {key === "is_admin" || key === "is_doctor"
                            ? row[key]
                              ? "✅"
                              : "❌"
                            : row[key]}
                        </td>
                      ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1}>No data available</td>
            </tr>
          )}
          <tr>
            <td>
              <button onClick={handleSubmit(onSubmit)}>Add</button>
            </td>
            {headers.map((key, index) => (
              <td key={key + index}>
                <input {...register(key)} type={getInputType(key)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default Dashboard;
