import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "../../App";
import { Login } from "../../pages/Login";
import { FormTemplate } from "@components/FormTemplate";
import { Dashboard } from "../../pages/layouts/Dashboard";
import DashboardHome from "../../pages/DashboardHome/DashboardHome";
import { FormUser } from "@components/FormUser";
import UserList from "../../pages/UserList/UserList";
import ValidateIdentityCard from "../../pages/ValidateIdentityCard/ValidateIdentityCard";
import TemplateList from "../../pages/TemplateList/TemplateList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/d" element={<App />} />
      <Route path="/template" element={<FormTemplate />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="template/list" element={<TemplateList />} />
        <Route index element={<DashboardHome />} />
        <Route path="usuarios" element={<UserList /> } />
        <Route path="template" element={<FormTemplate />} />
        <Route path="validate" element={<ValidateIdentityCard />} />
        <Route path="crear-usuario" element={<FormUser />} />
      </Route>
    </Routes>
  );
};

export default Router;
