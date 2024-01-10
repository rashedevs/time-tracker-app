import React, { useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Modal from "react-modal";
import { IoPersonCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Little helpers ...
const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const ProjectCard = ({ title, description, onCardClick }) => (
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
    <h3>{title}</h3>
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

export default function App() {
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

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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
        <h4 style={{ color: "#FFA41B" }}>User Name</h4>
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <button onClick={() => alert("project 1 opened")}>
              Project 1 +
            </button>
            <button onClick={() => alert("project 2 opened")}>
              Project 2 +
            </button> */}
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onCardClick={() => openModal(project)}
              />
            ))}
          </div>
          <img src={url("cloud")} style={{ width: "20%" }} alt="" />
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
          <button onClick={() => alert("Open Card Details")}>
            Card details
          </button>
          {/* <img src={url("")} style={{ width: "20%" }} alt="" /> */}
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
          <button onClick={() => alert("Edit Card Details")}>Edit</button>
        </ParallaxLayer>
        <EditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveChanges}
          project={selectedProject}
        />
      </Parallax>
    </div>
  );
}
