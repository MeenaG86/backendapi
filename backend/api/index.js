const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Meena", course: "Full Stack Development", status: "Learning" },
  { id: 2, name: "Suba", course: "React", status: "Completed" }
];

// Home API
app.get("/", (req, res) => {
  res.send("Backend API is running successfully");
});

// GET all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// POST add student
app.post("/students", (req, res) => {
  const { name, course, status } = req.body;

  if (!name || !course || !status) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newStudent = {
    id: Date.now(),
    name,
    course,
    status
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentExists = students.find((student) => student.id === id);

  if (!studentExists) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students = students.filter((student) => student.id !== id);

  res.status(200).json({
    message: "Student deleted successfully"
  });
});

module.exports = (req, res) => app(req, res);