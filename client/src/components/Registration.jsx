import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function Register() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const register = (e) => {
    e.preventDefault();
    const d = new Date();
    let ms = d.valueOf();
    const data = {
      userID: ms,
      username: e.target[0].value,
      password: e.target[1].value,
    };
    axios.post("http://localhost:3001/addUser", data).then((res) => {
      if (res.data.success) {
        alert(res.data.message.message);
      } else if (!res.data.sucess) {
        alert("Username already exists");
      }
    });
  };

  return (
    <div className={"d-flex flex-column align-items-center"}>
      <Button variant="primary" onClick={handleShow}>
        Register
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={register} className="register-form">
            <h5>Register</h5>
            <Form.Group controlId="formRegistrationUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formRegistrationPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { Register };
