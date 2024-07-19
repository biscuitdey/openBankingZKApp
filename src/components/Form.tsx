import styled from "styled-components";
import React, { useState } from "react";
import { createKeypair, createSignature } from "../utils/signature";
import {
  setItemInLocalStorage,
  getItemInLocalStorage,
} from "../utils/localStorage";

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
  position: relative; /* Make the form container position relative */
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
  margin-right: 20px;
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(239, 250, 254, 0.6);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 55px;
    aspect-ratio: 1;
    --g1: conic-gradient(from 90deg at 3px 3px, #0000 90deg, #2c69c0 0);
    --g2: conic-gradient(from -90deg at 22px 22px, #0000 90deg, #2c69c0 0);
    background: var(--g1), var(--g1), var(--g1), var(--g2), var(--g2), var(--g2);
    background-size: 25px 25px;
    background-repeat: no-repeat;
    animation: l7 1.5s infinite;
  }

  @keyframes l7 {
    0% {
      background-position: 0 0, 0 100%, 100% 100%;
    }
    25% {
      background-position: 100% 0, 0 100%, 100% 100%;
    }
    50% {
      background-position: 100% 0, 0 0, 100% 100%;
    }
    75% {
      background-position: 100% 0, 0 0, 0 100%;
    }
    100% {
      background-position: 100% 100%, 0 0, 0 100%;
    }
  }
`;

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name,
      bankName,
      accountNumber,
      ifsc,
    };

    const { privateKey, publicKey } = await createKeypair();
    await setItemInLocalStorage("privateKey", privateKey);
    await setItemInLocalStorage("publicKey", publicKey);
    const signature = await createSignature(payload, privateKey);

    const body = {
      payload,
      signature,
      publicKey,
    };

    try {
      const response = await fetch("http://127.0.0.1:4000/certificate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        await setItemInLocalStorage("publicWitness", JSON.stringify(data));
        console.log("Certificate created successfully:", data);
        setMessage("Certificate created");
        // Redirect to the "Stored Certificate" screen
        window.location.href = "/stored-certificate";
      } else {
        console.error("Error creating certificate:", response.statusText);
        setMessage("Error creating certificate");
      }
    } catch (error) {
      console.error("Error creating certificate:", error);
      setMessage("Error creating certificate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        {isLoading && (
          <LoadingOverlay>
            <Title>Generating Certificate</Title>
            <div className="loader"></div>
          </LoadingOverlay>
        )}
        {!isLoading && message && <div>{message}</div>}
        {!isLoading && !message && (
          <div>
            <Title>BANK CERTIFICATE</Title>
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
          </div>
        )}
      </FormContainer>
    </BackgroundContainer>
  );
};

export default Form;
