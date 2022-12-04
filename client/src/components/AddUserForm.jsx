/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect } from "react";
import { YellowButton } from "../styledComponents/Buttons.styles";
import { AddUserFormContainer } from "../styledComponents/Containers.styles";
function AddUserForm() {
  // eslint-disable-next-line no-unused-vars
  const { userData, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);

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

  useEffect(() => {
    console.log("BOOM effect");
  }, [tableData]);

  return (
    <AddUserFormContainer onSubmit={handleSubmit} id="add_user_form">
      <Form.Group
        key={`first_name_input`}
        id="input_form"
        className="mb-3"
        controlId="formBasicFirstName"
      >
        <Form.Label>First Name</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="text"
          placeholder="Enter first name"
        />
      </Form.Group>
      <Form.Group
        key={`last_name_input`}
        className="mb-3"
        controlId="formBasicLastName"
      >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="text"
          placeholder="Enter last name"
        />
      </Form.Group>
      <Form.Group
        key={`email_input`}
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group key={`age_input`} className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="number"
          placeholder="Enter age"
        />
      </Form.Group>
      <YellowButton variant="primary" type="submit">
        Submit
      </YellowButton>
    </AddUserFormContainer>
  );
}

export { AddUserForm };
