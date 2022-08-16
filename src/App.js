import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
