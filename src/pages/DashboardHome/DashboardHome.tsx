import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@components/Card";
import "./DashboardHome.css";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
const DashboardHome = () => {
  const [usersCount, setUsersCount] = useState<number>(() => {
    const saved = sessionStorage.getItem("users");
    return saved ? JSON.parse(saved).number_users : 0;
  });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8300/ws/notifications");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.event === "count_users") {
        const { number_users } = message.data;

        // Actualizar estado
        setUsersCount(number_users);

        // Guardar en sessionStorage
        sessionStorage.setItem("users", JSON.stringify({ number_users }));

        console.log("Código:", number_users);
      }
    };

    return () => socket.close();
  }, []);

  // useEffect(() => {
  //   const getData = () => {

  //   }
  // }, [third])
  

 
  const data = [
    // 28 de abril
    { name: "2025-04-28 08:22", success: 0, failed: 1 },
    { name: "2025-04-28 09:10", success: 1, failed: 0 },
    { name: "2025-04-28 10:45", success: 0, failed: 1 },

    // 29 de abril (originales)
    { name: "2025-04-29 20:34", success: 0, failed: 1 },
    { name: "2025-04-29 21:44", success: 0, failed: 1 },
    { name: "2025-04-29 21:49", success: 1, failed: 0 },
    { name: "2025-04-29 21:51", success: 1, failed: 0 },

    // 30 de abril
    { name: "2025-04-30 07:15", success: 0, failed: 1 },
    { name: "2025-04-30 07:45", success: 1, failed: 0 },
    { name: "2025-04-30 08:00", success: 1, failed: 0 },
  ];
  return (
    <section className="dashboardHome">
      <article className="dashboardHome--header">
        <Card type="success">
          <div className="data-card">
            <h3 className="title-card">Usuarios Activos</h3>
            <span className="porcetage">100</span>
          </div>
        </Card>
        <Card type="warning">
          <div className="data-card">
            <h3 className="title-card">Carnes</h3>
            <span className="porcetage">400</span>
          </div>
        </Card>
        <Card type="info">
          <div className="data-card">
            <h3 className="title-card">Accesos Diarios</h3>
            <span className="porcetage">1400</span>
          </div>
        </Card>
      </article>
      <article className="dashboardHome--body">
        <div
          className=""
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 0 15px #ccc",
            padding: "10px",
          }}
        >
          <ResponsiveContainer>
            <LineChart
              //   width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="success" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          className=""
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 0 15px #ccc",
            padding: "10px",
            overflowY:"hidden"
          }}
        >
          <div className="alert-box">
            <AiOutlineWarning className="alert-icon" />
            <span className="alert-text">Alerta</span>
          </div>
          <div className="alert-box">
            <AiOutlineWarning className="alert-icon" />
            <span className="alert-text">Alerta</span>
          </div>
          <div className="alert-box">
            <AiOutlineWarning className="alert-icon" />
            <span className="alert-text">Alerta</span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default DashboardHome;
