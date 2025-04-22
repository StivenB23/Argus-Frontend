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

  const data = [
    { name: "Page A", uv: 375, pv: 2180, amt: 2635 },
    { name: "Page B", uv: 402, pv: 2412, amt: 2999 },
    { name: "Page C", uv: 319, pv: 2231, amt: 3120 },
    { name: "Page D", uv: 441, pv: 2590, amt: 2850 },
    { name: "Page E", uv: 368, pv: 1967, amt: 2743 },
    { name: "Page F", uv: 422, pv: 2485, amt: 3266 },
    { name: "Page G", uv: 389, pv: 2073, amt: 2988 },
    { name: "Page H", uv: 450, pv: 2672, amt: 3142 },
    { name: "Page I", uv: 337, pv: 2110, amt: 2930 },
    { name: "Page J", uv: 401, pv: 2205, amt: 3057 },
    { name: "Page K", uv: 360, pv: 2309, amt: 2911 },
    { name: "Page L", uv: 417, pv: 2440, amt: 3194 },
    { name: "Page M", uv: 398, pv: 2158, amt: 2876 },
    { name: "Page N", uv: 344, pv: 2027, amt: 2759 },
    { name: "Page O", uv: 428, pv: 2520, amt: 3312 },
  ];
  return (
    <section className="dashboardHome">
      <article className="dashboardHome--header">
        <Card type="success">
          <div className="data-card">
            <h3 className="title-card">Usuarios Activos</h3>
            <span className="porcetage">{usersCount}</span>
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
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
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
          }}
        >
          <h2>222</h2>
        </div>
      </article>
    </section>
  );
};

export default DashboardHome;
