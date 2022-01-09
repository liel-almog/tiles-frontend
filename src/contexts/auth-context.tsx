import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { login } from "../utils/api";
import { useLocalStorage } from "../utils/localStorage";
import { User } from "../types/user.interface";
import { Login } from "../types/auth.interface";
import jwtDecode from "jwt-decode";

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
  onLogin: () => new Promise((res, rej) => res("")),
});

interface AuthContextProviderProps {}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
  props
) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState<Partial<User>>(() => {
    if (token) {
      return jwtDecode(token);
    } else {
      return {};
    }
  });

  const logoutHandler = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  const loginHandler = async (values: Login) => {
    try {
      const res: AxiosResponse<{ message: string; token: string }> =
        await login(values);
      const { token, message } = res.data;
      const user = jwtDecode(token) as User;
      setUser(user);
      setToken(token);
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
