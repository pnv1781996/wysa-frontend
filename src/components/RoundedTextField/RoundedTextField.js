import React from "react";
import "./RoundedTextField.scss";
import { Field } from "formik";
const RoundedTextField = ({ onChange, placeHolder, type, name }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      onChange={onChange}
      className="normal-textfield"
    />
  );
};

export default RoundedTextField;
