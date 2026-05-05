import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "https://backendapi-g91m.onrender.com/students";

  function getStudents() {
    axios
      .get(API_URL)
      .then((res) => {
        setStudents(res.data);
      })
      .catch(() => {
        setMessage("Error fetching students");
      });
  }

  useEffect(() => {
    getStudents();
  }, []);

  function addStudent(e) {
    e.preventDefault();

    axios
      .post(API_URL, {
        name,
        course,
        status
      })
      .then((res) => {
        setMessage(res.data.message);
        setName("");
        setCourse("");
        setStatus("");
        getStudents();
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Something went wrong");
      });
  }

  function deleteStudent(id) {
    axios
      .delete(`${API_URL}/${id}`)
      .then((res) => {
        setMessage(res.data.message);
        getStudents();
      })
      .catch(() => {
        setMessage("Delete failed");
      });
  }

  return (
    <div className="container">
      <h1> Backend API Development</h1>
      <p className="subtitle">React + Node.js + Express API</p>

      <form onSubmit={addStudent} className="form">
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button type="submit">Add Student</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="cards">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <h2>{student.name}</h2>
            <p><b>Course:</b> {student.course}</p>
            <p><b>Status:</b> {student.status}</p>
            <button onClick={() => deleteStudent(student.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;