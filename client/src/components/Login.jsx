import axios from "axios";
import { Form, Button } from "react-bootstrap";

function Login() {
  const validate = (e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    axios.post("http://localhost:3001/validatePassword", data).then((res) => {
      if (res.data.validation) {
        alert("Your password is correct.");
      } else {
        alert("Your password is incorrect");
      }
    });
  };

  return (
    <>
    <Form onSubmit={validate} className="login-form d-flex flex-column w-50 gap-2">
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
    </>
  );
}

export { Login };
