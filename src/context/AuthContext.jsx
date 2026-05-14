import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "./AuthContextObject";

const demoUsers = [
  {
    email: "student@university.com",
    password: "student123",
    name: "Student",
    role: "student",
  },
  {
    email: "mentor@university.com",
    password: "mentor123",
    name: "Mentor",
    role: "mentor",
  },
];

export function AuthProvider({ children }) {
  const [storedUser, setStoredUser] = useLocalStorage("studentflow-user", null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsCheckingSession(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const login = ({ email, password }) => {
    const matchedUser = demoUsers.find(
      (user) => user.email === email.trim().toLowerCase() && user.password === password
    );

    if (!matchedUser) {
      return {
        success: false,
        message: "Use student@university.com and student123 to login.",
      };
    }

    setStoredUser({
      email: matchedUser.email,
      name: matchedUser.name,
      role: matchedUser.role,
    });

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    setStoredUser(null);
  };

  const value = {
    user: storedUser,
    isAuthenticated: Boolean(storedUser),
    isCheckingSession,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
