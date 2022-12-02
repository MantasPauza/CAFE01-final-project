import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../UserContext";
import { LogInButton } from "../styledComponents/Buttons.styles";
import { LoginContainer } from "../styledComponents/Containers.styles";


function Login() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);
  

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
          setTableData(res.data.rows);
        });
        setValidated(true);
        setLoggedIn(true);
        setUserData(res.data.username);
      } else {
        alert(res.data.message);
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
        alert(res.data.message);
      } else if (!res.data.sucess) {
        alert(res.data.message);
      }
    });
    handleClose();
  };

  const useDemo = () => {
    const data = {
      username: "admin",
      password: "admin",
    };
    axios.post("http://localhost:3001/validatePassword", data).then((res) => {
      if (res.data.validation) {
        axios.post("http://localhost:3001/getData", data).then((res) => {
          setTableData(res.data.rows);
        });
        setValidated(true);
        setLoggedIn(true);
        setUserData(res.data.username);
      } else {
        console.log(res.validation);
        alert("Your password is incorrect");
      }
    });
  };

 

  return (
    <LoginContainer
      id="login_container"
    >
      <div className="login_form">
      <h1 id={'welcome_text'} className="text-center" style={{color: '#D4A10B'}}>Welcome!</h1>
      <LogInButton id="demo_button" onClick={useDemo}>Demo user</LogInButton>
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
        <LogInButton id="login_button" variant="primary" type="submit">
          Log in
        </LogInButton>
      </Form>
      <div className={"d-flex flex-column align-items-center"}>
        <LogInButton variant="primary" onClick={handleShow}>
          Register
        </LogInButton>
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
      </div>
    </LoginContainer>
  );
}

export { Login };
