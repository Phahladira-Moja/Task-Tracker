import React, { createContext, useContext, useState, useEffect } from "react";

type IContextType = {
  token: string;
  loading: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const INITIAL_STATE = {
  token: "",
  loading: false,
  setToken: () => {},
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
