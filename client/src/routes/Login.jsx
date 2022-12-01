import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../UserContext";

function Login() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);

  console.log(tableData);
  console.log(validated);
  console.log(userData);
  console.log(loggedIn);

  const validate = (e) => {
    e.preventDefault();
    const d = new Date();
    let ms = d.valueOf();
    const data = {
      user_id: ms,
      username: e.target[0].value,
      password: e.target[1].value,
    };

    axios.post("http://localhost:3001/validatePassword", data).then((res) => {
      if (res.data.validation) {
        axios.post("http://localhost:3001/getData", data).then((res) => {
          console.log(res.data);
          console.log(tableData);
          setTableData(res.data.rows);
          console.log(tableData);
        });
        setValidated(true);
        console.log(validated);
        setLoggedIn(true);
        setUserData(res.data.username);
      } else {
        console.log(res.validation);
        alert("Your password is incorrect");
      }
    });
    console.log(validated);
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
        alert(res.data.message);
      } else if (!res.data.sucess) {
        alert(res.data.message);
      }
    });
  };

  return (
    <Container
      id="login_container"
      className={"d-flex flex-column w-50 gap-2 align-items-center"}
    >
      <h1 id={'welcome_text'} className="text-center">Welcome!</h1>
      <Form
        onSubmit={validate}
        className="login-form d-flex flex-column w-50 gap-2"
      >
        <p id="demo"></p>
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
