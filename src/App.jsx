import { useState, useEffect } from "react";
import Search from "./components/Search";
import "./App.css";
import AddJobModal from "./components/AddJobModal";
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
        console.log("Axios get:",response.data); // Log the response data
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

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add New Job
      </button>

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

      <label htmlFor="status">Filter by Status:</label>
      <select id="status" onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Applied</option>
        <option>Rejected</option>
      </select>
      <ul>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <li key={job._id}>
              {job.title} @ {job.company}
            </li>
          ))
        ) : (
          <li>No jobs found.</li>
        )}
      </ul>
    </>
  );
}

export default App;
