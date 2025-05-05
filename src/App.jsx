import { useState } from "react";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    { key: 1, company: "Google", title: "Frontend Developer" },
    { key: 2, company: "Amazon", title: "Backend Developer" },
    { key: 3, company: "Microsoft", title: "Full Stack Engineer" },
    { key: 4, company: "Netflix", title: "UI/UX Designer" },
  ];
  const filteredJobs = searchTerm
    ? jobs.filter((job) => {
        return (
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : jobs;

  console.log(filteredJobs);
  console.log(searchTerm);
  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button>Add New Job</button>

      <label htmlFor="status">Filter by Status:</label>
      <select id="status">
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
