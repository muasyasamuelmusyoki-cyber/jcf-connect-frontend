import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Attendance() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],

    adultsMen: "",
    adultsWomen: "",
    adultsVisitors: "",

    teensBoys: "",
    teensGirls: "",

    amani: "",
    furaha: "",
    imani: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(records)
    );
  }, [records]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAttendance = () => {
    const adults =
      Number(form.adultsMen || 0) +
      Number(form.adultsWomen || 0) +
      Number(form.adultsVisitors || 0);

    const teens =
      Number(form.teensBoys || 0) +
      Number(form.teensGirls || 0);

    const children =
      Number(form.amani || 0) +
      Number(form.furaha || 0) +
      Number(form.imani || 0);

    const total = adults + teens + children;

    const attendanceData = {
      id: editingId || Date.now(),
      date: form.date,

      adultsMen: Number(form.adultsMen || 0),
      adultsWomen: Number(form.adultsWomen || 0),
      adultsVisitors: Number(form.adultsVisitors || 0),

      teensBoys: Number(form.teensBoys || 0),
      teensGirls: Number(form.teensGirls || 0),

      amani: Number(form.amani || 0),
      furaha: Number(form.furaha || 0),
      imani: Number(form.imani || 0),

      adults,
      teens,
      children,
      total,
    };

    if (editingId) {
      const updated = records.map((record) =>
        record.id === editingId
          ? attendanceData
          : record
      );

      setRecords(updated);
      setEditingId(null);

      alert("Attendance Updated");
    } else {
      setRecords([
        attendanceData,
        ...records,
      ]);

      alert("Attendance Saved");
    }

    setForm({
      date: new Date()
        .toISOString()
        .split("T")[0],

      adultsMen: "",
      adultsWomen: "",
      adultsVisitors: "",

      teensBoys: "",
      teensGirls: "",

      amani: "",
      furaha: "",
      imani: "",
    });
  };

  const handleEdit = (record) => {
    setEditingId(record.id);

    setForm({
      date: record.date,

      adultsMen: record.adultsMen,
      adultsWomen: record.adultsWomen,
      adultsVisitors: record.adultsVisitors,

      teensBoys: record.teensBoys,
      teensGirls: record.teensGirls,

      amani: record.amani,
      furaha: record.furaha,
      imani: record.imani,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this attendance record?"
    );

    if (!confirmDelete) return;

    setRecords(
      records.filter(
        (record) => record.id !== id
      )
    );
  };

  const totalAdults = records.reduce(
    (sum, record) => sum + record.adults,
    0
  );

  const totalTeens = records.reduce(
    (sum, record) => sum + record.teens,
    0
  );

  const totalChildren = records.reduce(
    (sum, record) => sum + record.children,
    0
  );

  const grandTotal = records.reduce(
    (sum, record) => sum + record.total,
    0
  );

  return (
    <AppLayout>
      <h1>📅 Sunday Attendance</h1>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>{totalAdults}</h2>
          <p>Adults</p>
        </div>

        <div style={styles.statCard}>
          <h2>{totalTeens}</h2>
          <p>Teens</p>
        </div>

        <div style={styles.statCard}>
          <h2>{totalChildren}</h2>
          <p>Children</p>
        </div>

        <div style={styles.statCard}>
          <h2>{grandTotal}</h2>
          <p>Total Attendance</p>
        </div>
      </div>

      <div style={styles.card}>
        <h2>
          {editingId
            ? "Edit Attendance"
            : "Record Attendance"}
        </h2>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={styles.input}
        />

        <h3>Adults Church</h3>

        <div style={styles.grid}>
          <input
            type="number"
            name="adultsMen"
            placeholder="Men"
            value={form.adultsMen}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="adultsWomen"
            placeholder="Women"
            value={form.adultsWomen}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="adultsVisitors"
            placeholder="Visitors"
            value={form.adultsVisitors}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <h3>Teens Church</h3>

        <div style={styles.grid}>
          <input
            type="number"
            name="teensBoys"
            placeholder="Boys"
            value={form.teensBoys}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="teensGirls"
            placeholder="Girls"
            value={form.teensGirls}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <h3>Children Church</h3>

        <div style={styles.grid}>
          <input
            type="number"
            name="amani"
            placeholder="Amani"
            value={form.amani}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="furaha"
            placeholder="Furaha"
            value={form.furaha}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="imani"
            placeholder="Imani"
            value={form.imani}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          style={styles.saveBtn}
          onClick={saveAttendance}
        >
          {editingId
            ? "Update Attendance"
            : "Save Attendance"}
        </button>
      </div>

      <div style={styles.card}>
        <h2>Attendance History</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Adults</th>
                <th>Teens</th>
                <th>Children</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.adults}</td>
                  <td>{record.teens}</td>
                  <td>{record.children}</td>
                  <td>{record.total}</td>

                  <td>
                    <button
                      style={styles.editBtn}
                      onClick={() =>
                        handleEdit(record)
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() =>
                        handleDelete(record.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  saveBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  },

  table: {
    width: "100%",
    minWidth: "700px",
    borderCollapse: "collapse",
  },

  editBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "5px",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Attendance;