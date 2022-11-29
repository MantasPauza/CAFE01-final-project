import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../UserContext";

function Login() {
  const { setLoggedIn }  = useContext(UserContext);
  const { setUserData } = useContext(UserContext);



  const validate = (e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    
    axios.post("http://localhost:3001/validatePassword", data).then((res) => {
      if (res.data.validation) {
        setLoggedIn(true);

        setUserData(res.data.username);
      } else {
        alert("Your password is incorrect");
      }
    });
  };

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
    <Container
      id="login_container"
      className={"d-flex flex-column w-50 gap-2 align-items-center"}
    >
      <Form
        onSubmit={validate}
        className="login-form d-flex flex-column w-50 gap-2"
      >
        <h4>Login</h4>
        <Form.Group controlId="formLoginUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <button id="login_button" variant="primary" type="submit">
          Log in
        </button>
      </Form>
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
        </Modal>
      </div>
    </Container>
  );
}

export { Login };
