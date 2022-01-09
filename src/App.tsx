import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import AuthContext from "./contexts/auth-context";
import { TilesContextProvider } from "./contexts/tiles-context";
import { UsersContextProvider } from "./contexts/changed-users-context";
import { combineComponents } from "./utils/CombineComponents";
import "./App.scss";
import { Role } from "./types/role.enum";

function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const AppContextProvider = combineComponents(
    UsersContextProvider,
    TilesContextProvider
  );

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/login");
    }
  }, [authCtx.isLoggedIn]);

  return (
    <>
      <header className="navbar">
        <Navbar />
      </header>
      <AppContextProvider>
        <main className="container">
          <Outlet></Outlet>
        </main>
        {authCtx.user.role !== Role.Viewer && (
          <footer className="footer">
            <Footer />
          </footer>
        )}
      </AppContextProvider>
    </>
  );
}

export default App;
