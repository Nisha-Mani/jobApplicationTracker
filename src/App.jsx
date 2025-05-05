import { useState } from "react";
import Search from "./components/Search";
import "./App.css";
import AddJobModal from "./components/AddJobModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs = [
    {
      key: 1,
      company: "Google",
      title: "Frontend Developer",
      status: "Applied",
    },
    {
      key: 2,
      company: "Amazon",
      title: "Backend Developer",
      status: "Rejected",
    },
    {
      key: 3,
      company: "Microsoft",
      title: "Full Stack Engineer",
      status: "Applied",
    },
    { key: 4, company: "Netflix", title: "UI/UX Designer", status: "Rejected" },
    {
      key: 5,
      company: "Google Cloud",
      title: "Cloud Developer",
      status: "Rejected",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === "All" || job.status === filter;

    return matchesSearch && matchesStatus;
  });

  console.log(isModalOpen);
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
            <AddJobModal closeModal={() => setIsModalOpen(false)} />
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
          filteredJobs.map((job) => <li key={job.key}>{job.title}</li>)
        ) : (
          <li>No jobs found.</li>
        )}
      </ul>
    </>
  );
}

export default App;
