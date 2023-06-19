import React, { createContext, useState } from "react";
// import { socket } from "../Socket/SocketContext";

const GetDataContext = createContext(undefined);
const GetDataDispatchContext = createContext(undefined);

function GetDataProvider({ children }) {
  //  error message set to tost message component
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // success message set to tost message component
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // redirect page name
  const [redirectToSignup, setRedirectToSignup] = useState("false");
  // stored signup page data
  const [signupData, setSignUpData] = useState();
  // stored quesion page data
  const [queAnsData, setQueAnsData] = useState({});
  // stored dashboard page data
  const [dashboardData, setDashboardData] = useState();
  return (
    <GetDataContext.Provider
      value={{
        redirectToSignup,
        signupData,
        showError,
        errorMessage,
        successMessage,
        showSuccess,
        queAnsData,
        dashboardData,
      }}
    >
      <GetDataDispatchContext.Provider
        value={{
          setRedirectToSignup,
          setSignUpData,
          setShowError,
          setErrorMessage,
          setShowSuccess,
          setSuccessMessage,
          setQueAnsData,
          setDashboardData,
        }}
      >
        {children}
      </GetDataDispatchContext.Provider>
    </GetDataContext.Provider>
  );
}

export { GetDataProvider, GetDataContext, GetDataDispatchContext };
