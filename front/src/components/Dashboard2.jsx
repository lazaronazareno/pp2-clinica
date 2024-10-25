import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import "./Dashboard.css";

const Dashboard2 = () => {
  const section = window.location.pathname.replace("/", "").toUpperCase();
  const queryClient = useQueryClient(); // Para actualizar los datos localmente tras editar
  const [editRow, setEditRow] = useState(null); // Guardar la fila que se está editando

  const { register, handleSubmit, setValue, reset } = useForm();
  const { isPending, error, data } = useQuery({
    queryKey: ["getDashboardData", section],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/users`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedRow) => {
      return axios.put(
        `http://localhost:8000/users/${updatedRow.id}`,
        updatedRow
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDashboardData", section]); // Refrescar datos
      setEditRow(null); // Salir del modo edición
      reset(); // Limpiar formulario
    },
  });

  const handleEditClick = (row) => {
    setEditRow(row.id); // Establece la fila en modo edición
    // Carga los valores de la fila en el formulario
    Object.keys(row).forEach((key) => setValue(key, row[key]));
  };

  const onSubmit = (updatedRow) => {
    mutation.mutate(updatedRow); // Envía la fila editada al backend
  };

  if (isPending) return `Loading ${DASHBOARD_ENDPOINTS[section]} data...`;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main id="dashboardMain">
      <h1>Dashboard de {section}</h1>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={key + index}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {editRow === row.id ? (
                  // Modo edición: mostrar inputs
                  Object.keys(row).map((key, index) => (
                    <td key={key + index}>
                      <input
                        {...register(key)}
                        defaultValue={row[key]}
                      />
                    </td>
                  ))
                ) : (
                  // Modo visualización: mostrar valores
                  Object.values(row).map((value, index) => (
                    <td key={value + index}>{value}</td>
                  ))
                )}
                <td>
                  {editRow === row.id ? (
                    <button onClick={handleSubmit(onSubmit)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(row)}>Edit</button>
                  )}
                </td>
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

export default Dashboard2;
