import axios from "axios";

function Register() {
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
    <>
      <form onSubmit={register} className="registration-form">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <button>Register</button>
      </form>
    </>
  );
}

export { Register };
