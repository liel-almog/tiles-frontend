import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./App.scss";

function App() {
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
