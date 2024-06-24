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

const ProofContainer = styled.div`
  position: relative;
  background-color: rgba(239, 250, 254, 0.8);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 450px;
  align-items: center;
`;

const ProofItem = styled.div`
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

const StoredProof: React.FC = () => {
  const [proof, setProof] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const storedProof = await getItemInLocalStorage("publicWitness");
      console.log(storedProof);
      if (typeof storedProof === "string") {
        setProof(JSON.parse(storedProof));
      }
    }
    fetchData();
  }, []);

  return (
    <BackgroundContainer>
      <ProofContainer>
        <Title>Bank Proof</Title>
        {proof ? (
          <div>
            <ProofItem>
              <Label>Public Inputs:</Label>
              <JsonDisplay>
                {JSON.stringify(proof.publicInputs, null, 2)}
              </JsonDisplay>
            </ProofItem>
            <ProofItem>
              <Label>Public Verification Key:</Label>
              <JsonDisplay>
                {JSON.stringify(proof.verificationKey, null, 2)}
              </JsonDisplay>
            </ProofItem>
          </div>
        ) : (
          <div>No proof stored</div>
        )}
      </ProofContainer>
    </BackgroundContainer>
  );
};

export default StoredProof;
