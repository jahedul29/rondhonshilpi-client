import React, { useEffect, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import "./Login.css";
import Registration from "../Registration/Registration";
import { useForm } from "react-hook-form";
import apiClient from "../../../../coreServices/apiClient";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/redux/loggedInUserActions";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toHome, setToHome] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [unknownError, setUnknownError] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.title = "RondhonShilpi-Login";
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/login", {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          if (response.status === 200) {
            setToHome(true);
            dispatch(setUser({ ...response.data.user }));
            sessionStorage.setItem(
              "loggedInUser",
              JSON.stringify({ ...response.data.user })
            );
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setAuthError(error.response.data.errors.message[0]);
          } else {
            console.log(error.response);
            setUnknownError(error.response.data.message);
          }
        });
    });
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <Container
      fluid
      className="loginPageContainer d-flex justify-content-center align-items-center"
    >
      {/* Registration modal */}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Registration />
      </Modal>

      <div className="loginContainer">
        <h3 className="text-info mb-3">Login</h3>
        {authError ? <p className="error text-center">{authError}</p> : null}
        {unknownError ? (
          <p className="error text-center">{unknownError}</p>
        ) : null}

        <Form onSubmit={handleSubmit(onSubmit)} id="loginForm">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your Email"
              className="form-control"
              name="email"
              ref={register({
                required: "Email required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Enter a password"
              type="password"
              className="form-control"
              name="password"
              ref={register({
                required: "Password required",
              })}
            />

            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Check type="checkbox" label="Remember password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <p className="text-danger">Forgot password?</p>
        <div className="socialLogin">
          <h6 className="or-line">
            <span>Or</span>
          </h6>
          <div className="login-alternative d-flex align-items-center justify-content-center">
            <img src="https://i.imgur.com/P9ZVhek.png" alt="" />
            <h6 className="mt-1">Log in with google</h6>
          </div>
          <div className="login-alternative d-flex align-items-center justify-content-center">
            <img src="https://i.imgur.com/oozxCkP.png" alt="" />
            <h6>Log in with facebook</h6>
          </div>
        </div>

        <br />
        <p className="text-center">
          Don't have account? Please{" "}
          <span onClick={openModal} className="text-primary">
            SignUp
          </span>{" "}
          first
        </p>
      </div>
    </Container>
  );
};

export default Login;
