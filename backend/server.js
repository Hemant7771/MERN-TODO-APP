const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    text: String,
  })
);

app.post("/add", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.send(newTask);
  } catch (err) {
    res.status(500).send("Error adding task");
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send("Error fetching tasks");
  }
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);