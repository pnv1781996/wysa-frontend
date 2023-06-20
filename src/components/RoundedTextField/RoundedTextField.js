import React from "react";
import "./RoundedTextField.scss";
const RoundedTextField = ({ onChange, placeHolder, type, name, onBlur }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeHolder}
      onChange={onChange}
      className="normal-textfield"
      onBlur={onBlur}
    />
  );
};

export default RoundedTextField;
