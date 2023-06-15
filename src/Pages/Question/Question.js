import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCueCard1 from "../../Components/QuestionCueCard/QuestionCueCard1";
import QuestionCueCard2 from "../../Components/QuestionCueCard/QuestionCueCard2";
import QuestionCueCard3 from "../../Components/QuestionCueCard/QuestionCueCard3";
import "./Question.scss";
function Question() {
  // state declaration for question cue card 1
  const [selectedOption, setSelectedOption] = useState(null);
  const [cueCard1, setCueCard1] = useState(true);
  const [cueCard2, setCueCard2] = useState(false);
  const [cueCard3, setCueCard3] = useState(false);
  const [cueCard4, setCueCard4] = useState(false);
  const navigate = useNavigate();

  // set the selected option from question cue card 1
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // when submit question cue card 1 then hide the question cue card 1 and 3 and show question cue card 2
  const handleSumitForm1 = () => {
    setCueCard2(true);
    setCueCard1(false);
  };

  // state decalration for question cue card 2
  const [time, setTime] = useState("00:00");
  const [wakeUpTime, setWakeUpTime] = useState("07:00");

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleWakeUpTimeChange = (event) => {
    setWakeUpTime(event.target.value);
  };

  // when submit question cue card 1 then hide the question cue card 1 and 3 and show question cue card 2
  const handleSumitForm2 = () => {
    setTime("");
    setCueCard3(true);
    setCueCard1(false);
    setCueCard2(false);
  };
  // when submit question cue card 1 then hide the question cue card 1 and 3 and show question cue card 2
  const handleSumitForm3 = () => {
    setTime("");
    setCueCard3(false);
    setCueCard1(false);
    setCueCard2(false);
    setCueCard4(true);
  };

  // state decalration for question cue card 2
  const [totalHours, setTotalHours] = useState("8");
  const handleHourChange = (event) => {
    setTotalHours(event.target.value);
  };

  const handleSubmitForm4 = () => {
    navigate("/dashboard");
  };
  return (
    <div className="main-question-container">
      {cueCard1 && (
        <QuestionCueCard1
          onClick={handleOptionClick}
          option={selectedOption}
          submitForm={handleSumitForm1}
        />
      )}
      {cueCard2 && (
        <QuestionCueCard2
          heading={"What time do you go to bed for sleep?"}
          setTime={time}
          target={"sleepTime"}
          onChangeTime={handleTimeChange}
          submitForm={handleSumitForm2}
        />
      )}
      {cueCard3 && (
        <QuestionCueCard2
          heading={"What time do you get out of bed to start your day?"}
          setTime={wakeUpTime}
          onChangeTime={handleWakeUpTimeChange}
          submitForm={handleSumitForm3}
        />
      )}
      {cueCard4 && (
        <QuestionCueCard3
          heading={"Ok.How many hours sleep do you get in a typical nigth?"}
          hours={totalHours}
          onChangeHour={handleHourChange}
          submitForm={handleSubmitForm4}
        />
      )}
    </div>
  );
}

export default Question;
