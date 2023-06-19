import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useLocation } from "react-router-dom";
function Dashboard() {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setTitle(location.state.data.title);
    setDescription(location.state.data.description);
  }, [location.state]);

  return (
    <div className="main-dashboard-container">
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );
}

export default Dashboard;
