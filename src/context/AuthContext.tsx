import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextType, Usuario } from "./types";
import { loginService } from "../services/AuthService";
import { getUserData } from "../services/UserService";
import { useAuthToken } from "../hook/useAuthToken";
import { useNavigate } from "react-router";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2️⃣ Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navegate = useNavigate();
  const { saveToken, removeToken } = useAuthToken();
  // Simular autenticación con localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  // Función de inicio de sesión
  const login = async (email: string = "", password: string = "") => {
    try {
      console.log(email, password);

      const responseLogin = await loginService(email, password);
      console.log("rrrr");

      if ("access_token" in responseLogin) {
        saveToken(responseLogin.access_token);
        const l = await getUserData();
        navegate("/dashboard");
        return responseLogin;
      }
    } catch (error) {
      console.error(error);

      throw new Error("Credenciales Invalidas:" + error);
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    setUsuario(null);
    removeToken();
    localStorage.removeItem("user");
    navegate("/login");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
