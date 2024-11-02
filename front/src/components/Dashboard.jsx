import * as React from "react";
import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import { useQuery } from "@tanstack/react-query";
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

const Dashboard = () => {
  const section = window.location.pathname.replace("/", "").toUpperCase();
  const [cookies] = useCookies(["user"]);
  const isDeploy = import.meta.env.VITE_IS_DEPLOY;
  const apiUrl = isDeploy
    ? "https://pp2-clinica.onrender.com"
    : "http://localhost";

  const [data, setData] = React.useState([]);
  const [newRow, setNewRow] = React.useState(
    DASHBOARD_HEADERS[section].reduce((acc, key) => {
      acc[key] = key === "date_birth" ? "" : key === "boolean" ? false : "";
      return acc;
    }, {})
  );

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
  });

  React.useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

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
      return await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (newData) => {
    const url = `${apiUrl}/${DASHBOARD_ENDPOINTS[section]}`;
    try {
      const response = await axios.post(url, newData, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
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
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      setData((prevData) => prevData.filter((row) => row.id !== id));
      alert(`Se elimino el registro con id: ${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme({
    HeaderRow: `
      background-color: #eaf5fd;
      
    `,
    Row: `
      &:nth-of-type(odd) {
        background-color: #d2e9fb;
      }

      &:nth-of-type(even) {
        background-color: #eaf5fd;
      }
    `,
    Table: `
    --data-table-library_grid-template-columns:${DASHBOARD_HEADERS[section]
      .map(() => "1fr")
      .join(" ")} 1fr;
    --data-table-library_grid-template-rows: 1fr;
  `,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

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
                <HeaderCell>Actions</HeaderCell>
                {DASHBOARD_HEADERS[section].map((header) => (
                  <HeaderCell key={header}>{header}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>
            <Body>
              <Row id="saveRow" item={newRow}>
                <Cell>
                  <button id="addButton" onClick={handleNewRowSave}>
                    Save
                  </button>
                </Cell>
                {DASHBOARD_HEADERS[section].map((key) => (
                  <Cell key={key}>
                    {typeof newRow[key] === "boolean" ||
                    key === "is_admin" ||
                    key === "is_doctor" ||
                    key === "active" ? (
                      <input
                        type="checkbox"
                        checked={newRow[key]}
                        onChange={(event) =>
                          handleNewRowChange(event.target.checked, key)
                        }
                      />
                    ) : key === "date_birth" || key === "date" ? (
                      <input
                        type="date"
                        value={newRow[key]}
                        onChange={(event) =>
                          handleNewRowChange(event.target.value, key)
                        }
                      />
                    ) : [
                        "dni",
                        "user_id",
                        "department_id",
                        "stock",
                        "medical_record_id",
                      ].includes(key) ? (
                      <input
                        type="number"
                        value={newRow[key]}
                        onChange={(event) =>
                          handleNewRowChange(event.target.value, key)
                        }
                      />
                    ) : key === "mail" ? (
                      <input
                        type="email"
                        value={newRow[key]}
                        onChange={(event) =>
                          handleNewRowChange(event.target.value, key)
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        value={newRow[key]}
                        onChange={(event) =>
                          handleNewRowChange(event.target.value, key)
                        }
                      />
                    )}
                  </Cell>
                ))}
              </Row>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </Cell>
                  {DASHBOARD_HEADERS[section].map((key) => (
                    <Cell key={key}>
                      {typeof item[key] === "boolean" ? (
                        <input
                          type="checkbox"
                          checked={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.checked, item.id, key)
                          }
                          onClick={async (event) => {
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            tableData[key] = event.target.checked;
                            await handleSave(tableData);
                            alert(
                              `${key}, se actualizo a ${event.target.checked}`
                            );
                          }}
                        />
                      ) : key === "date_birth" ? (
                        <input
                          type="date"
                          value={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, key)
                          }
                          onBlur={async (event) => {
                            event.target.style.width = "100%";
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            await handleSave(tableData);
                            alert(
                              `${key}, se actualizo a ${event.target.value}`
                            );
                          }}
                        />
                      ) : [
                          "dni",
                          "user_id",
                          "department_id",
                          "stock",
                          "medical_record_id",
                        ].includes(key) ? (
                        <input
                          type="number"
                          value={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, key)
                          }
                          onBlur={async (event) => {
                            event.target.style.width = "100%";
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            await handleSave(tableData);
                            alert(
                              `${key}, se actualizo a ${event.target.value}`
                            );
                          }}
                        />
                      ) : key === "mail" ? (
                        <input
                          type="email"
                          value={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, key)
                          }
                          onBlur={async (event) => {
                            event.target.style.width = "100%";
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            await handleSave(tableData);
                            alert(
                              `${key}, se actualizo a ${event.target.value}`
                            );
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          value={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, key)
                          }
                          onBlur={async (event) => {
                            event.target.style.width = "100%";
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            await handleSave(tableData);
                            alert(
                              `${key}, se actualizo a ${event.target.value}`
                            );
                          }}
                        />
                      )}
                    </Cell>
                  ))}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </main>
  );
};

export default Dashboard;
