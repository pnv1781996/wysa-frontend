import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../API/http-common";
import ToastMsg from "../../components/ToastMsg/ToastMsg";
import { useStore } from "../../App";

function LandingPage() {
  const navigate = useNavigate();

  const { message, isError, showToast } = useStore();
  useEffect(() => {
    const abortController = new AbortController();

    // call initial page and store the data of page
    const fetchData = async () => {
      try {
        const result = await get("pages/nextPageRedirect", null, {
          signal: abortController.signal,
        });

        navigate("/" + result.data.screen, {
          state: {
            data: result.data.data,
          },
        });
      } catch (error) {
        // only call dispatch when we know the fetch was not aborted
        if (!abortController.signal.aborted) {
          showToast(error.message, true);
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {isError && message && (
        <ToastMsg message={message} type={isError ? "error" : "success"} />
      )}
    </div>
  );
}

export default LandingPage;
