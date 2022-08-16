import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import CarMake from "./components/getCarInfo";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car" element={<CarMake />} />
      </Routes>
    </>
  );
}

export default App;
