import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Login } from "../types/auth.interface";
import { User } from "../types/user.interface";
import { login } from "../utils/api";

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
  const [token, setToken] = useState(() => {
    return Cookies.get("token");
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!token;
  });
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
    setToken("");
    Cookies.remove("token");
  };

  const loginHandler = async (values: Login) => {
    try {
      const { token, message } = await login(values);
      const user = jwtDecode(token) as User;
      setUser(user);
      setToken(token);
      setIsLoggedIn(true);
      Cookies.set('token', token)
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
