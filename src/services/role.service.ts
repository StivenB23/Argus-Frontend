import axios from "axios";
const API_URL = "http://localhost:8300";

export const getRoles = async () => {
    try {
        const responseRoles = await axios.get(`${API_URL}/roles`);
        return responseRoles.data;
    } catch (error) {
        console.log(error);
        
    }
}