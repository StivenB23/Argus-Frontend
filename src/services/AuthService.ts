import axios from "axios";

const API_URL = "http://localhost:8300";

type errorHandler = {
  success: boolean;
  message: string;
};

export type authToken = {
  access_token: string;
};

export const handleAxiosError = (error: unknown): errorHandler => {
  if (axios.isAxiosError(error)) {
    console.log(error.status);

    return {
      success: false,
      message:
        error.response?.data?.detail ||
        error.message ||
        "Error desconocido en la solicitud",
    };
  }
  return { success: false, message: "Error inesperado en la solicitud" };
};

export const loginService = async (
  email: string,
  password: string
): Promise<authToken | errorHandler> => {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const responseLogin = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/login`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return responseLogin.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const registerUser = async (
  name: string,
  file: File
): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/register/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const verifyFace = async (
  file: File
): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/verify/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const verifyIdentityCard = async (code: string) => {
  const formData = new FormData();
  formData.append("code", code);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/verify/identities-cards`,formData
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
