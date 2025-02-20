import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "../../App";
import { Login } from "../../pages/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/d" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
