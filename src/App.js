import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import LoginForm from "./components/Login";
import NewUserForm from './components/NewUser';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/new-user" element={<NewUserForm />} />
      </Routes>
    </>
  );
}

export default App;
