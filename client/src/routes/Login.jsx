/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../UserContext";
import { BlueButton, YellowButton } from "../styledComponents/Buttons.styles";
import { LoginContainer } from "../styledComponents/Containers.styles";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

let CryptoJS = require("crypto-js");

function Login() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);
  const [inputType, setInputType] = useState("password");
  // checks if the input type is password or text and changes it accordingly to enable or disable the password visibility
  const handleClick = () =>
    inputType === "password" ? setInputType("text") : setInputType("password");

  // function to handle the login form submission

  const validate = (e) => {
    // encrypts the password using the sha256 algorithm
    let hash = CryptoJS.SHA1(e.target[1].value);
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    e.preventDefault();
    //creates new, unique id for the user
    const d = new Date();
    let ms = d.valueOf();
    const data = {
      user_id: ms,
      username: e.target[0].value,
      password: hashInBase64,
    };
    // sends the data to the server, which checks if the user exists in the database and if the password is correct and returns the according user data
    axios.post("http://localhost:3001/validatePassword", data).then((res) => {
      if (res.data.validation) {
        axios.post("http://localhost:3001/getData", data).then((res) => {
          setTableData(res.data.rows);
        });
        // if the user exists, the user data is stored in the context and the user is logged in, which redirects the user to his home page
        // the user data is stored in the context to be used in other components
        setValidated(true);
        setLoggedIn(true);
        setUserData(res.data.username);
      } else {
        // if the user does not exist, the user is not logged in and the user data is not stored in the context
        setValidated(false);
        alert(res.data.message);
      }
    });
  };

  //modal open/close functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function to handle the registration form submission
  const register = (e) => {
    // encrypts the password using the sha256 algorithm
    const registerPassword = CryptoJS.SHA1(e.target[1].value);
    const registerPasswordInBase64 =
      CryptoJS.enc.Base64.stringify(registerPassword);
    e.preventDefault();
    //creates new, unique id for the user
    const d = new Date();
    let ms = d.valueOf();
    const data = {
      userID: ms,
      username: e.target[0].value,
      password: registerPasswordInBase64,
    };
    //sends new user data to the server, which checks if the user already exists in the database and if not, adds the user to the database
    axios.post("http://localhost:3001/addUser", data).then((res) => {
      if (res.data.success) {
        alert(res.data.message);
      } else if (!res.data.sucess) {
        alert(res.data.message);
      }
    });
    handleClose();
  };

  // function to handle demo user login. The demo user is already stored in the database, everything else is the same as the login function
  const useDemo = () => {
    const encrypted = CryptoJS.SHA1("admin");
    const hashInBase64 = CryptoJS.enc.Base64.stringify(encrypted);
    const data = {
      username: "admin",
      password: hashInBase64,
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
        alert("Your password is incorrect");
      }
    });
  };

  return (
    <LoginContainer id="login_container">
      <div className="login_form">
        <h1 id={"welcome_text"} className="text-center">
          Welcome!
        </h1>
        <YellowButton id="demo_button" onClick={useDemo}>
          Demo user
        </YellowButton>
        <Form
          onSubmit={validate}
          className="login-form d-flex flex-column w-50 gap-2"
        >
          <p id="demo"></p>
          <h4>Login</h4>
          <Form.Group controlId="formLoginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoComplete="off"
              required
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoComplete="off"
              required
              type={inputType}
              placeholder="Enter password"
            />
            <span className="password__show" onClick={handleClick}>
              {inputType === "text" ? "Hide password" : "Show password"}
            </span>
          </Form.Group>
          <BlueButton
            style={{ background: "#6dc5b9", color: "#372523" }}
            id="login_button"
            variant="primary"
            type="submit"
          >
            Log in
          </BlueButton>
        </Form>
        <div className={"d-flex flex-column align-items-center"}>
          <YellowButton variant="primary" onClick={handleShow}>
            Register
          </YellowButton>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header
              style={{ background: "#211d22", color: "#fde0a6" }}
              closeButton
            >
              <Modal.Title>Register form</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#211d22", color: "#fde0a6" }}>
              <Form onSubmit={register} className="register-form">
                <h5>Create new user</h5>
                <Form.Group controlId="formRegistrationUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <YellowButton variant="success" type="submit">
                  Submit
                </YellowButton>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </LoginContainer>
  );
}

export { Login };
