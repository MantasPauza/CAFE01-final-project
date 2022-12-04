/* eslint-disable no-unused-vars */
import { UserContext } from "../UserContext";
import { useIdleTimer } from "react-idle-timer";
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
  const [editingData, setEditingData] = useState({});

  //sets login status to false, clears attendees table, and clears user data which redirects the user to the login page
  const logout = () => {
    setLoggedIn(false);
    setTableData([]);
    setValidated(false);
    setUserData([]);
    alert("You have been logged out");
  };
  // gets data from row that is clicked on, and sets it to editingData so it can be accessed in the modal also opens modal
  const getData = (e) => {
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode;
    const rowID = tableData[grandParent.id].attendee_id;
    const data = {
      attendee_id: rowID,
    };
    const editData = {
      //to access the data in the row from the button, i had to access grandparent.id to get the row number, then access the tableData and get the data
      firstName: tableData[grandParent.id].firstName,
      lastName: tableData[grandParent.id].lastName,
      email: tableData[grandParent.id].email,
      age: tableData[grandParent.id].age,
    };
    setEditingData(editData);
    //sets the row id to selectedID so it can be used to update the row
    setSelectedID(data);
    handleShow();
  };
  //modal open/close functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to update data in the database and in the table
  const updateData = (e) => {
    e.preventDefault();
    //i set new info as new data to be sent to the database
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
        //after getting success from the database, i close the modal and update the table
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
    //once again, i had to access the row id from the button
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode;
    const rowID = tableData[grandParent.id].attendee_id;
    // i set the username to distinguish which user is deleting the data and the attendee_id to delete the correct row
    const data = {
      username: userData,
      attendee_id: rowID,
    };
    axios.post("http://localhost:3001/deleteData", data).then((res) => {
      if (res.data.success) {
        // and again, after receiving success from the database, i update the table
        handleClose();
        axios.post("http://localhost:3001/getData", data).then((res) => {
          setTableData(res.data.rows);
        });
      }
    });
  };
  //loading screen is set to true while the data is being fetched from the database and set to false when the data is received (sort of like a loading screen)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  //check if user is idle for 5 minutes and if so, log them out using idle timer
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 5,
    onIdle: () => logout(),
  });

  return (
    <>
      {/* is is loading? if yes, then show loading screen if not, show my home page
    also was getting a lot of 'key' errors, to i gave everyone keys (was feeling generous) */}
      {loading ? (
        <PacmanLoader size={40} color={"#211d22"} />
      ) : (
        <HomeContainer id="home_container">
          <YellowButton key={"LogOutButton"} variant="primary" onClick={logout}>
            Logout
          </YellowButton>
          <AddUserForm key={"AddUserForm"} />
          <AttendeeTable key={userData}>
            <thead>
              <tr key={"first_row"} id="table_first_row">
                <th key={"thead_name"}>First Name</th>
                <th key={"thead_lastName"}>Last Name</th>
                <th key={"thead_email"}>Email</th>
                <th key={"thead_age"}>Age</th>
              </tr>
              {tableData.length === 0 ? (
                <tr key={"no_data"}>
                  <td colSpan="4" styles={{ textAlign: "center" }}>
                    No Data
                  </td>
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
              <Modal.Title>Update form</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#211d22", color: "#fde0a6" }}>
              <Form onSubmit={updateData} className="attendee_update_form">
                <h5>Update user</h5>
                <Form.Group key={"Update_name"} controlId="formUpdateFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    className="form_control"
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    type="text"
                    placeholder="Enter first name"
                    defaultValue={editingData.firstName}
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    className="form-control"
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    key={"Update_lastName"}
                    type="text"
                    placeholder="Enter last name"
                    defaultValue={editingData.lastName}
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    className="form-control"
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    key={"Update_email"}
                    type="Email"
                    placeholder="Enter email"
                    defaultValue={editingData.email}
                  />
                </Form.Group>
                <Form.Group controlId="formRegistrationAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required
                    className="form-control"
                    autoComplete="off"
                    style={{
                      background: "#211d22",
                      border: "#70c6bb 2px solid",
                      color: "#fde0a6",
                    }}
                    key={"Update_age"}
                    type="number"
                    placeholder="Enter age"
                    defaultValue={editingData.age}
                  />
                </Form.Group>
                <YellowButton variant="success" type="submit">
                  Submit
                </YellowButton>
              </Form>
            </Modal.Body>
          </Modal>
        </HomeContainer>
      )}
    </>
  );
};

export { HomePage };
