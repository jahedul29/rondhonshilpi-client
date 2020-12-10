import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import apiClient from "../../../../coreServices/apiClient";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const location = useLocation();
  const [responseMessage, setResponseMessage] = useState("");
  const [toHome, setToHome] = useState(false);
  const { token, email } = queryString.parse(location.search);
  let history = useHistory();

  const { register, handleSubmit, getValues, errors } = useForm();
  const onSubmit = (data) => {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/reset-password", {
          token: token,
          email: email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        })
        .then((response) => {
          if (response.status === 200) {
            setToHome(true);
            history.push("/login");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setResponseMessage(error.response.data.errors.message[0]);
          }
        });
    });
  };

  useEffect(() => {
    document.title = "RondhonShilpi-ResetPassword";
  }, []);

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="outerContainer d-flex justify-content-center align-items-center">
      <div className="innerContainer text-left">
        <h4>Enter your new password</h4>
        <br />
        <p className="error text-center">{responseMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <br />

            <input
              placeholder="Enter new password"
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
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              placeholder="Confirm new password"
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
          <input
            type="submit"
            className="btn btn-success float-right w-25"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
