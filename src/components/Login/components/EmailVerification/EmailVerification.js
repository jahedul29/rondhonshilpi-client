import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import apiClient from "../../../../coreServices/apiClient";
import { Container } from "react-bootstrap";

const EmailVerification = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation();
  let history = useHistory();

  // const queries = queryString.parse(location.search);

  const { token, email } = queryString.parse(location.search);

  useEffect(() => {
    document.title = "RondhonShilpi-EmailVerification";
  }, []);

  useEffect(() => {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/account/email-verified", {
          userToken: token,
          userEmail: email,
        })
        .then((response) => {
          if (response.status === 200) {
            setResponseMessage(response.data.message);
            history.push("/login");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            setResponseMessage(error.response.data.message);
          }
        });
    });
  }, [token, email]);

  return (
    <Container>
      <div className="outerContainer d-flex justify-content-center align-items-center">
        <div className="innerContainer">
          <p>{responseMessage}</p>
        </div>
      </div>
    </Container>
  );
};

export default EmailVerification;
