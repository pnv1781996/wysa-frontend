import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoundedTextField from "../../Components/RoundedTextField/RoundedTextField";
import "./SignUp.scss";
import Button from "../../Components/Button/Button";

function SignUp() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setNickname(event.target.value);
  };
  const handleButtonClick = () => {
    navigate("/question");
  };

  return (
    <div className="signup-container">
      <div className="center-content">
        <div className="signup-text">
          <span className="signup-heading">
            Hey! I'm <span className="light-color">wysa</span>
          </span>
          <p className="signup-subheading">
            Our conversations are private & anonymous, so there is no login.
            Just choose nickname and we're good to go.
          </p>
        </div>
        <div className="signup-form">
          <RoundedTextField onChange={handleInputChange} />
          {nickname && (
            <Button positionButton="absolute" onClickBtn={handleButtonClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
