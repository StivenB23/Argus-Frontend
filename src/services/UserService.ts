import axios from "axios";
import { handleAxiosError } from "./AuthService";
import { useAuthToken } from "../hook/useAuthToken";
const API_URL = "http://localhost:8300";

export const getUserData = async () => {
  try {
    const  token  = localStorage.getItem("token")
    console.log(token);
    
    const responseUser = await axios.get(`${API_URL}/users/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(responseUser.data);
    
    localStorage.setItem("user", JSON.stringify(responseUser.data));
    return responseUser.data;
  } catch (error) {
    console.log(error);
    
    return handleAxiosError(error);
  }
};
