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
      <Table data={{ nodes: data }} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                {DASHBOARD_HEADERS[section].map((header) => (
                  <HeaderCell key={header}>{header}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
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
                            const { data } = await handleSave(tableData);
                            alert(
                              `${key}, ${data[key]} se actualizo a ${event.target.value}`
                            );
                          }}
                        />
                      ) : key === "date_birth" ? (
                        <input
                          type="date"
                          style={{
                            width: "100%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, key)
                          }
                          onBlur={async (event) => {
                            event.target.style.width = "100%";
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            const { data } = await handleSave(tableData);
                            alert(
                              `${key}, ${data[key]} se actualizo a ${event.target.value}`
                            );
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item[key]}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, key)
                          }
                          onBlur={async (event) => {
                            event.target.style.width = "100%";
                            const tableData = tableList.find(
                              (row) => row.id === item.id
                            );
                            const { data } = await handleSave(tableData);
                            alert(
                              `${key}, ${data[key]} se actualizo a ${event.target.value}`
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
