import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCueCard from "../../components/QuestionCueCard/QuestionCueCard";
import "./Question.scss";
import { get, post } from "../../API/http-common";
import ToastMsg from "../../components/ToastMsg/ToastMsg";
import { useStore } from "../../App";

function Question() {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, isError, showToast } = useStore();

  // state declaration for question cue card 1
  const [activeCueCard, setActiveCueCard] = useState();
  const [activeCueCardId, setActiveCueCardId] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [que1Id, setQueId] = useState();
  const [time, setTime] = useState();
  const [que2Id, setQue2Id] = useState();
  const [wakeUpTime, setWakeUpTime] = useState();
  const [que3Id, setQue3Id] = useState();
  const [totalHours, setTotalHours] = useState("");
  const [que4Id, setQue4Id] = useState();

  // get the path of current page
  const nextPage = location.pathname;

  // set the selected option from question cue card 1
  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    setQueId(id);
  };
  // set the time from question cue card 2
  const handleTimeChange = (event, id) => {
    setTime(event.target.value);
    setQue2Id(id);
  };
  // set the wakeup time from question cue card 3
  const handleWakeUpTimeChange = (event, id) => {
    setWakeUpTime(event.target.value);
    setQue3Id(id);
  };
  // set the total sleep hour from question cue card 4
  const handleHourChange = (event, id) => {
    setTotalHours(event.target.value);
    setQue4Id(id);
  };

  // submit cue card according show mext que card
  const handleSubmitForm = async (id) => {
    switch (id) {
      case "question01":
        const secondData = location.state.data.cuecard2;
        setActiveCueCard(secondData);
        setActiveCueCardId(secondData.questionId);
        setTime(secondData.option.name);
        setQue2Id(secondData.questionId);
        break;
      case "question02":
        const thirdData = location.state.data.cuecard3;
        setActiveCueCard(thirdData);
        setActiveCueCardId(thirdData.questionId);
        setWakeUpTime(thirdData.option.name);
        setQue3Id(thirdData.questionId);

        break;
      case "question03":
        const fourthData = location.state.data.cuecard4;
        setActiveCueCard(fourthData);
        setActiveCueCardId(fourthData.questionId);
        setTotalHours(fourthData.option.name);
        setQue4Id(fourthData.questionId);
        break;

      case "question04":
        const assessmentData = [
          {
            id: que1Id,
            option: selectedOption,
          },
          {
            id: que2Id,
            option: time,
          },
          {
            id: que3Id,
            option: wakeUpTime,
          },
          {
            id: que4Id,
            option: totalHours,
          },
        ];
        // call api for the stored the question page data

        try {
          const result = await post("submit/assessment", assessmentData);
          showToast(result.data.message, false);
          redirectPage(nextPage);
        } catch (error) {
          showToast(error.response.data.message, true);
        }
        break;

      default:
        break;
    }
  };

  // get the next page data of dashboard and redirect to the dashboard page
  const redirectPage = async (nextPage) => {
    let removeSlash = nextPage.replace("/", "");
    try {
      const result = await get("pages/nextPageRedirect", removeSlash);
      navigate("/" + result.data.screen, {
        state: {
          data: result.data.data,
        },
      });
    } catch (error) {
      showToast(error.message, true);
    }
  };

  // get the question page data from the api
  useEffect(() => {
    const firstData = location.state.data.cuecard1;
    setActiveCueCard(firstData);
    setActiveCueCardId(firstData.questionId);
  }, [location.state]);

  return (
    <>
      <div className="main-question-container">
        {activeCueCardId === "question01" && (
          <QuestionCueCard
            questionId={activeCueCardId}
            question={activeCueCard.title}
            optionList={activeCueCard.option}
            onClick={handleOptionClick}
            option={selectedOption}
            submitForm={() => handleSubmitForm(activeCueCardId)}
          />
        )}
        {activeCueCardId === "question02" && (
          <QuestionCueCard
            questionId={activeCueCardId}
            question={activeCueCard.title}
            optionList={activeCueCard.option}
            setTimeData={time}
            onChangeTime={(e) => handleTimeChange(e, activeCueCardId)}
            submitForm={() => handleSubmitForm(activeCueCardId)}
          />
        )}
        {activeCueCardId === "question03" && (
          <QuestionCueCard
            questionId={activeCueCardId}
            question={activeCueCard.title}
            optionList={activeCueCard.option}
            setTimeData={wakeUpTime}
            onChangeTime={(e) => handleWakeUpTimeChange(e, activeCueCardId)}
            submitForm={() => handleSubmitForm(activeCueCardId)}
          />
        )}
        {activeCueCardId === "question04" && (
          <QuestionCueCard
            questionId={activeCueCardId}
            question={activeCueCard.title}
            optionList={activeCueCard.option}
            hours={totalHours}
            onChangeHour={(e) => handleHourChange(e, activeCueCardId)}
            submitForm={() => handleSubmitForm(activeCueCardId)}
          />
        )}
        {isError && message && (
          <ToastMsg message={message} type={isError ? "error" : "success"} />
        )}
      </div>
    </>
  );
}

export default Question;
