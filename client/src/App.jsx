import "./App.css";
import { Login } from "./routes/Login";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/Home";
import { UserContext } from "./UserContext";
import { ErrorPage } from "./routes/Error-page";
import { useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Container } from "react-bootstrap";

function App() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [newTableData, setNewTableData] = useState([]);

  

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

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
      <Container className="d-flex justify-content-center">
        {loading ? (
          <PacmanLoader size={30} color={'#ffffff'}/>
            ) : (
              <>
              <h1>Found me!</h1>
              <Routes>
                
        <Route
          exact
          path="/"
          errorElement={<ErrorPage />}
          element={loggedIn ? <HomePage /> : <Login />}
        />
      </Routes>
      </>
    )}
      </Container>
    </UserContext.Provider>
  );
}

export { App };
