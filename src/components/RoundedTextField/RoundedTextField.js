import React from "react";
import "./RoundedTextField.scss";
const RoundedTextField = ({ onChange, placeHolder, type }) => {
  return (
    <input
      type={type}
      className="normal-textfield"
      placeholder={placeHolder}
      onChange={onChange}
    />
  );
};

export default RoundedTextField;
