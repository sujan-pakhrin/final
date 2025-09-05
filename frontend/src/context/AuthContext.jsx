import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  let initialUser = null;

  try {
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }

  const [user, setUser] = useState(initialUser);

  const login = async (formData) => {
    try {
      const res = await axios.post("/api/login", formData, {
        withCredentials: true, 
      });

      if (res.data.success) {
        setUser(res.data.user); 
      }

      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
