import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../../firebase.init";
import "./Form.css";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const Form = ({ onClose, project }) => {
  const [formData, setFormData] = useState({
    title: "",
    task: "",
    date: "",
    hours: 0,
    timer: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateButtonClick = () => {
    const database = getDatabase(app);
    const projectsRef = ref(database, "projects");

    const projectData = {
      title: formData.title,
      task: formData.task,
      date: formData.date,
      hours: formData.hours,
      timer: "",
      notes: formData.notes,
      user: auth?.currentUser ? auth.currentUser?.email : "",
    };

    push(projectsRef, projectData)
      .then(() => {
        toast.success("Project created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast.error("Failed to create project", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });

    setFormData({
      title: "",
      task: "",
      date: "",
      hours: 0,
      timer: "",
      notes: "",
    });
  };

  return (
    <div className="form-container">
      <label>
        Title:
        <textarea
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Task:
        <textarea
          name="task"
          value={formData.task}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Hours:
        <input
          type="number"
          name="hours"
          value={formData.hours}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleCreateButtonClick}>Create</button>
      <ToastContainer />
    </div>
  );
};

export default Form;
