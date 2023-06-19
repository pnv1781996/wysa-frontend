import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

function QuestionCueCard({
  onClick,
  question,
  optionList,
  option,
  submitForm,
  questionId,
  setTimeData,
  onChangeTime,
  hours,
  onChangeHour,
  optionTimeCard,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const handleModalClick = () => {
    setCount(count + 1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    let formattedTime = "";
    let period = "AM";

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        formattedTime = `${hours - 12}:${minutes}`;
      } else {
        formattedTime = `${hours}:${minutes}`;
      }
    } else {
      if (hours === "00") {
        formattedTime = `12:${minutes}`;
      } else {
        formattedTime = `${hours}:${minutes}`;
      }
    }

    return `${formattedTime} ${period}`;
  };
  const showTime = setTimeData === "" ? optionTimeCard.name : setTimeData;

  return (
    <>
      <div className="question">
        <h3>{question} </h3>
      </div>
      {questionId === "question01" && (
        <div className="question-option">
          {optionList?.map((eachOption, index) => {
            return (
              <div
                key={eachOption.optionId}
                className={`question-option${index + 1} ${
                  option === eachOption.name ? "selected" : ""
                }`}
                onClick={() => onClick(eachOption.name, questionId)}
              >
                {eachOption.name}
                {option === eachOption.name && <FaCheckCircle />}
              </div>
            );
          })}
        </div>
      )}
      {questionId === "question02" || questionId === "question03" ? (
        <div className="question-option">
          <div className="question-option1" onClick={handleModalClick}>
            {count === 0 ? "Select Time" : convertTo12HourFormat(showTime)}
            <FaChevronRight />
          </div>
        </div>
      ) : null}
      {questionId === "question04" && (
        <div className="question-option">
          <div className="question-option1">
            <select
              className="question-dropdown"
              onChange={onChangeHour}
              defaultValue={hours === "" ? optionList.name : hours}
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1} hrs
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="submit-btn">
        {option || count !== 0 || questionId === "question04" ? (
          <Button onClickBtn={submitForm} />
        ) : null}
      </div>
      {isModalOpen && (
        <Modal
          target={setTimeData}
          defaultValue={optionList.name}
          onClose={handleCloseModal}
          onDateTimeSelect={onChangeTime}
        />
      )}
    </>
  );
}

export default QuestionCueCard;
