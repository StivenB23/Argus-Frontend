import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "../../App";
import { Login } from "../../pages/Login";
import { FormTemplate } from "../../components/FormTemplate";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/d" element={<App />} />
        <Route path="/template" element={<FormTemplate />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default Router;
