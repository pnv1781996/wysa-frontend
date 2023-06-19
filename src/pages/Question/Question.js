import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCueCard from "../../components/QuestionCueCard/QuestionCueCard";
import "./Question.scss";
import {
  GetDataContext,
  GetDataDispatchContext,
} from "../../context/getDataContext";
import { get, post } from "../../API/http-common";
import ToastMsg from "../../components/ToastMsg/ToastMsg";

function Question() {
  const { queAnsData, showError, errorMessage, showSuccess, successMessage } =
    useContext(GetDataContext);

  const {
    setShowError,
    setErrorMessage,
    setShowSuccess,
    setSuccessMessage,
    setRedirectToSignup,
    setDashboardData,
  } = useContext(GetDataDispatchContext);

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
  const [activeDivRef, setActiveDivRef] = useState(useRef(null));

  const location = useLocation();
  const navigate = useNavigate();

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
        const secondData = queAnsData.cuecard2;
        setActiveCueCard(secondData);
        setActiveCueCardId(secondData.questionId);
        setTime(secondData.option.name);
        setQue2Id(secondData.questionId);
        break;
      case "question02":
        const thirdData = queAnsData.cuecard3;
        setActiveCueCard(thirdData);
        setActiveCueCardId(thirdData.questionId);
        setWakeUpTime(thirdData.option.name);
        setQue3Id(thirdData.questionId);

        break;
      case "question03":
        const fourthData = queAnsData.cuecard4;
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
          setSuccessMessage(result.data.message);
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
          redirectPage(nextPage);
        } catch (error) {
          setErrorMessage(error.response.data.message);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
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
      setDashboardData(result.data.data);
      setRedirectToSignup(result.data.screen);
      navigate("/" + result.data.screen);
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  // get the question page data from the api
  useEffect(() => {
    const firstData = queAnsData.cuecard1;
    setActiveCueCard(firstData);
    setActiveCueCardId(firstData.questionId);
  }, [queAnsData]);

  return (
    <>
      <div className="main-question-container" ref={activeDivRef}>
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
        {showError && <ToastMsg message={errorMessage} type="error" />}
        {showSuccess && <ToastMsg message={successMessage} type="success" />}
      </div>
    </>
  );
}

export default Question;
