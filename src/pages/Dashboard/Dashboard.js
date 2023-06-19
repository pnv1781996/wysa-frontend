import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.scss";
import { GetDataContext } from "../../context/getDataContext";
function Dashboard() {
  const { dashboardData } = useContext(GetDataContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setTitle(dashboardData.title);
    setDescription(dashboardData.description);
  }, [dashboardData]);

  return (
    <div className="main-dashboard-container">
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );
}

export default Dashboard;
