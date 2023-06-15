import React from "react";
import "./RoundedTextField.scss";
const RoundedTextField = ({ onChange }) => {
  return (
    <input
      type="text"
      className="normal-textfield"
      placeholder="Choose a nickname..."
      onChange={onChange}
    />
  );
};

export default RoundedTextField;
