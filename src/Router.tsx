import { Routes, Route } from "react-router-dom";
import App from "./App";
import { NotFound } from "./components/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index element={<Login />}></Route>
        <Route path="admin" element={<Admin />}></Route> */}
        {/* <Route path="tile" element="Tile"></Route> */}
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
