/* eslint-disable no-unused-vars */
import { UserContext } from "../UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { AddUserForm } from "../components/AddUserForm";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { EditButton, DeleteButton } from "../styledComponents/Buttons.styles"; 

const HomePage = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const [editedData, setEditedData] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(tableData);
  console.log(validated);

  const logout = () => {
    setLoggedIn(false);
    setTableData([]);
    setValidated(false);
    setUserData([]);
    console.log(tableData);
    console.log(validated);
    console.log(userData);
    console.log(loggedIn);
  };
  const getData = (e) => {
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode;
    const rowID = tableData[grandParent.id].attendee_id;
    const data = {
      attendee_id: rowID,
    };
    setSelectedID(data);
    handleShow();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateData = (e) => {
    e.preventDefault();
    const data = {
      username: userData,
      attendee_id: selectedID.attendee_id,
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      age: e.target[3].value,
    };

    axios.post("http://localhost:3001/updateData", data).then((res) => {
      if (res.data.success) {
        console.log("data updated");
        handleClose();
        axios.post("http://localhost:3001/getData", data).then((res) => {
          console.log(res.data);
          console.log(tableData);
          setTableData(res.data.rows);
          console.log(tableData);
        });
      } else {
        alert("data not updated");
      }
    });
  };

  const deleteData = (e) => {
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode;
    const rowID = tableData[grandParent.id].attendee_id;
    const data = {
      username: userData,
      attendee_id: rowID,
    };
    axios.post("http://localhost:3001/deleteData", data).then((res) => {
      if (res.data.success) {
        console.log("data deleted");
        handleClose();
        axios.post("http://localhost:3001/getData", data).then((res) => {
          console.log(res.data);
          console.log(tableData);
          setTableData(res.data.rows);
          console.log(tableData);
        });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (

    <>
    {loading ? (
      <PacmanLoader size={30} color={'#D4A10B'}/>
        ) :(
    <Container id="home_container">
       
              
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
      <AddUserForm />
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr key={'first_row'} id="table_first_row">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="4">No Data</td>
            </tr>
          ) : (
            tableData.map((data, index) => (
              <>
                <tr
                  id={index}
                  className="table_row"
                  key={data.attendee_id}
                >
                  <td value={data.firstName}>{data.firstName}</td>
                  <td value={data.lastName}>{data.lastName}</td>
                  <td value={data.email}>{data.email}</td>
                  <td value={data.age}>{data.age}</td>
                  <td id="table_button_container" className="d-flex gap-3">
                    <EditButton id="edit_button" onClick={getData}>
                      Edit
                    </EditButton>
                    <DeleteButton
                    id="delete_button"
                      variant="danger"
                      onClick={deleteData}
                    >
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              </>
            ))
          )}
        </thead>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateData} className="attendee_update_form">
            <h5>Register</h5>
            <Form.Group controlId="formUpdateFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group controlId="formRegistrationLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
            <Form.Group controlId="formRegistrationEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="Email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formRegistrationAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="Enter age" />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
    )}
    </>
  );
};


export { HomePage };
