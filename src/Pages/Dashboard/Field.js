import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../../firebase.init";
import "./Form.css";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const Field = ({ onClose, project }) => {
  console.log("Project data in Field:", project?.id);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    task: project?.task || "",
    date: project?.date || "",
    hours: project?.hours || 0,
    notes: project?.notes || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveButtonClick = () => {
    const database = getDatabase(app);
    const updatedProjectData = {
      title: formData.title,
      task: formData.task,
      date: formData.date,
      hours: formData.hours,
      notes: formData.notes,
      user: auth?.currentUser ? auth.currentUser?.email : "",
    };

    if (project) {
      // If editing an existing project, update the existing data
      const projectRef = ref(database, `projects/${project.id}`);
      update(projectRef, updatedProjectData)
        .then(() => {
          toast.success("Project updated successfully!", {
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
          toast.error("Error updating project", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
    // else {
    //   // If creating a new project, push the new data
    //   push(projectsRef, updatedProjectData)
    //     .then(() => {
    //       console.log("Project added successfully!");
    //       onClose();
    //     })
    //     .catch((error) => {
    //       console.error("Error adding project:", error);
    //     });
    // }

    setFormData({
      title: "",
      task: "",
      date: "",
      hours: 0,
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

      {/* Date field is not editable if it's an edit operation */}
      {!project && (
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
      )}

      <label>
        Hours:
        <input
          type="number"
          name="hours"
          value={formData.hours}
          onChange={handleInputChange}
        />
      </label>

      {/* User field is not editable if it's an edit operation */}
      {!project && (
        <label>
          User:
          <input
            type="text"
            name="user"
            value={auth?.currentUser ? auth.currentUser?.email : ""}
            readOnly
          />
        </label>
      )}

      <label>
        Description:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </label>
      {project && <button onClick={handleSaveButtonClick}>Save</button>}
      <ToastContainer />
    </div>
  );
};

export default Field;
