import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../Button/Button";

function QuestionCueCard1({ onClick, option, submitForm }) {
  return (
    <>
      <div className="question">
        <h3>
          That's great goal. How long have you been struggling with your sleep?
        </h3>
      </div>
      <div className="question-option">
        <div
          className={`question-option1 ${
            option === "option1" ? "selected" : ""
          }`}
          onClick={() => onClick("option1")}
        >
          Less than 2 week {option === "option1" && <FaCheckCircle />}
        </div>
        <div
          className={`question-option2 ${
            option === "option2" ? "selected" : ""
          }`}
          onClick={() => onClick("option2")}
        >
          2 to 8 weeks
          {option === "option2" && <FaCheckCircle />}{" "}
        </div>
        <div
          className={`question-option3 ${
            option === "option3" ? "selected" : ""
          }`}
          onClick={() => onClick("option3")}
        >
          More than 8 weeks
          {option === "option3" && <FaCheckCircle />}
        </div>
      </div>
      <div className="submit-btn">
        {option ? <Button onClickBtn={submitForm} /> : null}
      </div>
    </>
  );
}

export default QuestionCueCard1;
