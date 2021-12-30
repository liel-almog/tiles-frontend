import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { login, Login } from "../utils/api";
import { useLocalStorage } from "../utils/localStorage";
import { User } from "../types/interface.user";

interface AuthContextArgs {
  user: Partial<User>;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (v: Login) => Promise<string>;
}

const AuthContext = React.createContext<AuthContextArgs>({
  user: {},
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (values) => new Promise((res, rej) => res("")),
});

interface AuthContextProviderProps {}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
  props
) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [user, setUser] = useLocalStorage<Partial<User>>("user", {});

  const logoutHandler = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  const loginHandler = async (values: Login) => {
    try {
      const res: AxiosResponse<{ user: User; message: string }> = await login(
        values
      );
      const { user, message } = res.data;
      setUser(user);
      setIsLoggedIn(true);
      return message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
