const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Meena", course: "Full Stack Development", status: "Learning" },
  { id: 2, name: "Suba", course: "React", status: "Completed" }
];

app.get("/api", (req, res) => {
  res.send("Backend API is running successfully");
});

app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

app.post("/api/students", (req, res) => {
  const { name, course, status } = req.body;

  if (!name || !course || !status) {
    return res.status(400).json({ message: "All fields are required" });
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

app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter((student) => student.id !== id);

  res.status(200).json({
    message: "Student deleted successfully"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});