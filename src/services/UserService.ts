import axios from "axios";
import { handleAxiosError } from "./AuthService";
import { userIdentityCardTemplate } from "./models/user.model";

export const getUserByIdTemplateService = async (
  id: number = 2
): Promise<userIdentityCardTemplate> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/users/${id}/templates/`
    );
    return response.data as userIdentityCardTemplate;
  } catch (error) {
    console.error("Error fetching template", error);
    // Devuelves un valor por defecto o puedes lanzar el error
    throw new Error("No se pudo obtener la plantilla");
  }
};

export const getUserPhotoService = async (filename: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/users/photos/${filename}/`,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {}
};

export const getUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    const responseUser = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/users/auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(responseUser.data);

    localStorage.setItem("user", JSON.stringify(responseUser.data));
    return responseUser.data;
  } catch (error) {
    console.log(error);

    return handleAxiosError(error);
  }
};

export const createUser = async (data: any, file: File) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);
    const responseUserCreated = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/users`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return responseUserCreated.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getUsers = async () => {
  try {
    const responseUsers = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/users`
    );
    return responseUsers.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteUserById = async (id: number) => {
  try {
    const responseUsers = await axios.delete(
      `${import.meta.env.VITE_API_BACKEND}/users/${id}`
    );
    return responseUsers.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
