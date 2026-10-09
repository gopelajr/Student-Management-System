import { useState, useEffect } from "react";

import axios from "axios";
 
function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null); 
 
  const getStudents = () => {

    axios.get("http://localhost:5000/students").then((response) => {

      setStudents(response.data);

    });
  };
 

  useEffect(() => {
    getStudents();

  }, []);
 
  const resetForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);

  };


  const handleSubmit = async () => {

    const studentData = { name: name, course: course, age: age };
 
    if (editingId === null) {
      await axios.post("http://localhost:5000/students", studentData);
    } else {

      await axios.put(
        "http://localhost:5000/students/" + editingId,
        studentData

      );
    }
 
    getStudents(); 
    resetForm();
  };
 
  const handleEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);

  };

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:5000/students/" + id);
    getStudents();
  };
 
  return (
<div>
<h1>Student Management System</h1>
 
      <h2>{editingId === null ? "Add Student" : "Edit Student"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}

      />
<br />
<input

        type="text"
        placeholder="Course"
        value={course}
        onChange={(event) => setCourse(event.target.value)}

      />
<br />
<input

        type="number"
        placeholder="Age"
        value={age}
        onChange={(event) => setAge(event.target.value)}

      />
<br />
<button onClick={handleSubmit}>

        {editingId === null ? "Add Student" : "Update Student"}
</button>
 
      <h2>Students</h2>
 
      {students.map((student) => (
<div key={student._id}>
<p>{student.name}</p>
<p>{student.course}</p>
<p>{student.age}</p>
<button onClick={() => handleEdit(student)}>Edit</button>
<button onClick={() => handleDelete(student._id)}>Delete</button>
<hr />
</div>

      ))}
</div>

  );

}
 
export default App;
 