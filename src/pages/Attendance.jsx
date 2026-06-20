import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Attendance() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    date: new Date().toISOString().split("T")[0],
    adultsMen: "",
    adultsWomen: "",
    adultsVisitors: "",
    teensBoys: "",
    teensGirls: "",
    amani: "",
    furaha: "",
    imani: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(records));
  }, [records]);

  const toNum = (v) => Number(v || 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveAttendance = () => {
    const adults =
      toNum(form.adultsMen) +
      toNum(form.adultsWomen) +
      toNum(form.adultsVisitors);

    const teens =
      toNum(form.teensBoys) + toNum(form.teensGirls);

    const children =
      toNum(form.amani) +
      toNum(form.furaha) +
      toNum(form.imani);

    const total = adults + teens + children;

    if (total === 0) {
      alert("Please enter attendance before saving");
      return;
    }

    const attendanceData = {
      id: editingId || Date.now(),
      date: form.date,
      adultsMen: toNum(form.adultsMen),
      adultsWomen: toNum(form.adultsWomen),
      adultsVisitors: toNum(form.adultsVisitors),
      teensBoys: toNum(form.teensBoys),
      teensGirls: toNum(form.teensGirls),
      amani: toNum(form.amani),
      furaha: toNum(form.furaha),
      imani: toNum(form.imani),
      adults,
      teens,
      children,
      total,
    };

    if (editingId) {
      setRecords(
        records.map((r) =>
          r.id === editingId ? attendanceData : r
        )
      );
      alert("Attendance Updated");
    } else {
      setRecords([attendanceData, ...records]);
      alert("Attendance Saved");
    }

    resetForm();
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this record?")) return;
    setRecords(records.filter((r) => r.id !== id));
  };

  const totalAdults = records.reduce((s, r) => s + r.adults, 0);
  const totalTeens = records.reduce((s, r) => s + r.teens, 0);
  const totalChildren = records.reduce((s, r) => s + r.children, 0);
  const grandTotal = records.reduce((s, r) => s + r.total, 0);

  return (
    <AppLayout>
      <h1>📅 Sunday Attendance</h1>

      <div style={styles.statsGrid}>
        <Stat label="Adults" value={totalAdults} />
        <Stat label="Teens" value={totalTeens} />
        <Stat label="Children" value={totalChildren} />
        <Stat label="Total" value={grandTotal} />
      </div>

      <div style={styles.card}>
        <h2>{editingId ? "Edit Attendance" : "Record Attendance"}</h2>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={styles.input}
        />

        <Section title="Adults">
          <Row form={form} handleChange={handleChange} fields={[
            "adultsMen",
            "adultsWomen",
            "adultsVisitors",
          ]} />
        </Section>

        <Section title="Teens">
          <Row form={form} handleChange={handleChange} fields={[
            "teensBoys",
            "teensGirls",
          ]} />
        </Section>

        <Section title="Children">
          <Row form={form} handleChange={handleChange} fields={[
            "amani",
            "furaha",
            "imani",
          ]} />
        </Section>

        <button style={styles.saveBtn} onClick={saveAttendance}>
          {editingId ? "Update" : "Save"} Attendance
        </button>
      </div>

      <div style={styles.card}>
        <h2>Attendance History</h2>

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
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.adults}</td>
                <td>{r.teens}</td>
                <td>{r.children}</td>
                <td>{r.total}</td>
                <td>
                  <button style={styles.editBtn} onClick={() => handleEdit(r)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

/* SMALL COMPONENTS */
const Stat = ({ label, value }) => (
  <div style={styles.statCard}>
    <h2>{value}</h2>
    <p>{label}</p>
  </div>
);

const Section = ({ title, children }) => (
  <>
    <h3>{title}</h3>
    {children}
  </>
);

const Row = ({ form, handleChange, fields }) => (
  <div style={styles.grid}>
    {fields.map((f) => (
      <input
        key={f}
        type="number"
        name={f}
        value={form[f]}
        placeholder={f}
        onChange={handleChange}
        style={styles.input}
      />
    ))}
  </div>
);

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },
  card: {
    background: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 15,
  },
  input: {
    width: "100%",
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  saveBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: 12,
    border: "none",
    borderRadius: 8,
    marginTop: 15,
  },
  table: {
    width: "100%",
    minWidth: 700,
    borderCollapse: "collapse",
  },
  editBtn: {
    background: "#16a34a",
    color: "#fff",
    padding: 8,
    marginRight: 5,
    border: "none",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    padding: 8,
    border: "none",
  },
};

export default Attendance;