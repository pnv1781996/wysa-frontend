import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoundedTextField from "../../components/RoundedTextField/RoundedTextField";
import "./SignUp.scss";
import Button from "../../components/Button/Button";
import ToastMsg from "../../components/ToastMsg/ToastMsg";
import {
  GetDataContext,
  GetDataDispatchContext,
} from "../../context/getDataContext";
import { get, post } from "../../API/http-common";

function SignUp() {
  // variable declarations
  const location = useLocation();
  const navigate = useNavigate();

  const { signupData, showError, errorMessage, showSuccess, successMessage } =
    useContext(GetDataContext);

  const {
    setShowError,
    setErrorMessage,
    setShowSuccess,
    setSuccessMessage,
    setRedirectToSignup,
    setQueAnsData,
  } = useContext(GetDataDispatchContext);

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
    // call api for the stored the sign up data
    try {
      const result = await post("user/signup", signUpData);
      setSuccessMessage(result.data.message);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      redirectPage(nextPage);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  // get the next page data of question and redirect to the question page
  const redirectPage = async (nextPage) => {
    let removeSlash = nextPage.replace("/", "");

    try {
      const result = await get("pages/nextPageRedirect", removeSlash);
      setQueAnsData(result.data.data);
      setRedirectToSignup(result.data.screen);
      navigate("/" + result.data.screen);
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  // get the sign up data
  useEffect(() => {
    setTitle(signupData.title);
    setDescription(signupData.description);
  }, [signupData]);

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
      {showError && <ToastMsg message={errorMessage} type="error" />}
      {showSuccess && <ToastMsg message={successMessage} type="success" />}
    </div>
  );
}

export default SignUp;
