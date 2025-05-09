import React from "react";
import { useState } from "react";
import axios from "axios";
// import css file inside style folder
import "../styles/AddJobModal.css";

const AddJobModal = ({ closeModal, onJobAdded }) => {
  const [newJob, setNewJob] = useState({
    company: "",
    title: "",
    url: "",
    status: "Applied",
  });

  const handleSubmit = (e) => {
    console.log("Form submitted:"); // Log the form submission
    e.preventDefault();
    // Capitalize the first letter of each field and trim whitespace
    const processedJob = {
      ...newJob,
      company: capitaliseAndTrim(newJob.company),
      title: capitaliseAndTrim(newJob.title),
      url: newJob.url.trim() === "" ? null : newJob.url.trim(), // Set to null if blank
      status: newJob.status,
    };
    console.log("New job data:", processedJob);
    axios
      .post("/api/jobs", processedJob) // Backend API endpoint
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

  const capitaliseAndTrim = (str) => {
    str = str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1);
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
            required
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Job URL"
            value={newJob.url}
            onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
          />
          <select
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
          <button type="submit">Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
