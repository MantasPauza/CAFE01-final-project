/* eslint-disable no-unused-vars */
import { UserContext } from "../UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { AddUserForm } from "../components/AddUserForm";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import {
  EditButton,
  DeleteButton,
  YellowButton,
} from "../styledComponents/Buttons.styles";
import { HomeContainer } from "../styledComponents/Containers.styles";
import { AttendeeTable } from "../styledComponents/Table.styles";

const HomePage = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { tableData, setTableData } = useContext(UserContext);
  const { validated, setValidated } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserContext);
  const [editedData, setEditedData] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoggedIn(false);
    setTableData([]);
    setValidated(false);
    setUserData([]);
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
        handleClose();
        axios.post("http://localhost:3001/getData", data).then((res) => {
          setTableData(res.data.rows);
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
        handleClose();
        axios.post("http://localhost:3001/getData", data).then((res) => {
          setTableData(res.data.rows);
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
        <PacmanLoader size={40} color={"#fde0a6"} />
      ) : (
        <HomeContainer id="home_container">
          <YellowButton key={"LogOutButton"} variant="primary" onClick={logout}>
            Logout
          </YellowButton>
          <AddUserForm key={"AddUserForm"} />
          <AttendeeTable key={"AttendeeTable"}>
            <thead>
              <tr key={"first_row"} id="table_first_row">
                <th key={"thead_name"}>First Name</th>
                <th key={"thead_lastName"}>Last Name</th>
                <th key={"thead_email"}>Email</th>
                <th key={"thead_age"}>Age</th>
              </tr>
              {tableData.length === 0 ? (
                <tr key={"no_data"}>
                  <td colSpan="4">No Data</td>
                </tr>
              ) : (
                tableData.map((data, index) => (
                  <>
                    <tr key={data.attendee_id} className="table_row" id={index}>
                      <td
                        key={`firstName_${data.firstName}${data.attendee_id}`}
                        value={data.firstName}
                      >
                        {data.firstName}
                      </td>
                      <td
                        key={`lastName_${data.lastName}${data.attendee_id}`}
                        value={data.lastName}
                      >
                        {data.lastName}
                      </td>
                      <td
                        key={`email_${data.email}${data.attendee_id}`}
                        value={data.email}
                      >
                        {data.email}
                      </td>
                      <td
                        key={`age_${data.age}${data.lastName}_${data.attendee_id}`}
                        value={data.age}
                      >
                        {data.age}
                      </td>
                      <td
                        key={`${data.attendee_id}_buttons`}
                        id="table_button_container"
                        className="d-flex gap-3 d-none d-md-flex"
                      >
                        <EditButton
                          key={`${data.attendee_id}_edit_button`}
                          id="edit_button"
                          onClick={getData}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          key={`${data.attendee_id}_delete_button`}
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
          </AttendeeTable>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header
              style={{ background: "#211d22", color: "#fde0a6" }}
              closeButton
            >
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#211d22", color: "#fde0a6" }}>
              <Form onSubmit={updateData} className="attendee_update_form">
                <h5>Register</h5>
                <Form.Group key={"Update_name"} controlId="formUpdateFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    type="text"
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    key={"Update_lastName"}
                    type="text"
                    placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    key={"Update_email"}
                    type="Email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    key={"Update_age"}
                    type="number"
                    placeholder="Enter age"
                  />
                </Form.Group>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </HomeContainer>
      )}
    </>
  );
};

export { HomePage };
