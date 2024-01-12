import React from "react";
import "./SideBar.css";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const auth = getAuth();
  const history = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      history("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="sidebar">
      <div className="avatar" style={{ height: "50px" }}></div>
      <ul className="menu">
        <li className="active">
          <a href="#">
            <MdDashboardCustomize />
            <span style={{ margin: "0 5px" }}>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <FaChartLine />
            <span>Charts</span>
          </a>
        </li>
        {/* <li>
          <a href="#">
            <FaTasks />
            <span>Task Notes</span>
          </a>
        </li> */}
        {/* <li>
          <a href="#">
            <IoSettingsOutline />
            <span>Settings</span>
          </a>
        </li> */}
        <li>
          <a href="#" onClick={handleLogout}>
            <RiLogoutCircleRLine />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
