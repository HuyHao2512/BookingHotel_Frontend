import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUser(storedUser); // Lưu userId vào state
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("userId", userData.userId); // Lưu userId thay vì object lớn
    localStorage.setItem("accessToken", token);
    setUser(userData.userId);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
