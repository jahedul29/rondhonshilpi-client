import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Activation.css";

const Activation = () => {
  useEffect(() => {
    document.title = "RondhonShilpi-Activation";
  }, []);

  return (
    <Container className="activation d-flex justify-content-center align-items-center">
      <div className="activationContainer ">
        <h3 className="text-primary mb-4">
          Verify your account for RondhonShilpi
        </h3>
        <p className="text-muted">
          We have sent you a verification email to your email account. Please
          click the link you have been sent and confirm your account
        </p>
      </div>
    </Container>
  );
};

export default Activation;
