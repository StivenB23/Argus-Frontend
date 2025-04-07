import { authToken } from "../services/AuthService";

export interface Usuario {
  nombre: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<authToken | undefined>;
  logout: () => void;
}
