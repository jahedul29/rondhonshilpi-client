import React, { useEffect, useState } from "react";
import "./Registration.css";
import { useForm } from "react-hook-form";
import apiClient from "../../../../coreServices/apiClient";
import { Redirect } from "react-router-dom";

const Registration = () => {
  const [authError, setAuthError] = useState("");
  const [unknownError, setUnknownError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { register, handleSubmit, getValues, errors } = useForm();

  useEffect(() => {
    document.title = "RondhonShilpi-Register";
  }, []);

  const onSubmit = (data) => {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        })
        .then((response) => {
          if (response.status === 201) {
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setAuthError(error.response.data.errors.email[0]);
          } else {
            setUnknownError(error.response.data.message);
          }
        });
    });
  };

  if (isLoggedIn === true) {
    return <Redirect to="/activation" />;
  }

  return (
    <div className="px-3 py-4">
      <h3 className="text-info mb-3 text-center mb-2">Register</h3>
      <p className="error text-center">{authError || unknownError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            placeholder="First Name"
            className="form-control"
            name="firstName"
            ref={register({
              required: "First Name is required",
              pattern: {
                value: /[A-Za-z]{2}/,
                message:
                  "First Name must contain minimum 2 letter and only letter", // <p>error message</p>
              },
            })}
          />

          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
        </div> */}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Name"
            className="form-control"
            name="name"
            ref={register({
              required: "Name is required",
              pattern: {
                value: /[A-Za-z]{3}/,
                message: "Name must contain minimum 3 letter and only letter", // <p>error message</p>
              },
            })}
          />

          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
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
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <small className="text-dark">
            * Combine 8-15 Capital and small letter, special character and
            number
          </small>
          <input
            placeholder="Enter a password"
            type="password"
            className="form-control"
            name="password"
            ref={register({
              required: "Password required",
              pattern: {
                value: /^([a-zA-Z0-9@*#]{8,15})$/,
                message:
                  "Password must contain Small and capital letter, Number and any character. It should be 8-15 char long",
              },
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            placeholder="Confirm password"
            type="password"
            className="form-control"
            name="password_confirmation"
            ref={register({
              required: true,
              validate: (val) =>
                val === getValues("password") || "Password don't match",
            })}
          />

          {errors.password_confirmation && (
            <span className="error">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>

        {/* <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            placeholder="Phone Number"
            className="form-control"
            name="phoneNumber"
            ref={register({
              required: "Phone Number required",
              pattern: {
                value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                message: "Enter a valid Phone Number",
              },
            })}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input placeholder="City name" className="form-control" name="city" />
        </div> */}

        <input
          type="submit"
          className="btn btn-success float-right w-25"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Registration;
