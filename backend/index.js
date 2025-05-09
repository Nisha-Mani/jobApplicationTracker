// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to Job Tracker API!");
});

// Define the Job schema
const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, default: null, required: false }, // Optional field
  status: { type: String, default: "Applied" }, // Optional field
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

// Sample route to get jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch jobs from MongoDB
    res.json(jobs); // Send jobs as JSON response
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// POST route to add a new job
app.post("/api/jobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save(); // Save the new job to MongoDB
    res.status(201).json(savedJob); // Send back the new job object
  } catch (error) {
    console.error("Error adding job:", error);
    return res.status(500).json({ message: "Failed to add job" });
  }
});
