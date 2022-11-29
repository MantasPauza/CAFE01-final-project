import "./App.css";
import { Login } from "./routes/Login";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { UserContext } from "./UserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  console.log(loggedIn);


  return (
    <UserContext.Provider
        value={{ loggedIn, setLoggedIn, userData, setUserData }}
      >
    <Routes className={"d-flex flex-column w-50 gap-2 align-items-center"}>
      {loggedIn ? ( <Route path="/home" element={<HomePage />} /> ) : ( <Route path="/" element={<Login />} /> )}

      
    </Routes>
    </UserContext.Provider>
  );
}

export { App };
