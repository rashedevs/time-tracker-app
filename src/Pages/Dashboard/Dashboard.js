import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";
import ProjectManagement from "./Projects/ProjectManagement";

const Dashboard = () => {
  return (
    <div className="container">
      <SideBar />
      {/* <LiveCounters /> */}
      <ProjectManagement />
    </div>
  );
};

export default Dashboard;
