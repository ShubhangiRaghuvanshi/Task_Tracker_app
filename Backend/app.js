require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/User");
const Project = require("./Models/Project");
const Task = require("./Models/Task");
const userRouter = require("./Routes/User");
const projectRouter = require("./Routes/Project");
const taskRouter = require("./Routes/Task");
const cors=require("cors");

const app = express();

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes



// Port from environment variable or fallback to 4000
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })  // Added options for better connection handling
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api/user", userRouter);
app.use("/api", projectRouter);
app.use("/api", taskRouter);



app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});





