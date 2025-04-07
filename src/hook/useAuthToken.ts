import { useState } from "react";
const TOKEN_KEY = "token";
export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>();

  const saveToken = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return { token, saveToken, removeToken };
};
