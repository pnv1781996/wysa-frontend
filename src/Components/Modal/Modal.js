import React from "react";
import "./Modal.scss";
function Modal({ onClose, totalTime, onDateTimeSelect, target }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="datetimepicker">
          <input
            type="time"
            id="time"
            value={target === "sleepTime" ? "00:00" : "07:00"}
            onChange={onDateTimeSelect}
          />
        </div>
        <div className="modal-btns">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
