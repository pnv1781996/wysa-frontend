import React, { useContext, useEffect } from "react";
import {
  GetDataContext,
  GetDataDispatchContext,
} from "../../context/getDataContext";
import { useNavigate } from "react-router-dom";
import { get } from "../../API/http-common";
import ToastMsg from "../../components/ToastMsg/ToastMsg";

function LandingPage() {
  const { showError, errorMessage } = useContext(GetDataContext);
  const { setSignUpData, setShowError, setRedirectToSignup, setErrorMessage } =
    useContext(GetDataDispatchContext);
  const navigate = useNavigate();
  useEffect(() => {
    const abortController = new AbortController();

    // call initial page and store the data of page
    const fetchData = async () => {
      try {
        const result = await get("pages/nextPageRedirect", null, {
          signal: abortController.signal,
        });
        setSignUpData(result.data.data);
        setRedirectToSignup(result.data.screen);
        navigate("/" + result.data.screen);
      } catch (error) {
        // only call dispatch when we know the fetch was not aborted
        if (!abortController.signal.aborted) {
          setErrorMessage(error.message);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div> {showError && <ToastMsg message={errorMessage} type="error" />}</div>
  );
}

export default LandingPage;
