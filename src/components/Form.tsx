import styled from "styled-components";
import React, { useState } from "react";

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/form-bg.png") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100vh; // or any height you need
`;

const FormContainer = styled.div`
  background-color: rgba(239, 250, 254, 0.8); /* Increase transparency */
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 450px;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-family: "Prata", serif; // Apply Prata font
  text-align: center;
  color: #060640;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-family: "Prata", serif; // Apply Prata font
  color: #060640;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #001f54;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%; /* Ensure the button takes full width of its container */
  align-self: center; /* Center align the button within its container */

  &:hover {
    background-color: #003b80;
  }
`;

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, bankName, accountNumber, ifsc });
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <Title>BANK PROOF</Title>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Bank Name</Label>
          <Input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Account Number</Label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>IFSC</Label>
          <Input
            type="text"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleSubmit}>Generate</Button>
      </FormContainer>
    </BackgroundContainer>
  );
};

export default Form;
