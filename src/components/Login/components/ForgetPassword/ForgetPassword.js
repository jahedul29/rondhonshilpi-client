import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../../coreServices/apiClient";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setIsSubmitted(true);

    apiClient
      .post("/forget-password", { email: data.email })
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitted(true);
        }
      });
  };

  return (
    <div className="outerContainer d-flex justify-content-center align-items-center">
      <div className="innerContainer">
        {isSubmitted ? (
          <p>Please check your email.</p>
        ) : (
          <>
            <p>Please enter your email to reset your password</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
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
              <br />
              <input
                className="btn btn-success"
                type="submit"
                value="Confirm"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
