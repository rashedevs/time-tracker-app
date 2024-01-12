import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Modal from "react-modal";
import { IoPersonCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRegStopCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineNotStarted } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../Form";
import Field from "../Field";
import { getAuth } from "firebase/auth";
import { useTimer } from "react-timer-hook";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";
import { app } from "../../../firebase.init";
import Chart from "../Chart/Chart";
import PieChart from "../Chart/PieChart";

const auth = getAuth();

// Little helpers ...
const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const Card = ({ openModal1, isModal1Open, closeModal1, modal1Content }) => (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "150px",
        padding: "20px",
        margin: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      <h5>New Project</h5>
      <FaPlus
        onClick={openModal1}
        size="22px"
        color="green"
        style={{ marginLeft: "10px" }}
      />
    </div>
    {/* Modal */}
  </>
);

const Timer = ({ expiryTimestamp, onExpire, onTimerClick }) => {
  const { hours, seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire: () => {
        onExpire();
      },
    });

  return (
    <div
      className="clock"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {/* <h3>{`${"H"} : ${"M"} : ${"S"} `}</h3>
        <h3> {`    |    `} </h3> */}
        <h2>{` ${hours} : ${minutes} : ${seconds}`}</h2>
      </div>
      <div>
        {isRunning ? (
          <FaRegPauseCircle size="30px" color="yellow" onClick={pause} />
        ) : (
          <MdOutlineNotStarted size="30px" color="green" onClick={resume} />
        )}
        <FaRegStopCircle
          size="30px"
          color="red"
          onClick={restart}
          style={{ marginLeft: "30px" }}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({
  isRunning,
  title,
  id,
  notes,
  onCardClick,
  onTimerClick,
  project,
  timer,
  hours,
  deleteProject,
  openModal,
  onEditClick,
}) => {
  const [timerExpiry] = useState(Date.now() + hours * 60 * 60 * 1000);
  const MAX_NOTE_LENGTH = 20;
  const truncatedNotes =
    notes.length > MAX_NOTE_LENGTH
      ? `${notes.slice(0, MAX_NOTE_LENGTH)}...`
      : notes;
  const handleTimerExpire = () => {
    alert("Project Time expired!");
  };
  const [status, setStatus] = useState(false);
  const handlClick = (id) => {
    // onTimerClick(id);
    if (status === true && isRunning) {
      onTimerClick(id);
      setStatus(!status);
    } else {
      setStatus(!status);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "280px",
        maxWidth: "300px",
        padding: "20px",
        margin: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evely",
        }}
      >
        <h3>{title}</h3>
        {!status ? (
          <MdOutlineNotStarted
            size="35px"
            color="green"
            // onClick={onTimerClick}
            onClick={() => handlClick(id)}
            style={{ marginLeft: "40px" }}
          />
        ) : (
          <IoChevronBackCircleOutline
            size="35px"
            color="purple"
            // onClick={onTimerClick}
            onClick={() => handlClick(id)}
            style={{ marginLeft: "40px" }}
          />
        )}
      </div>

      {!isRunning && !status ? (
        <>
          <p>{truncatedNotes}</p>
          <div>
            <FaEdit
              size="20px"
              onClick={() => onEditClick(project)}
              color="#FFA41B"
              style={{ margin: "10px" }}
            />
            <MdDelete
              onClick={() => deleteProject(id)}
              size="22px"
              color="red"
              style={{ margin: "10px" }}
            />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Timer
              expiryTimestamp={timerExpiry}
              onExpire={handleTimerExpire}
              onTimerClick={onTimerClick}
              isRunning={isRunning}
            />
          </div>
        </>
      )}
    </div>
  );
};
const headStyle = {
  position: "sticky",
  top: 0,
  right: 0,
  height: "7vh",
  backgroundColor: "#365486",
  color: "#fff",
  padding: "5px 1.7rem",
  overflow: "hidden",
  transition: "all 0.5s linear",
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  alignItems: "center",
};

const styles = {
  projects: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
};
const ProjectModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "10px",
          maxWidth: "600px",
          maxHeight: "500px",
          width: "100%",
          height: "100%",
          textAlign: "center",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div style={{ marginLeft: "500px", marginTop: "20px" }}>
        <IoIosCloseCircleOutline onClick={onClose} size="30px" color="red" />
      </div>
      <Form onClose={onClose} />
    </Modal>
  );
};
const NewModal = ({ isOpen, onClose, project, projectId }) => {
  console.log("Project data in NewModal:", project);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "10px",
          maxWidth: "600px",
          maxHeight: "500px",
          width: "100%",
          height: "100%",
          textAlign: "center",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div style={{ marginLeft: "500px", marginTop: "20px" }}>
        <IoIosCloseCircleOutline onClick={onClose} size="30px" color="red" />
      </div>
      <Field onClose={onClose} project={project} projectId={projectId} />
    </Modal>
  );
};

export default function ProjectManagement() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const database = getDatabase(app);
  //   const dataRef = ref(database, "/projects");

  //   const unsubscribe = onValue(dataRef, (snapshot) => {
  //     const newData = snapshot.val();
  //     setData(newData);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const database = getDatabase(app);
    const dataRef = ref(database, "/projects");

    const userEmail = auth.currentUser ? auth.currentUser.email : null;

    if (userEmail) {
      // If user is logged in, filter projects by user's email
      const userProjectsRef = query(
        dataRef,
        orderByChild("user"),
        equalTo(userEmail)
      );

      const unsubscribe = onValue(userProjectsRef, (snapshot) => {
        const newData = snapshot.val();
        setData(newData);
      });

      return () => unsubscribe();
    } else {
      // If user is not logged in, fetch all projects
      const unsubscribe = onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();
        setData(newData);
      });

      return () => unsubscribe();
    }
  }, [auth?.currentUser]);

  const deleteProject = (id) => {
    const database = getDatabase(app);
    const projectRef = ref(database, `projects/${id}`);

    remove(projectRef)
      .then(() => {
        toast.success("Project deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error("Error deleting project.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const parallax = useRef(null);
  const [isModal1Open, setModal1Open] = useState(false);
  const [modal1Content, setModal1Content] = useState("");

  const openModal1 = () => {
    setModal1Content("This is a modal with simple text.");
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditClick = (id, project) => {
    setSelectedProject({ id, ...project });
    setEditModalOpen(true);
  };

  const [timerStates, setTimerStates] = useState({});

  // ...

  const handleTimerClick = (id) => {
    setTimerStates((prevStates) => {
      const isRunning = !prevStates[id] || !prevStates[id].isRunning;

      // Assuming you have an object structure to track timer states
      return {
        ...prevStates,
        [id]: {
          isRunning,
        },
      };
    });
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "#253237" }}>
      <div style={headStyle}>
        <h4 style={{ color: "#FFA41B" }}>
          {auth?.currentUser ? auth.currentUser?.email : "User"}
        </h4>
        <IoPersonCircle
          size="2rem"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
      </div>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={0}
          speed={1}
          style={{ backgroundColor: "#bdeeed" }}
        />

        <ParallaxLayer
          offset={1}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        />

        <ParallaxLayer
          offset={1.3}
          speed={-0.3}
          style={{
            pointerEvents: "none",
            backgroundColor: "#bdeeed",
          }}
        >
          <img
            src={url("satellite4")}
            alt=""
            style={{ width: "15%", marginLeft: "70%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "25%", marginLeft: "30%" }}
          />
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            src={url("cloud")}
            alt=""
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img src={url("earth")} style={{ width: "60%" }} alt="" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.1}>
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "30px",
              left: "20%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card openModal1={openModal1} />
            </div>
            <div
              style={
                styles.projects
                //   {
                //   display: "grid",
                //   gridColumn:'repeat',
                //   // flexWrap: "wrap",
                //   justifyContent: "space-around",
                //   margin: "0 -10px",
                // }
              }
            >
              {data ? (
                Object.entries(data)
                  .reverse()
                  .map(([id, project]) => (
                    <ProjectCard
                      key={id}
                      id={id}
                      {...project}
                      // onCardClick={() => openModal(project)}
                      onTimerClick={handleTimerClick}
                      timer={timerStates[id]}
                      deleteProject={deleteProject}
                      onEditClick={() => handleEditClick(id, project)}
                      isRunning={timerStates[id] && timerStates[id].isRunning}
                    />
                  ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    padding: "20px",
                    margin: "20px",
                    background: "#332941",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4>No Projects Available. Please create one!</h4>
                </div>
              )}
            </div>
          </div>
          <img
            src={url("satellite3")}
            style={{ width: "90%", color: "blue" }}
            alt=""
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.1}>
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              background: "#F3F8FF",
              left: "3%",
              top: "10%",
              width: "80%",
              height: "400px",
              marginBottom: "20px",
              // marginLeft: "30px",
              border: "1px solid #F3F8FF",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {data ? (
              <Chart projects={Object.entries(data)} />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  padding: "20px",
                  margin: "20px",
                  background: "#332941",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4>No Bar Data Available!</h4>
              </div>
            )}
          </div>
          <img src={url("satellite")} style={{ width: "40%" }} alt="" />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              background: "#F3F8FF",
              left: "50%",
              width: "80%",
              height: "400px",
              marginBottom: "20px",
              marginLeft: "30px",
              border: "1px solid #F3F8FF",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {data ? (
              <PieChart projects={Object.entries(data)} />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  padding: "20px",
                  margin: "20px",
                  background: "#332941",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4>No Pie Data Available!</h4>
              </div>
            )}
          </div>
          <img src={url("satellite2")} style={{ width: "40%" }} alt="" />
        </ParallaxLayer>

        <ProjectModal
          isOpen={isModal1Open}
          onClose={closeModal1}
          modalContent={modal1Content}
        />
        {/* <NewModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          project={selectedProject}
        /> */}
        <NewModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          project={selectedProject}
          projectId={selectedProject ? selectedProject.id : null}
        />
      </Parallax>
      <ToastContainer />
    </div>
  );
}
