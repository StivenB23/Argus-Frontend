import axios from "axios";
import { handleAxiosError } from "./AuthService";

export const getFacilitiesService = async () => {
    try {
        const facilities = await axios.get(`${import.meta.env.VITE_API_BACKEND}/facilities`);
        return facilities.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}