import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1704836284500.json";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <Lottie animationData={animationData}></Lottie>
    </div>
  );
};

export default Loader;
