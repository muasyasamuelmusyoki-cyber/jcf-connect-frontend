import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Reports() {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("churchReports");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "",
    category: "Attendance",
    description: "",
    uploadedBy: "",
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "churchReports",
      JSON.stringify(reports)
    );
  }, [reports]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveReport = () => {
    if (
      !form.title ||
      !form.description ||
      !form.uploadedBy
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      const updated = reports.map((report) =>
        report.id === editingId
          ? { ...report, ...form }
          : report
      );

      setReports(updated);
      setEditingId(null);
    } else {
      const newReport = {
        id: Date.now(),
        ...form,
        date: new Date().toLocaleDateString(),
      };

      setReports([newReport, ...reports]);
    }

    setForm({
      title: "",
      category: "Attendance",
      description: "",
      uploadedBy: "",
    });
  };

  const editReport = (report) => {
    setForm({
      title: report.title,
      category: report.category,
      description: report.description,
      uploadedBy: report.uploadedBy,
    });

    setEditingId(report.id);
  };

  const deleteReport = (id) => {
    if (!window.confirm("Delete Report?")) return;

    setReports(
      reports.filter(
        (report) => report.id !== id
      )
    );
  };

  return (
    <AppLayout>
      <h1>📊 Reports Center</h1>

      <div style={styles.formCard}>
        <h2>
          {editingId
            ? "Edit Report"
            : "Create Report"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Report Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Attendance</option>
          <option>Finance</option>
          <option>Membership</option>
          <option>Department</option>
          <option>Ministry</option>
        </select>

        <input
          type="text"
          name="uploadedBy"
          placeholder="Uploaded By"
          value={form.uploadedBy}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Report Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button
          style={styles.saveBtn}
          onClick={saveReport}
        >
          {editingId
            ? "Update Report"
            : "Save Report"}
        </button>
      </div>

      <div style={styles.grid}>
        {reports.map((report) => (
          <div
            key={report.id}
            style={styles.card}
          >
            <h3>{report.title}</h3>

            <p>
              <strong>Category:</strong>{" "}
              {report.category}
            </p>

            <p>
              <strong>Uploaded By:</strong>{" "}
              {report.uploadedBy}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {report.date}
            </p>

            <div style={styles.actions}>
              <button
                style={styles.viewBtn}
                onClick={() =>
                  setSelectedReport(report)
                }
              >
                View
              </button>

              <button
                style={styles.editBtn}
                onClick={() =>
                  editReport(report)
                }
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  deleteReport(report.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>
              {selectedReport.title}
            </h2>

            <p>
              <strong>Category:</strong>{" "}
              {selectedReport.category}
            </p>

            <p>
              <strong>Uploaded By:</strong>{" "}
              {selectedReport.uploadedBy}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {selectedReport.date}
            </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p>
              {selectedReport.description}
            </p>

            <button
              style={styles.closeBtn}
              onClick={() =>
                setSelectedReport(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

const styles = {
  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    marginBottom: "12px",
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
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  },

  viewBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  editBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "500px",
    maxWidth: "95%",
  },

  closeBtn: {
    marginTop: "15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Reports;