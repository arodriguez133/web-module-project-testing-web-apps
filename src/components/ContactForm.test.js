import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    const header = screen.queryByText(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const nameInput = screen.getByLabelText(/first name/i);
    userEvent.type(nameInput, "bill")
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "");

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, "");

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "");

    const button = screen.getByRole("button");
    userEvent.click(button);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "Mike");

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, "Jone");

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "");

    const button = screen.getByRole("button");
    userEvent.click(button);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

  const emailInput = screen.queryByLabelText("Email*");

  userEvent.type(emailInput, "a.com");

  const errors = await screen.queryByText(
    /email must be a valid email address/i
  );
  expect(errors).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm/>);

    const lastNameError = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameError, "");

    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(screen.getByText(/Error: lastName is a required field/i)).toHaveTextContent('lastName is a required field');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm/>);

    const emailInputError = screen.getByLabelText(/email/i);
    userEvent.type(emailInputError, "abc");
    expect(screen.getByTestId('error')).toHaveTextContent('Error: email must be a valid email address.');
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
  const firstNameInput = screen.getByLabelText("First Name*");
  console.log(firstNameInput);
  userEvent.type(firstNameInput, "alexander");

  const lastNameInput = screen.getByLabelText("Last Name*");
  userEvent.type(lastNameInput, "edwards");

  const emailInput = screen.getByLabelText("Email*");
  userEvent.type(emailInput, "a@email.com");

  const messageInput = screen.getByLabelText("Message");
  userEvent.type(messageInput, "Hey i hate todays project");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstNameDisplay = screen.getByTestId("firstnameDisplay");
  const lastNameDisplay = screen.getByTestId("lastnameDisplay");
  const emailDisplay = screen.getByTestId("emailDisplay");
  const messageDisplay = screen.getByTestId("messageDisplay");

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).toBeInTheDocument();
});