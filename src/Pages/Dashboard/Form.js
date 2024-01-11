import React, { useState } from "react";
import "./Form.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    date: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   const handleAddButtonClick = async () => {
  //     // Create the data object in the required format
  //     const postData = {
  //       user_id: 1,
  //       date: formData.date,
  //       start_time: formData.startTime,
  //       end_time: formData.endTime,
  //       notes: formData.notes,
  //     };

  //     try {
  //       // Make a POST request to the API endpoint
  //       const response = await fetch("http://localhost:8800/entries", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(postData),
  //       });

  //       if (response.ok) {
  //         toast.success("Entry added successfully!", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });
  //       } else {
  //         toast.error("Failed to add entry. Please try again.", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form data:", error);
  //     }

  //     // Clear the form data
  //     setFormData({
  //       startTime: "",
  //       endTime: "",
  //       date: "",
  //       notes: "",
  //     });
  //   };

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
      {/* <label>
        Time:
        <textarea
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
      </label> */}

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
        Description:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={{}}>Create</button>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Form;
