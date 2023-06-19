import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoundedTextField from "../../components/RoundedTextField/RoundedTextField";
import "./SignUp.scss";
import Button from "../../components/Button/Button";
import ToastMsg from "../../components/ToastMsg/ToastMsg";
import { get, post } from "../../API/http-common";
import { useStore } from "../../App";

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
    const signUpData = { name: nickname, password: password };
    // call api for the stored the sign up data
    try {
      const result = await post("user/signup", signUpData);
      showToast(result.data.message, false);
      redirectPage(nextPage);
    } catch (error) {
      showToast(error.response.data.message, true);
    }
  };

  // get the next page data of question and redirect to the question page
  const redirectPage = async (nextPage) => {
    let removeSlash = nextPage.replace("/", "");

    try {
      const result = await get("pages/nextPageRedirect", removeSlash);
      navigate("/" + result.data.screen, {
        state: {
          data: result.data.data,
        },
      });
    } catch (error) {
      showToast(error.message, true);
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
