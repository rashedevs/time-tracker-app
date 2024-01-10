import React, { useState, useEffect, useRef } from "react";
import "./LiveCounters.css";

const LiveCounters = () => {
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);
  const [frontGradient, setFrontGradient] = useState(getRandomGradient());
  const [backGradient, setBackGradient] = useState(getRandomGradient());
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalHoursWorked((prevTotal) => prevTotal + 3);

      setFrontGradient(getRandomGradient());
      setBackGradient(getRandomGradient());
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered) {
        const { clientX, clientY } = e;
        const { left, top, width, height } =
          cardRef.current.getBoundingClientRect();

        if (
          clientX >= left &&
          clientX <= left + width &&
          clientY >= top &&
          clientY <= top + height
        ) {
          const x = ((clientY - top - height / 2) / height) * 30;
          const y = ((clientX - left - width / 2) / width) * 30;

          setRotation({ y, x });
        }
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      setRotation({ x: 0, y: 0 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    cardRef.current.addEventListener("mouseenter", handleMouseEnter);
    cardRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
      // eslint-disable-next-line
      cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  function getRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    return `linear-gradient(45deg, ${color1}, ${color2})`;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const transformStyle = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

  return (
    <div className="live-counters-card" ref={cardRef}>
      <div
        className="live-counters-card-inner"
        style={{ transform: transformStyle }}
      >
        <div
          className="live-counters-card-face front"
          style={{ background: frontGradient }}
        >
          <h2>Total Hours Worked</h2>
          <p>{totalHoursWorked} Second</p>
        </div>
        <div
          className="live-counters-card-face back"
          style={{ background: backGradient }}
        >
          <p>Additional Information or Controls</p>
        </div>
      </div>
    </div>
  );
};

export default LiveCounters;
