import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoundedTextField from "../../components/RoundedTextField/RoundedTextField";
import "./SignUp.scss";
import Button from "../../components/Button/Button";
import ToastMsg from "../../components/ToastMsg/ToastMsg";
import { get, post } from "../../API/http-common";
import { useAuth, useStore } from "../../App";
import { z } from "zod";

const nameSchema = z
  .string()
  .min(3, { message: "Name should have at least 3 characters" })
  .max(30, { message: "Name should have at most 30 characters" })
  .regex(/^[ A-Za-z0-9_:@./#&+-]*$/, {
    message:
      "Name should have only some letters, numbers and special symbol like (_:@./#&+-)",
  });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
    {
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character",
    }
  );

function SignUp() {
  // variable declarations
  const location = useLocation();
  const navigate = useNavigate();
  const { message, isError, showToast } = useStore();
  const { token, setToken } = useAuth();

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
    const signUpData = { name: nickname, password: password };
    try {
      const result = await post("user/signup", signUpData);
      setToken(result.data.token);
      showToast(result.data.message, false);
    } catch (error) {
      showToast(error.response.data.message, true);
    }
  };

  // when token is set in setToke after that call redirect page function
  useEffect(() => {
    if (token) {
      redirectPage(nextPage);
    }
  }, [token]);

  // get the next page data of question and redirect to the question page
  const redirectPage = async (nextPage) => {
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
  const validateNameData = async () => {
    try {
      await nameSchema.parse(nickname);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          showToast(err.message, true);
        });
      } else {
        showToast(error, true);
      }
    }
  };
  const validatePasswordData = async () => {
    try {
      await passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          showToast(err.message, true);
        });
      } else {
        showToast(error, true);
      }
    }
  };
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
            name={"name"}
            placeHolder={"Choose a nickname..."}
            onBlur={validateNameData}
          />

          <RoundedTextField
            type={"password"}
            onChange={handlePasswordInputChange}
            placeHolder={"Enter password..."}
            name={"password"}
            onBlur={validatePasswordData}
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
