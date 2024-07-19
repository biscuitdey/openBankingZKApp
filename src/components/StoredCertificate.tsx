import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../utils/localStorage";

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/form-bg.png") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100vh; // or any height you need
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-family: "Prata", serif; // Apply Prata font
  text-align: center;
  color: #060640;
`;

const CertificateContainer = styled.div`
  position: relative;
  background-color: rgba(239, 250, 254, 0.8);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 450px;
  align-items: center;
`;

const CertificateItem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #060640;
`;

const Value = styled.span`
  margin-left: 10px;
  color: #333;
`;

const JsonDisplay = styled.pre`
  background: #1c3b72;
  padding: 10px;
  border-radius: 4px;
  color: rgba(234, 247, 255, 0.85);
  max-height: 200px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(239, 250, 254, 0.8);
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  color: #333;
`;

const Button = styled.button`
  background-color: #001f54;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  align-self: center;
  margin-top: 20px;

  &:hover {
    background-color: #003b80;
  }
`;

const StoredCertificate: React.FC = () => {
  const [certificate, setCertificate] = useState<any>(null);
  const [publicKey, setPublicKey] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const storedCertificate = await getItemInLocalStorage("publicWitness");
      const publicKey = await getItemInLocalStorage("publicKey");
      if (
        typeof storedCertificate === "string" &&
        typeof publicKey === "string"
      ) {
        setCertificate(JSON.parse(storedCertificate));
        setPublicKey(publicKey);
      }
    }
    fetchData();
  }, []);

  const handleSend = () => {
    // Implement the send logic here
    console.log("Send button clicked");
  };

  return (
    <BackgroundContainer>
      <CertificateContainer>
        <Title>Bank Certificate</Title>
        {certificate ? (
          <div>
            <CertificateItem>
              <Label> Customer Information :</Label>
              <JsonDisplay>
                {JSON.stringify(certificate.publicInputs, null, 2)}
              </JsonDisplay>
            </CertificateItem>
            <Button onClick={handleSend}>Send</Button>
          </div>
        ) : (
          <div>No certificate stored</div>
        )}
      </CertificateContainer>
    </BackgroundContainer>
  );
};

export default StoredCertificate;
