import axios from "axios";
import { handleAxiosError } from "./AuthService";

const API_URL = "http://localhost:8300";

export const getTemplatesBackgroundService = async (filename: string) => {
  try {
    const responseTemplates = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/templates/archivos/${filename}`,
      { responseType: "blob" } // 👈 Importante
    );
    return responseTemplates.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const getTemplatesService = async () => {
  try {
    const responseTemplates = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/templates`
    );
    return responseTemplates.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};

export const createTemplateService = async (template, file) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(template));
    formData.append("file", file);

    const response = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/templates`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return handleAxiosError(error);
  }
};
