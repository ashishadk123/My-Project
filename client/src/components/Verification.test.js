import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Verification from "./Verification";

test("renders the verification code inputs", () => {
  render(
    <BrowserRouter>
      <Verification />
    </BrowserRouter>
  );

  // Check if six input fields are rendered
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(6);
});

test("highlights invalid input", () => {
  render(
    <BrowserRouter>
      <Verification />
    </BrowserRouter>
  );

  // Simulate entering an invalid value
  const firstInput = screen.getByLabelText("input1");
  fireEvent.change(firstInput, { target: { value: "a" } });

  // Check if the invalid input is highlighted
  expect(firstInput).toHaveClass("input-error");
});

test("shows error message if form is submitted with invalid code", () => {
  render(
    <BrowserRouter>
      <Verification />
    </BrowserRouter>
  );

  // Simulate form submission
  const button = screen.getByText(/submit/i);
  fireEvent.click(button);

  // Check if error message is displayed
  expect(
    screen.getByText(/Please enter a valid 6-digit code/i)
  ).toBeInTheDocument();
});

test("removes highlight when valid input is entered", () => {
  render(
    <BrowserRouter>
      <Verification />
    </BrowserRouter>
  );

  // Simulate entering an invalid value
  const firstInput = screen.getByLabelText("input1");
  fireEvent.change(firstInput, { target: { value: "a" } });

  // Enter a valid number
  fireEvent.change(firstInput, { target: { value: "1" } });

  // Check if the highlight is removed
  expect(firstInput).not.toHaveClass("input-error");
});
