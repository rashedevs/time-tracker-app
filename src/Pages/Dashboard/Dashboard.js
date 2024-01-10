import React from "react";
import LiveCounters from "./LiveCounters/LiveCounters";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="container">
      <SideBar />
      <LiveCounters />
      <SideBar />
    </div>
  );
};

export default Dashboard;
