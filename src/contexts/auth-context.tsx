import React, { useState, useEffect } from "react";
import { login, Login } from "../utils/api";
import { useLocalStorage } from "../utils/localStorage";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (values: Login) => {},
});

interface AuthContextProviderProps {}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
  props
) => {
  const loggedInUser = Boolean(localStorage.getItem("isLoggedIn"));
  const [isLoggedIn, setIsLoggedIn] = useState(loggedInUser || false);

  useEffect(() => {
    const loggedInUser = Boolean(localStorage.getItem("isLoggedIn"));

    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = async (values: Login) => {
    try {
      const res = await login(values);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (error: any) {
      throw new Error("Could not log you in");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
