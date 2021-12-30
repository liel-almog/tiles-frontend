import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { login, Login } from "../utils/api";
import { useLocalStorage } from "../utils/localStorage";

interface AuthContextArgs {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (v: Login) => Promise<string>;
}

const AuthContext = React.createContext<AuthContextArgs>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (values) => new Promise((res, rej) => res('')),
});

interface AuthContextProviderProps {}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
  props
) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [_userId, setUserId] = useLocalStorage("userId", "");

  const logoutHandler = () => {
    setUserId("");
    setIsLoggedIn(false);
  };

  const loginHandler = async (values: Login) => {
    try {
      const res: AxiosResponse<{ id: string; message: string }> = await login(
        values
      );
      const { id, message } = res.data;
      setUserId(id);
      setIsLoggedIn(true);
      return message;
    } catch (error: any) {
      throw new Error(error.message);
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
