import React from "react";
import "./SideBar.css";
import { MdDashboardCustomize } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const auth = getAuth();
  const history = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      toast.success("Logut successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history("/");
    } catch (error) {
      toast.error("Error Logging out.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
          <a
            href="#"
            onClick={() => {
              toast.success("Scroll below to explore charts!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }}
          >
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
      <ToastContainer />
    </div>
  );
};

export default SideBar;
