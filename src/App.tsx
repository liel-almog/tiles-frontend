import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <main className="container">
      <h1>Hello World</h1>
      <Outlet></Outlet>
    </main>
  );
}

export default App;
