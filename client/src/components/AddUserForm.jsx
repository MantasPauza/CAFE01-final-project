/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect } from "react";

function AddUserForm() {
  // eslint-disable-next-line no-unused-vars
  const { userData, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  console.log(tableData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetForm = () => {
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
    };
    const d = new Date();
    let id = d.valueOf();

    console.log(tableData);
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
      const newData = [...prev, data];
      resetForm();
      return newData;
    });

    axios.post("http://localhost:3001/addAttendee", data).then((res) => {
      console.log(res);
    });

  };

  //watch tableData and if it changes rerender the table with the new data
  
  useEffect(() => {
    console.log("tableData changed");
  }, [tableData]);


  return (
    <Form onSubmit={handleSubmit} id="add_user_form">
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control required type="number" placeholder="Enter age" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export { AddUserForm };
