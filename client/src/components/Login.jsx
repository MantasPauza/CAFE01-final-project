import axios from "axios";

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
      <form className="registration-form">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <button>Register</button>
      </form>
      <form onSubmit={validate} className="login-form">
        <h1>Login</h1>
        <input id="loginUsername" type="text" placeholder="Username.." />
        <input id="loginPassword" type="password" placeholder="Password.." />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export { Login };
