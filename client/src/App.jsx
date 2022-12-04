import "./App.css";
import { Login } from "./routes/Login";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { UserContext } from "./UserContext";
import { ErrorPage } from "./routes/Error-page";

import { Container } from "react-bootstrap";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [newTableData, setNewTableData] = useState([]);

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
        newTableData,
        setNewTableData,
      }}
    >
      <Container className="d-flex justify-content-center m-0">
        <Routes>
          <Route
            exact
            path="/"
            errorElement={<ErrorPage />}
            element={loggedIn ? <HomePage /> : <Login />}
          />
        </Routes>
      </Container>
    </UserContext.Provider>
  );
}

export { App };
