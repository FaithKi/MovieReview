import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { AuthContextType, UserState } from "../type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserState>(() => {
    const storedUserState = localStorage.getItem("userState");
    return storedUserState ? JSON.parse(storedUserState) : { isAuthenticated: false, user: null, token: null };
  });

  useEffect(() => {
    if (userState.isAuthenticated) {
      localStorage.setItem("userState", JSON.stringify(userState));
    } else {
      localStorage.removeItem("userState"); // Ensures it's cleared properly
    }
  }, [userState]);

  const login = (userData: UserState) => setUserState(userData);
  const logout = () => {
    setUserState({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem("userState");
  };

  return (
    <AuthContext.Provider value={{ userState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};