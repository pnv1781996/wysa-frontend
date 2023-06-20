import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoundedTextField from "../../components/RoundedTextField/RoundedTextField";
import "./SignUp.scss";
import Button from "../../components/Button/Button";
import ToastMsg from "../../components/ToastMsg/ToastMsg";
import { get, post } from "../../API/http-common";
import { token, useStore } from "../../App";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, { message: "Name should have at least 3 characters" })
    .max(30, { message: "Name should have at most 30 characters" })
    .matches(/^[ A-Za-z0-9_:@./#&+-]*$/, {
      message:
        "Name should have only some letters, numbers and special symbol like (_:@./#&+-)",
    })
    .required("Required"),
  password: Yup.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .matches(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .matches(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .matches(/[0-9]/, { message: "Password must contain at least one digit" })
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
      message: "Password must contain at least one special character",
    }),
});

function SignUp() {
  // variable declarations
  const location = useLocation();
  const navigate = useNavigate();
  const { message, isError, showToast } = useStore();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  // get the path of current page
  const nextPage = location.pathname;

  // set the name value from the feild
  const handleInputChange = (event) => {
    setNickname(event.target.value);
  };

  // set the password value from the feild
  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  // on click button stored the data
  const handleButtonClick = async () => {
    debugger;
    const signUpData = { name: nickname, password: password };
    // call api for the stored the sign up data
    try {
      const result = await post("user/signup", signUpData);
      localStorage.setItem("token", result.data.token);
      showToast(result.data.message, false);
      redirectPage(nextPage);
    } catch (error) {
      showToast(error.response.data.message, true);
    }
  };

  // get the next page data of question and redirect to the question page
  const redirectPage = async (nextPage) => {
    debugger;
    let removeSlash = nextPage.replace("/", "");
    try {
      const result = await get("pages/nextPageRedirect", removeSlash, {
        headers: {
          "x-access-token": token,
        },
      });
      navigate("/" + result.data.screen, {
        state: {
          data: result.data.data,
        },
      });
    } catch (error) {
      showToast(error.message, true);
    }
  };
  // field validation
  useEffect(() => {
    let data = nickname;

    if (data.length < 3) {
      showToast("Name should have at least 3 characters", true);
    } else if (data.length > 30) {
      showToast("Name should have at most 30 characters", true);
    } else if (!/^[ A-Za-z0-9_:@./#&+-]*$/.test(data)) {
      showToast(
        "Name should have only letters, numbers, and special symbols like (_:@./#&+-)",
        true
      );
    } else if (/^\d+$/.test(data)) {
      showToast("Name should not contain only numeric characters", true);
    }
  }, [nickname]);
  useEffect(() => {
    let data = password;

    if (data.length < 8) {
      showToast("Password must be at least 8 characters long", true);
    } else if (!/[a-z]/.test(data)) {
      showToast("Name should have at most 30 characters", true);
    } else if (!/[A-Z]/.test(data)) {
      showToast(
        "Name should have only letters, numbers, and special symbols like (_:@./#&+-)",
        true
      );
    } else if (!/[0-9]/.test(data)) {
      showToast("Name should not contain only numeric characters", true);
    }
  }, [password]);

  // get the sign up data
  useEffect(() => {
    setTitle(location.state.data.title);
    setDescription(location.state.data.description);
  }, [location.state]);

  return (
    <div className="signup-container">
      <div className="center-content">
        <div className="signup-text">
          <span
            className="signup-heading"
            dangerouslySetInnerHTML={{
              __html: `${title?.replace(
                /(\w+)$/,
                '<span class="light-color">$1</span>'
              )}`,
            }}
          ></span>

          <p className="signup-subheading">{description}</p>
        </div>

        <div className="signup-form">
          <RoundedTextField
            type={"text"}
            onChange={handleInputChange}
            placeHolder={"Choose a nickname..."}
          />

          <RoundedTextField
            type={"password"}
            onChange={handlePasswordInputChange}
            placeHolder={"Enter password..."}
          />
        </div>
        <div className="submit-btn">
          {nickname && password ? (
            <Button onClickBtn={handleButtonClick} />
          ) : null}
        </div>
      </div>
      {isError && message && (
        <ToastMsg message={message} type={isError ? "error" : "success"} />
      )}
    </div>
  );
}

export default SignUp;
