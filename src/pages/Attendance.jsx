import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [name, setName] = useState("");

  const markAttendance = () => {
    if (!name) return;

    setAttendance([
      ...attendance,
      {
        id: Date.now(),
        name,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setName("");
  };

  return (
    <AppLayout>
      <h2>📅 Attendance</h2>

      <div style={styles.form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Member Name"
        />

        <button onClick={markAttendance}>
          Mark Present
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    background: "white",
  },
};

export default Attendance;