import React from "react";
import Button from "../Button/Button";

function QuestionCueCard3({ heading, hours, onChangeHour, submitForm }) {
  return (
    <>
      <div className="question">
        <h3>{heading}</h3>
      </div>
      <div className="question-option">
        <div className="question-option1">
          <select
            className="question-dropdown"
            onChange={onChangeHour}
            defaultValue={hours}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} hrs
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="submit-btn">
        <Button onClickBtn={submitForm} />
      </div>
    </>
  );
}

export default QuestionCueCard3;
