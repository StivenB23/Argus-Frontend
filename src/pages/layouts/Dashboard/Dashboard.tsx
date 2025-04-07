import { Outlet } from "react-router";
import "./Dashboard.css";
import logoLight from "@assets/img/LogoLight.svg";
import { Card } from "../../../components/Card";
import { useState } from "react";
import { FormUser } from "../../../components/FormUser";
export type DashboardProps = {
  // types...
};

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });
  return (
    <section className="dashboard">
      <article className="sidebard">
        <div className="sidebard__logo">
          <img src={logoLight} className="logo" alt="" />
        </div>
        <div className="">
          <h4>{user?.nombre} {user?.apellido}</h4>
          <span><b>{user?.correo}</b></span> <br />
          <span>{user?.rol}</span>
        </div>
        <h2>Sidebar</h2>
      </article>
      <article className="dashboard__content">
        <section>
          <Card type="success" />
          <Card type="warning" />
          <Card type="info" />
        </section>
        <FormUser />
      </article>
    </section>
  );
};

export default Dashboard;
