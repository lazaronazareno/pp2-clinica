import axios from "axios";
import "./Dashboard.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [dashboardColumns, setDashboardColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/users");
        setDashboardData(data);

        const columns = Object.keys(data[0] || {});

        setDashboardColumns(columns);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main id="dashboardMain">
      <table>
        <thead>
          <tr>
            {dashboardColumns.map((columna, index) => (
              <th key={index}>{columna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dashboardData.map((row, index) => (
            <tr key={index}>
              {dashboardColumns.map((columna, index) => (
                <td key={index}>{row[columna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Dashboard;
