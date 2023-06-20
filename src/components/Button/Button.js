import React from "react";
import { FaArrowDown } from "react-icons/fa";
import "./Button.scss";
function Button({ positionButton, onClickBtn }) {
  return (
    <button
      className="submit-arrowBtn"
      type="submit"
      onClick={onClickBtn}
      style={{
        position: positionButton === "absolute" ? "absolute" : null,
        right: positionButton === "absolute" ? 0 : null,
      }}
    >
      <FaArrowDown />
    </button>
  );
}

export default Button;
