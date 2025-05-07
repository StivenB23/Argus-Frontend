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
import { getWordOfText } from "@utils/textUtils";
import { GoProjectTemplate } from "react-icons/go";
import { BsBuildings } from "react-icons/bs";

export type DashboardProps = {
  // types...
};

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { logout } = useAuth();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleSubmenu = (menuName: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  return (
    <section className="dashboard">
      <article className="sidebard">
        <div className="sidebard__logo">
          <img src={logoLight} className="logo" alt="logo" />
        </div>

        <div className="sidebar__user">
          <div className="sidebar__avatar">
            <span>
              {user?.first_name?.charAt(0)}
              {user?.last_name?.charAt(0)}
            </span>
          </div>
          <div className="sidebar__info">
            <h4>
              {getWordOfText(user?.first_name)} {getWordOfText(user?.last_name)}
            </h4>
            <p className="sidebar__email">{user?.email}</p>
            <span className="sidebar__role">{user?.role}</span>
          </div>
        </div>

        <nav className="sidebard__nav">
          <ul>
            <li>
              <Link to="/dashboard">
                <RiDashboardLine className="icon__sidebar" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="validate">
                <IoFingerPrint className="icon__sidebar" /> Validación
              </Link>
            </li>

            <li
              className={`has-submenu ${
                activeMenu === "usuarios" ? "active" : ""
              }`}
            >
              <button type="button" onClick={() => toggleSubmenu("usuarios")}>
                <HiOutlineUsers className="icon__sidebar" /> Usuarios{" "}
                <IoIosArrowDown />
              </button>
              <ul
                className={`submenu ${activeMenu === "usuarios" ? "show" : ""}`}
              >
                <li>
                  <Link to="/dashboard/usuarios">
                    <IoIosArrowRoundForward className="icon__sidebar" />
                    Ver Usuarios
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/crear-usuario">
                    <IoIosArrowRoundForward className="icon__sidebar" /> Crear
                    Usuario
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`has-submenu ${
                activeMenu === "plantillas" ? "active" : ""
              }`}
            >
              <button type="button" onClick={() => toggleSubmenu("plantillas")}>
                <GoProjectTemplate /> Plantilla Carnets <IoIosArrowDown />
              </button>
              <ul
                className={`submenu ${
                  activeMenu === "plantillas" ? "show" : ""
                }`}
              >
                <li>
                  <a href="/dashboard/template/list">
                    <IoIosArrowRoundForward className="icon__sidebar" /> Listar
                  </a>
                </li>
                <li>
                  <Link to="/dashboard/template">
                    <IoIosArrowRoundForward className="icon__sidebar" /> Nueva
                    Plantilla
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a href="/permisos">
                <BsBuildings className="icon__sidebar" /> Instalaciones
              </a>
            </li>
            <li>
              <Link to="/dashboard/roles-permisos">
                <MdOutlineShield className="icon__sidebar" /> Roles y Permisos
              </Link>
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
