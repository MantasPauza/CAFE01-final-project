import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

function AddUserForm() {
  const { userData, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const handleSubmit = (e) => {
    const d = new Date();
    let id = d.valueOf();
    e.preventDefault();
    const data = {
        key: id,
      username: userData,
      id: id,
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      age: e.target[3].value,
    };
    setTableData((prev) => {
        console.log(prev);
        if (prev.length === 0) {
            return {
                attendees: [data]
            }
        } else {
      return {
        ...prev,
        attendees: [...prev.attendees, data],
        };
    }
    });
    axios({
      method: "POST",
      url: "http://localhost:3001/addAttendee",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit} id="add_user_form">
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Enter age" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export { AddUserForm };
