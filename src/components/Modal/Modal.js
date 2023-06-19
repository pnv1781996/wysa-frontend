import React from "react";
import "./Modal.scss";
function Modal({ onClose, onDateTimeSelect, target, defaultValue }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="datetimepicker">
          <input
            type="time"
            id="time"
            value={target === "" ? defaultValue : target}
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
