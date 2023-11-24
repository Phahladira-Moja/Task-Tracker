import React, { createContext, useContext, useState, useEffect } from "react";

type IContextType = {
  token: string;
  loading: boolean;
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const INITIAL_STATE = {
  token: "",
  loading: false,
  isAuthenticated: false,
  setToken: () => {},
  setIsAuthenticated: () => {},
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: IContextType = {
    token,
    loading,
    isAuthenticated,
    setToken,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
