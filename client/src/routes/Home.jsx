/* eslint-disable no-unused-vars */
import { UserContext } from "../UserContext";
import React, { useContext } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { AddUserForm } from "../components/AddUserForm";
import { useEffect } from "react";

const HomePage = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  console.log(tableData);
  console.log(validated);

  useEffect(() => {
    console.log("useEffect");
    console.log(typeof tableData);
  }, [tableData]);

  const logout = () => {
    setLoggedIn(false);
    setTableData([]);
    setValidated(false);
    setUserData([]);
    console.log(tableData);
    console.log(validated);
    console.log(userData);
    console.log(loggedIn);
  };

  return (
    <Container id="home_container">
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
      <AddUserForm />
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr style={{ color: "white" }}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="4">No Data</td>
            </tr>
          ) : (
            tableData.map((data) => (
              <tr style={{ color: "white" }} key={data.user_id}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
              </tr>
            ))
          )}
        </thead>
      </Table>
    </Container>
  );
};

export { HomePage };
