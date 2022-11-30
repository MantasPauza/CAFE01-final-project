/* eslint-disable no-unused-vars */
import { UserContext } from "../UserContext";
import React, { useContext } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { AddUserForm } from "../components/AddUserForm";

const HomePage = () => {
  const { userData, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  console.log(tableData);

  const logout = () => {
    setLoggedIn(false);
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
          {tableData.attendees.length > 0 ? tableData.attendees.map((item) => (
            <tr key={item.attendeeID} style={{ color: "white" }}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
            </tr>
          )) :
          <tr style={{ color: "white" }}>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            <td>No Data</td>
            </tr>
            }
        </thead>
      </Table>
    </Container>
  );
};

export { HomePage };
