import { useState, useEffect } from "react";
import Search from "./components/Search";
import "./App.css";
import AddJobModal from "./components/AddJobModal";
import JobCard from "./components/JobCard";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the backend when the component mounts
  useEffect(() => {
    axios
      .get("/api/jobs") // Backend API endpoint
      .then((response) => {
        console.log("Axios get:", response.data); // Log the response data
        setJobs(response.data); // Set the jobs data
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []); // Empty dependency array to run only on mount

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === "All" || job.status === filter;

    return matchesSearch && matchesStatus;
  });

  const handleViewMore = (job) => {
    console.log("View more clicked for job:", job);
    // Navigate to the edit page or open a modal
  };

  return (
    <div className="container">
      <header>
        <h1>Job Application Tracker</h1>
        <button onClick={() => setIsModalOpen(true)}>Add New Job</button>
      </header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="search-bar">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Applied</option>
          <option>Rejected</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Accepted</option>
          <option>Declined</option>
        </select>
      </div>

      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onViewMore={handleViewMore} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {isModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)} />
          <div className="modal">
            <AddJobModal
              closeModal={() => setIsModalOpen(false)}
              onJobAdded={handleJobAdded}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
