import React from "react";
import { useState } from "react";
import axios from "axios";

const AddJobModal = ({ closeModal, onJobAdded }) => {
  const [newJob, setNewJob] = useState({
    company: "",
    title: "",
  });

  const handleSubmit = (e) => {
    console.log("Form submitted:"); // Log the form submission
    e.preventDefault();
    axios
      .post("/api/jobs", newJob) // Backend API endpoint
      .then((response) => {
        console.log("Job added:", response.data); // Log the response data
        onJobAdded(response.data); // Update the job list in the parent component
      })
      .catch((error) => {
        console.error("Error adding job:", error);
      })
      .finally(() => {
        closeModal(); // Close the modal after submission
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />
          <button type="submit">Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
