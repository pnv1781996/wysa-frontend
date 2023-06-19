import React from "react";
import "./ToastMsg.scss";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function ToastMsg({ message, type }) {
  return (
    <div
      className={`msg-container ${type === "success" ? "success" : "error"}`}
    >
      <span className="msg">
        {type === "success" ? (
          <span className="msg-icon">
            <FaCheckCircle />
          </span>
        ) : (
          <span className="msg-icon">
            <FaTimesCircle />
          </span>
        )}
        <span className="msg-text">{message}</span>
      </span>
    </div>
  );
}

export default ToastMsg;
