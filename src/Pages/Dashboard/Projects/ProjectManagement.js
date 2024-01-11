import React, { useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Modal from "react-modal";
import { IoPersonCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { RxResume } from "react-icons/rx";
import { FaRegStopCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineNotStarted } from "react-icons/md";
import Form from "../Form";
import { getAuth } from "firebase/auth";

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

const TimerCard = ({ title, description }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "350px",
      padding: "20px",
      margin: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    }}
  >
    <h5>{title ? title : "Timer Graph"}</h5>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FaRegPauseCircle
        size="22px"
        color="yellow"
        style={{ margin: "0 10px" }}
      />
      <RxResume size="22px" color="green" style={{ margin: "0 10px" }} />
      <FaRegStopCircle size="22px" color="red" style={{ margin: "0 10px" }} />
    </div>
  </div>
);
const ProjectCard = ({
  title,
  description,
  onCardClick,
  onTimerClick,
  timer,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "300px",
      padding: "20px",
      margin: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    }}
    // onClick={onCardClick}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evely",
      }}
    >
      <h3>{timer ? title : "Timer"}</h3>
      {timer ? (
        <MdOutlineNotStarted
          size="35px"
          color="green"
          onClick={onTimerClick}
          style={{ marginLeft: "40px" }}
        />
      ) : (
        <FaRegStopCircle
          size="35px"
          color="red"
          onClick={onTimerClick}
          style={{ marginLeft: "40px" }}
        />
      )}
    </div>

    {timer ? (
      <>
        <p>{description}</p>
        <div>
          <FaEdit
            size="20px"
            onClick={onCardClick}
            color="#FFA41B"
            style={{ margin: "10px" }}
          />
          <MdDelete size="22px" color="red" style={{ margin: "10px" }} />
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
          <FaRegPauseCircle
            size="25px"
            color="yellow"
            style={{ margin: "10px" }}
          />
          <RxResume size="25px" color="green" style={{ margin: "10px" }} />
        </div>
      </>
    )}
  </div>
);
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

const customStyles = {
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
    maxWidth: "500px",
    maxHeight: "350px",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
      <Form />
    </Modal>
  );
};
const EditModal = ({ isOpen, onClose, onSave, project }) => {
  const [editedTitle, setEditedTitle] = useState(project?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    project?.description || ""
  );

  const handleSave = () => {
    onSave({
      ...project,
      title: editedTitle,
      description: editedDescription,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onClose}>
      <h2>Edit Project</h2>
      <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        placeholder={project?.title}
      />
      <label>Description:</label>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        placeholder={project?.description}
      ></textarea>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button style={{ margin: "0 10px" }} onClick={handleSave}>
          Save
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default function ProjectManagement() {
  const parallax = useRef(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project 1",
      description: "Description for Project 1",
      user: "rasheduap2015@gmail.com",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description for Project 2",
      user: "rasheduap2015@gmail.com",
    },
  ]);

  const [isModal1Open, setModal1Open] = useState(false);
  const [modal1Content, setModal1Content] = useState("");

  const openModal1 = () => {
    setModal1Content("This is a modal with simple text.");
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [timer, setTimer] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };
  const saveChanges = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
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

        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "30px",
              left: "15%",
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
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  onCardClick={() => openModal(project)}
                  onTimerClick={() => setTimer(!timer)}
                  timer={timer}
                />
              ))}
            </div>
          </div>
          <img
            src={url("satellite3")}
            style={{ width: "90%", color: "blue" }}
            alt=""
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "30px",
              left: "15%",
            }}
          >
            <TimerCard />
          </div>
          {/* <button onClick={() => alert("Time Track")}>Time Track Graph</button> */}
          <img src={url("satellite")} style={{ width: "40%" }} alt="" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "30px",
              left: "15%",
            }}
          >
            <TimerCard title={"Projects Graph"} />
          </div>
          {/* <button onClick={() => alert("Time Track 2")}>Time Track 2</button> */}
          <img src={url("satellite2")} style={{ width: "40%" }} alt="" />
        </ParallaxLayer>
        <EditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveChanges}
          project={selectedProject}
        />
        <ProjectModal
          isOpen={isModal1Open}
          onClose={closeModal1}
          modalContent={modal1Content}
        />
      </Parallax>
    </div>
  );
}
