import React from "react";
import "./SideBar.css";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

const SideBar = () => {
  // const styles = {
  //   display: "flex",
  //   alignItem: "center",
  //   justifyContent: "center",
  //   padding: "5px",
  //   height: "20px",
  //   // backgroundColor: "blue",
  // };
  return (
    <div className="sidebar">
      <div className="avatar"></div>
      <ul className="menu">
        <li className="active">
          <a href="#">
            <MdDashboardCustomize
            // style={{ height: "20px", margin: "2px 0 0 0" }}
            />
            <span style={{ margin: "0 5px" }}>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <IoMdTime />
            <span>Time Track</span>
          </a>
        </li>
        {/* <li>
          <a href="#">
            <FaTasks
            // style={{ width: "15px", margin: "2px 5px 0 0" }}
            />
            <span>Task Notes</span>
          </a>
        </li> */}
        <li>
          <a href="#">
            <IoSettingsOutline
            // style={{ width: "15px", margin: "4px 5px 0 0" }}
            />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <a href="#">
            <RiLogoutCircleRLine />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
