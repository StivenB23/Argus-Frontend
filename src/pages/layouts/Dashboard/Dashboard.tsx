import { Link, Outlet } from "react-router";
import "./Dashboard.css";
import logoLight from "@assets/img/LogoLight.svg";
import { useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineLogout, MdOutlineShield } from "react-icons/md";
import { IoFingerPrint, IoSettingsOutline } from "react-icons/io5";
import { TbLockAccess } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowRoundForward } from "react-icons/io";
export type DashboardProps = {
  // types...
};

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { logout } = useAuth();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  const [openSubmenu, setOpenSubmenu] = useState({
    usuarios: false,
  });

  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="dashboard">
      <article className="sidebard">
        <div className="sidebard__logo">
          <img src={logoLight} className="logo" alt="logo" />
        </div>

        <div className="sidebard__user">
          <h4>
            {user?.nombre} {user?.apellido}
          </h4>
          <span>
            <b>{user?.correo}</b>
          </span>{" "}
          <br />
          <span>{user?.rol}</span>
        </div>

        <nav className="sidebard__nav">
          <ul>
            <li>
              <Link to="/dashboard">
                <RiDashboardLine className="icon__sidebar" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <IoFingerPrint className="icon__sidebar" /> Validación
              </Link>
            </li>

            <li
              className={`has-submenu ${openSubmenu.usuarios ? "active" : ""}`}
            >
              <button type="button" onClick={() => toggleSubmenu("usuarios")}>
                <HiOutlineUsers className="icon__sidebar" /> Usuarios <IoIosArrowDown />
              </button>
              <ul className={`submenu ${openSubmenu.usuarios ? "show" : ""}`}>
                <li>
                  <a href="/dashboard/usuarios">
                    <IoIosArrowRoundForward className="icon__sidebar" /> Lista
                  </a>
                </li>
                <li>
                  <Link to="/dashboard/crear-usuario">
                    <IoIosArrowRoundForward className="icon__sidebar" /> Nuevo
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a href="/permisos">
                <MdOutlineShield className="icon__sidebar" /> Permisos
              </a>
            </li>
            <li>
              <a href="/accesos">
                <TbLockAccess className="icon__sidebar" /> Accesos
              </a>
            </li>
            <li>
              <a href="/configuracion">
                <IoSettingsOutline className="icon__sidebar" /> Configuración
              </a>
            </li>
            <li>
              <a href="" onClick={logout}>
                <MdOutlineLogout className="icon__sidebar" /> Salir
              </a>
            </li>
          </ul>
        </nav>
      </article>
      <article className="dashboard__content">
        <Outlet />
      </article>
    </section>
  );
};

export default Dashboard;
