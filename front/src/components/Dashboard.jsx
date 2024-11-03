import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useCookies } from "react-cookie";
import DASHBOARD_HEADERS from "../constants/headers";
import { useTheme } from "@table-library/react-table-library/theme";
import "./Dashboard.css";
import TRANSLATIONS from "../constants/translations";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const section = window.location.pathname.replace("/", "").toUpperCase();
  const [cookies, setCookie] = useCookies(["user"]);
  const isDeploy = import.meta.env.VITE_IS_DEPLOY;
  const apiUrl = isDeploy
    ? import.meta.env.VITE_DEPLOY_URL
    : "http://localhost";

  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState(
    DASHBOARD_HEADERS[section].reduce((acc, key) => {
      acc[key] = key === "date_birth" ? "" : key === "boolean" ? false : "";
      return acc;
    }, {})
  );
  const userId = cookies.user?.id || cookies.id; // Obtener el ID del usuario de la cookie
  const {
    isPending,
    error,
    data: queryData,
  } = useQuery({
    queryKey: ["getDashboardData", section],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/${DASHBOARD_ENDPOINTS[section]}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDashboardData", section]);
      setEditRow(null);
      reset();
    },
  });
  const fetchPatients = async () => {
    const url = `${apiUrl}/patients`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isPending: isPatientsPending,
    error: patientsError,
    data: patientsData,
  } = useQuery({
    queryKey: ["getPatients"],
    queryFn: fetchPatients,
  });

  const fetchDoctors = async () => {
    const url = `${apiUrl}/doctors`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isPending: isDoctorsPending,
    error: doctorsError,
    data: doctorsData,
  } = useQuery({
    queryKey: ["getDoctors"],
    queryFn: fetchDoctors,
  });

  const fetchMedicalRecords = async () => {
    const url = `${apiUrl}/medical-records`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isPending: isMedicalRecordsPending,
    error: medicalRecordsError,
    data: medicalRecordsData,
  } = useQuery({
    queryKey: ["getMedicalRecords"],
    queryFn: fetchMedicalRecords,
  });

  const fetchDepartments = async () => {
    const url = `${apiUrl}/departments`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isPending: isDepartmentsPending,
    error: departmentsError,
    data: departmentsData,
  } = useQuery({
    queryKey: ["getDepartments"],
    queryFn: fetchDepartments,
  });

  const fetchSupplies = async () => {
    const url = `${apiUrl}/supplies`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isPending: isSuppliesPending,
    error: suppliesError,
    data: suppliesData,
  } = useQuery({
    queryKey: ["getSupplies"],
    queryFn: fetchSupplies,
  });

  const fetchAppointments = async () => {
    const url = `${apiUrl}/appointments`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isPending: isAppointmentsPending,
    error: appointmentsError,
    data: appointmentsData,
  } = useQuery({
    queryKey: ["getAppointments"],
    queryFn: fetchAppointments,
  });

  useEffect(() => {
    if (queryData && section === "ADMIN") setData(queryData);
    if (patientsData && section === "TURNOS") setData(patientsData);
    if (medicalRecordsData && section === "ESTUDIOS")
      setData(medicalRecordsData);
    if (departmentsData && section === "ESPECIALIDADES")
      setData(departmentsData);
    if (suppliesData && section === "INSUMOS") setData(suppliesData);
    if (appointmentsData && section === "TURNOS") setData(appointmentsData);

    if (userId) {
      const fetchToken = async () => {
        try {
          const response = await axios.get(`${apiUrl}/users/${userId}`, {
            mode: "cors",
          });
          const tokenData = response.data;
          queryClient.invalidateQueries(["getDashboardData", section]);
          Object.keys(tokenData).forEach((key) => {
            setCookie(key, tokenData[key], { path: "/" });
          });
        } catch (error) {
          toast.error("Error al obtener los datos del usuario");
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 404) {
            Object.keys(cookies).forEach((key) => {
              setCookie(key, "", { path: "/" });
            });
          }
        }
      };

      fetchToken();
    } else {
      toast.error("No se encontró el ID del usuario en las cookies.");
      console.warn("No user ID found in cookies.");
    }
  }, [
    queryData,
    patientsData,
    doctorsData,
    medicalRecordsData,
    departmentsData,
    suppliesData,
    appointmentsData,
  ]);

  const handleUpdate = (value, id, property) => {
    setData((state) =>
      state.map((item) =>
        item.id === id ? { ...item, [property]: value } : item
      )
    );
  };

  const handleSave = async (data) => {
    const url = `${apiUrl}/${DASHBOARD_ENDPOINTS[section]}/${data.id}`;

    try {
      toast.info("Guardando cambios...");
      return await axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${cookies.user}`,
          },
        })
        .then(() => toast.success("Registro actualizado correctamente"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (newData) => {
    const url = `${apiUrl}/${DASHBOARD_ENDPOINTS[section]}`;
    try {
      toast.info("Creando nuevo registro...");
      const response = await axios
        .post(url, newData, {
          headers: {
            Authorization: `Bearer ${cookies.user}`,
          },
        })
        .then(() => toast.success("Registro creado correctamente"));
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewRowChange = (value, key) => {
    setNewRow((prevRow) => ({ ...prevRow, [key]: value }));
  };

  const handleNewRowSave = async () => {
    await handleCreate(newRow);
    setNewRow(
      DASHBOARD_HEADERS[section].reduce((acc, key) => {
        acc[key] = key === "date_birth" ? "" : key === "boolean" ? false : "";
        return acc;
      }, {})
    );
  };

  const handleDelete = async (id) => {
    const url = `${apiUrl}/${DASHBOARD_ENDPOINTS[section]}/${id}`;
    try {
      toast.info("Eliminando registro...");
      await axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${cookies.user}`,
          },
        })
        .then(() => toast.success("Registro eliminado correctamente"));
      setData((prevData) => prevData.filter((row) => row.id !== id));
      queryClient.invalidateQueries(["getDashboardData", section]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCellContent = (item, key, isNewRow = false) => {
    const handleChange = isNewRow
      ? (e) =>
          handleNewRowChange(
            e.target.type === "checkbox" ? e.target.checked : e.target.value,
            key
          )
      : (e) =>
          handleUpdate(
            e.target.type === "checkbox" ? e.target.checked : e.target.value,
            item.id,
            key
          );

    const handleBlur = isNewRow
      ? undefined
      : async (e) => {
          const updatedData = data.find((row) => row.id === item.id);
          await handleSave(updatedData);
          queryClient.invalidateQueries(["getDashboardData", section]);
          console.warn(`${key} actualizado a ${updatedData[key]}`);
        };

    const value = isNewRow ? newRow[key] : item[key];

    const inputType =
      typeof value === "boolean"
        ? "checkbox"
        : ["is_admin", "is_doctor", "active"].includes(key)
        ? "checkbox"
        : ["date_birth", "date"].includes(key)
        ? "date"
        : ["dni", "stock"].includes(key)
        ? "number"
        : key === "mail"
        ? "mail"
        : ["user_id", "department_id", "medical_record_id"].includes(key)
        ? "select"
        : "text";

    if (inputType === "select") {
      return (
        <select
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: "100%" }}
          value={value}
        >
          {
            //si la columna actual es la de department_id y ya se cargaron los departamentos}
            key === "department_id" &&
              departmentsData &&
              //se mapean los departamentos para mostrarlos en el select

              departmentsData.map((department) => (
                <option key={department.id} value={department.id}>
                  {department?.name}
                </option>
              ))
          }
          {
            //si la columna actual es la de user_id y ya se cargaron los pacientes}
            key === "user_id" &&
              patientsData &&
              //se mapean los pacientes para mostrarlos en el select
              patientsData.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient?.name}
                </option>
              ))
          }
          {
            //si la columna actual es la de medical_record_id y ya se cargaron los registros médicos}
            key === "medical_record_id" &&
              medicalRecordsData &&
              //se mapean los registros médicos para mostrarlos en el select
              medicalRecordsData.map((medicalRecord) => (
                <option key={medicalRecord.id} value={medicalRecord.id}>
                  {
                    departmentsData.find(
                      (department) =>
                        department.id === medicalRecord.department_id
                    )?.name
                  }
                </option>
              ))
          }
        </select>
      );
    }

    return (
      <input
        type={inputType}
        value={inputType === "checkbox" ? undefined : value}
        checked={inputType === "checkbox" ? value : false}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: "100%" }}
      />
    );
  };

  const theme = useTheme({
    HeaderRow: `background-color: #eaf5fd;`,
    Row: `
      &:nth-of-type(odd) { background-color: #d2e9fb; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
    `,
    Table: `--data-table-library_grid-template-columns:${DASHBOARD_HEADERS[
      section
    ]
      .map(() => "1fr")
      .join(" ")} 1fr;`,

    Cell: "border: 1px solid #d2e9fb; display: flex; align-items: center; background-color: #b7b7b7; font-family: 'MuseoModerno', sans-serif;",
    HeaderCell: "solid #d2e9fb; font-size: 1rem;",
  });

  if (!cookies.user) {
    return <div>Debes iniciar sesión para acceder a esta página</div>;
  }
  if (isPending) return <div>Loading...</div>;
  if (isPatientsPending) return <div>Loading patients...</div>;
  if (isDoctorsPending) return <div>Loading doctors...</div>;
  if (isMedicalRecordsPending) return <div>Loading medical records...</div>;
  if (isDepartmentsPending) return <div>Loading departments...</div>;

  if (error) {
    console.error(error);
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <main>
      <Table data={{ nodes: data }} layout={{ custom: true }} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Acciones</HeaderCell>
                {DASHBOARD_HEADERS[section].map((header) => (
                  <HeaderCell key={header}>
                    {TRANSLATIONS[header.toUpperCase()] || header}
                  </HeaderCell>
                ))}
              </HeaderRow>
            </Header>
            <Body>
              {
                <Row id="saveRow" item={newRow}>
                  <Cell>
                    <button id="addButton" onClick={handleNewRowSave}>
                      Guardar
                    </button>
                  </Cell>
                  {DASHBOARD_HEADERS[section].map((key) => (
                    <Cell key={key}>
                      {renderCellContent(newRow, key, true)}
                    </Cell>
                  ))}
                </Row>
              }
              {tableList.length > 0 &&
                tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>
                      <button onClick={() => handleDelete(item.id)}>
                        Borrar
                      </button>
                    </Cell>
                    {DASHBOARD_HEADERS[section].map((key) => (
                      <Cell key={key}>{renderCellContent(item, key)}</Cell>
                    ))}
                  </Row>
                ))}
            </Body>
          </>
        )}
      </Table>
      <ToastContainer />
    </main>
  );
};

export default Dashboard;
