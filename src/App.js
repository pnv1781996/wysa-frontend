import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import "../src/style/style.scss";
import Question from "./pages/Question/Question";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";

import { create } from "zustand";

export const useStore = create((set) => ({
  message: "",
  isError: false,
  showToast: (newMessage, isError = false) => {
    set((state) => ({ message: newMessage, isError }));
    setTimeout(() => {
      set((state) => ({ message: "", isError: false }));
    }, 3000);
  },
}));

export const token = localStorage.getItem("token");

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/question" element={<Question />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
