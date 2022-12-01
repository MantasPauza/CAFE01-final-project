import "./App.css";
import { Login } from "./routes/Login";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { UserContext } from "./UserContext";
import { ErrorPage } from "./routes/Error-page";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [validated, setValidated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        setLoggedIn,
        userData,
        setUserData,
        tableData,
        setTableData,
        validated,
        setValidated,
      }}
    >
      <Routes>
        <Route
          exact
          path="/"
          errorElement={<ErrorPage />}
          element={loggedIn ? <HomePage /> : <Login />}
        />
      </Routes>
    </UserContext.Provider>
  );
}

export { App };
