import axios from "axios";
import { UserContext } from "../UserContext";
import React, { useState, useContext } from "react";
import { Table } from "react-bootstrap";
import { useEffect } from "react";

const HomePage = () => {
  const { userData, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr style={{ color: "white" }}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Age</th>
        </tr>
        {tableData.attendees.map((item) => (
            <tr key={item.attendeeID} style={{ color: "white" }}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
            </tr>
        ))}
      </thead>
    </Table>
  );
};

export { HomePage };
