import axios from "axios";
const API_URL = "http://localhost:8300";

export const getRoles = async () => {
    console.log(import.meta.env.VITE_API_BACKEND);
    
    try {
        const responseRoles = await axios.get(`${import.meta.env.VITE_API_BACKEND}/roles`);
        console.log(responseRoles);
        
        return responseRoles.data;
    } catch (error) {
        console.log(error);
        
    }
}