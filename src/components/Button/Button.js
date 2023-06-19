import React from "react";
import { FaArrowDown } from "react-icons/fa";
import "./Button.scss";
function Button({ positionButton, onClickBtn }) {
  return (
    <button
      disabled={true}
      className="submit-arrowBtn"
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
