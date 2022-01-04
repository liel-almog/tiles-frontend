import { Routes, Route } from "react-router-dom";
import App from "./App";
import { NotFound } from "./components/NotFound";
import { Signup } from "./components/Forms/Signup";
import { Login } from "./components/Forms/Login";
import { Admin } from "./components/Admin";
import { TilesList } from "./components/TilesList";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/" element={<App />}>
        <Route index element={<TilesList />}></Route>
        <Route path="admin" element={<Admin />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
