import "./App.css";
import { Login } from "./routes/Login";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <Routes className={"d-flex flex-column w-50 gap-2 align-items-center"}>
      <Route path="/" element={<Login loggedIn={loggedIn} />} />
      <Route path="/home" element={<HomePage />} user={userData} />
    </Routes>
  );
}

export { App };
