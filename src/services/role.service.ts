import axios from "axios";
import { appendErrors } from "react-hook-form";
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

export const getRolesFacilities = async () => {
    try {
        const responseRoles = await axios.get(`${import.meta.env.VITE_API_BACKEND}/roles/facilities`);
        return responseRoles.data;
    } catch (error) {
        console.log(error);

    }
}

export const updateRoleService = async (id: number, data) => {
    try {
        const responseUpdateRole = await axios.put(
            `${import.meta.env.VITE_API_BACKEND}/roles/${id}`,
            {
                name: data.name,
                facilities: data.facilities, // Asegúrate que sea un array de números
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return responseUpdateRole;
    } catch (error) {
        console.log(error);
    }
}