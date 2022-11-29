//create a form component that can accept first name, email, last name and age, and a submit button


import React, { Component, useState } from 'react';
import { Table, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { addData, deleteData, editData } from '../actions/DataActions';
import PropTypes from 'prop-types';

function mainData() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        const newData = {
            firstName,
            lastName,
            email,
            age
        }

        //Add data via addData action
        addData(newData);
    }



    return (
        <div>
            <Form>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" placeholder="Enter First Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" placeholder="Enter Last Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup>
                    <Label for="age">Age</Label>
                    <Input type="number" name="age" id="age" placeholder="Enter Age" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}
