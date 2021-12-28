import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import AuthContext from "./contexts/auth-context";
import "./App.scss";

function App() {
  const authCtx = useContext(AuthContext);  
  const navigate = useNavigate();
  console.log("on home page");
  
  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/login')

    }
  }, [authCtx.isLoggedIn]);

  return (
    <>
      <header className="navbar">
        <Navbar />
      </header>
      <main className="container">
        <Outlet></Outlet>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
