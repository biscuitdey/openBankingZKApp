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

const Result = styled.div<{ success: boolean }>`
  color: ${({ success }) => (success ? "green" : "red")};
  font-weight: bold;
  margin-top: 10px;
`;

const JsonDisplay = styled.pre`
  background: #1c3b72;
  padding: 10px;
  border-radius: 4px;
  color: rgba(234, 247, 255, 0.85);
  max-height: 200px;
  overflow-y: auto;
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #060640;
  border-radius: 8px;
`;

const VerifyProof: React.FC = () => {
  const [proof, setProof] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );
  const [verificationSuccess, setVerificationSuccess] =
    useState<boolean>(false);

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

  const handleVerify = async () => {
    setIsLoading(true);

    const publicKey = await getItemInLocalStorage("publicKey");
    const body = {
      publicWitness: {
        publicInputs: proof.publicInputs,
        verificationKey: proof.verificationKey,
      },
      publicKey,
    };

    try {
      const response = await fetch("http://127.0.0.1:4000/proof/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        setVerificationResult(
          result ? "Proof Verified Successfully" : "Proof Verification Failed"
        );
        setVerificationSuccess(result);
      } else {
        setVerificationResult("Error verifying proof");
        setVerificationSuccess(false);
      }
    } catch (error) {
      console.error("Error verifying proof:", error);
      setVerificationResult("Error verifying proof");
      setVerificationSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      <ProofContainer>
        {isLoading && <LoadingOverlay>Verifying Proof...</LoadingOverlay>}
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
            {verificationResult && (
              <ProofItem>
                <Label>Result:</Label>
                <Result success={verificationSuccess}>
                  {verificationResult}
                </Result>
              </ProofItem>
            )}
            <Button onClick={handleVerify}>Verify Proof</Button>
          </div>
        ) : (
          <div>No proof stored</div>
        )}
      </ProofContainer>
    </BackgroundContainer>
  );
};

export default VerifyProof;
