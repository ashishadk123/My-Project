import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Verification.css"; // Import CSS for styling

const Verification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(new Array(6).fill(false)); // Track validation errors
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    const value = element.value;
    const newCode = [...code];
    const newInputError = [...inputError];

    if (/^[0-9]$/.test(value)) {
      newCode[index] = value;
      newInputError[index] = false; // Remove highlight for valid input
      setCode(newCode);
      setInputError(newInputError);

      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    } else {
      newInputError[index] = true; // Highlight for invalid input
      setInputError(newInputError);
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      setCode(pasteData.split(""));
      setInputError(new Array(6).fill(false)); // Remove all highlights on paste
      document.getElementById("input6").focus();
    }
  };

  const handleSubmit = async () => {
    const hasError = code.some(
      (digit, index) => digit === "" || inputError[index]
    );

    if (hasError) {
      setInputError(code.map((digit) => digit === ""));
      setError("Please enter a valid 6-digit code.");
      return;
    }

    const userInput = code.join("");

    try {
      const response = await fetch("/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: userInput }),
      });

      if (response.ok) {
        navigate("/success");
      } else {
        setError("Verification Error");
      }
    } catch (error) {
      setError("Verification Error");
    }
  };

  return (
    <div onPaste={handlePaste}>
      <h2>Enter Verification Code</h2>
      <div>
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            id={`input${index + 1}`}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            className={inputError[index] ? "input-error" : ""} // Add error class if needed
          />
        ))}
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Verification;
