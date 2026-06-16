import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Departments() {
  const [departments, setDepartments] = useState([
    "Media",
    "Praise & Worship",
    "Ushering",
  ]);

  const [name, setName] = useState("");

  const addDepartment = () => {
    if (!name) return;

    setDepartments([...departments, name]);
    setName("");
  };

  return (
    <AppLayout>
      <h2>🏢 Departments</h2>

      <div style={styles.form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
        />

        <button onClick={addDepartment}>
          Add Department
        </button>
      </div>

      {departments.map((dept, index) => (
        <div key={index} style={styles.card}>
          {dept}
        </div>
      ))}
    </AppLayout>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
};

export default Departments;