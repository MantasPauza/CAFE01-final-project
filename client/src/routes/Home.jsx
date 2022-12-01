/* eslint-disable no-unused-vars */
import { UserContext } from "../UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { AddUserForm } from "../components/AddUserForm";
import axios from "axios";

const HomePage = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const [ editedData, setEditedData ] = useState([]);
  const [ selectedID, setSelectedID ] = useState([]);
  console.log(tableData);
  console.log(validated);

  useEffect(() => {
    console.log("useEffect");
    console.log(typeof tableData);
  }, [tableData]);

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



  /* axios.post("http://localhost:3001/getData", data).then((res) => {
    console.log(res.data);
    console.log(tableData);
    setTableData(res.data.rows);
    console.log(tableData);
  }); */


// get data from table depending which row is clicked
  const getData = (e) => {
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode;
    const rowID = tableData[grandParent.id].attendee_id;
    const data = {
      attendee_id: rowID,
    }
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
    if(res.data.success){
      console.log("data updated");
      handleClose();
    }
    axios.post("http://localhost:3001/getData", data).then((res) => {
          console.log(res.data);
          console.log(tableData);
          setTableData(res.data.rows);
          console.log(tableData);
        });
  }
  );
};


  const deleteData = (e) => {
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode;
    const rowID = tableData[grandParent.id].attendee_id;
    const data = {
      username: userData,
      attendee_id: rowID,
    }
    axios.post("http://localhost:3001/deleteData", data).then((res) => {
      if(res.data.success){
        console.log("data deleted");
        handleClose();
      }
      axios.post("http://localhost:3001/getData", data).then((res) => {

            console.log(res.data);
            console.log(tableData);
            setTableData(res.data.rows);
            console.log(tableData);
          });
    }
    );
  };

  return (
    <Container id="home_container">
      <Button variant="primary" onClick={logout}>
        Logout
      </Button>
      <AddUserForm />
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr style={{ color: "white" }}>
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
                  style={{ color: "white" }}
                  key={data.attendee_id}
                >
                  <td value={data.firstName}>
                    {data.firstName}
                  </td>
                  <td value={data.lastName}>{data.lastName}</td>
                  <td value={data.email}>{data.email}</td>
                  <td value={data.age}>{data.age}</td>
                  <td className="d-flex gap-3">
                    <Button className="w-50" onClick={getData}>Edit</Button>
                    <Button className="w-50" variant="danger" onClick={deleteData}>Delete</Button>
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
  );
};

export { HomePage };
