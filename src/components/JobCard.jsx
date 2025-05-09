import React from "react";
import "../styles/JobCard.css";
import noLogo from "../assets/default-logo.jpg";

const JobCard = ({ job, onViewMore }) => {
  const statusColors = {
    Applied: "#007bff",
    Interviewing: "#ffc107",
    Offer: "#28a745",
    Rejected: "#dc3545",
    Accepted: "#17a2b8",
    Declined: "#6c757d",
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <img
          src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`}
          alt={`${job.company} logo`}
          className="job-card-logo"
          onError={(e) => {
            e.target.src = noLogo; // Fallback logo
          }}
        />
      </div>
      <div className="job-card-body">
        <h3 className="job-card-title">{job.title}</h3>
        <p className="job-card-company">{job.company}</p>
        <div className="job-card-status">
          <span
            className="status-dot"
            style={{ backgroundColor: statusColors[job.status] }}
          ></span>
          {job.status}
        </div>
      </div>
      <div className="job-card-footer">
        <button className="view-more-button" onClick={() => onViewMore(job)}>
          View More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
