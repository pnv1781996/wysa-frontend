import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

function QuestionCueCard2({
  heading,
  setTime,
  onChangeTime,
  submitForm,
  target,
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

  const formattedTime = convertTo12HourFormat(setTime);

  return (
    <>
      <div className="question">
        <h3>{heading}</h3>
      </div>
      <div className="question-option">
        <div className="question-option1" onClick={handleModalClick}>
          {count === 0 ? "Select Time" : formattedTime}
          <FaChevronRight />
        </div>
      </div>
      <div className="submit-btn">
        {count !== 0 ? <Button onClickBtn={submitForm} /> : null}
      </div>
      {isModalOpen && (
        <Modal
          target={target}
          totalTime={setTime}
          onClose={handleCloseModal}
          onDateTimeSelect={onChangeTime}
        />
      )}
    </>
  );
}

export default QuestionCueCard2;
