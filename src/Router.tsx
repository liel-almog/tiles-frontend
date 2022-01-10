import { Routes, Route, Navigate,  } from "react-router-dom";
import App from "./App";
import { NotFound } from "./components/NotFound";
import { Signup } from "./components/Forms/Signup";
import { Login } from "./components/Forms/Login";
import { Admin } from "./components/Admin";
import { TilesList } from "./components/TilesList";
import AuthContext from "./contexts/auth-context";
import { useContext } from "react";

const Router = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      {isLoggedIn && (
        <Route path="/" element={<App />}>
          <Route index element={<TilesList />}></Route>
          {user.role === "Admin" && (
            <Route path="admin" element={<Admin />}></Route>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      )}
      <Route path="*" element={<Navigate to={'/login'} />}></Route>
    </Routes>
  );
};

export default Router;
