import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import "./Dashboard.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Dashboard = () => {
  const section = window.location.pathname.replace("/", "").toUpperCase();
  const { isPending, error, data } = useQuery({
    queryKey: ["getDashboardData", section],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/${DASHBOARD_ENDPOINTS[section]}`
      );
      return res.data;
    },
  });

  if (isPending) return `Loading ${DASHBOARD_ENDPOINTS[section]} data...`;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main id="dashboardMain">
      Dashboard de {section}
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={key + index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {Object.values(row).map((value, index) => (
                  <td key={value + index}>{value}</td>
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
