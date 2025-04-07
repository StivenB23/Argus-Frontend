import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "../../App";
import { Login } from "../../pages/Login";
import { FormTemplate } from "../../components/FormTemplate";
import { Dashboard } from "../../pages/layouts/Dashboard";


const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/d" element={<App />} />
        <Route path="/template" element={<FormTemplate />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
};

export default Router;
