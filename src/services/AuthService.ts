import axios from "axios";

const API_URL = "http://localhost:8000"; // Asegúrate de cambiarlo si tu backend está en otro puerto o dominio

export const registerUser = async (name: string, file: File): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/register/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: "Error en la solicitud" };
  }
};

export const verifyFace = async (file: File): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/verify/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: "Error en la solicitud" };
  }
};
