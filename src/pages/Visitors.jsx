import { useState } from "react";
import AppLayout from "../layouts/AppLayout";

function Visitors() {
  const [visitors, setVisitors] = useState(
    JSON.parse(localStorage.getItem("visitors") || "[]")
  );

  const [form, setForm] = useState({
    name: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    email: "",
    residence: "",
    invitedBy: "",
    followUpStatus: "New Visitor",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name) return;

    let updated;

    if (editId) {
      updated = visitors.map((v) =>
        v.id === editId ? { ...v, ...form } : v
      );

      setEditId(null);
    } else {
      updated = [
        ...visitors,
        {
          id: Date.now(),
          ...form,
          dateVisited:
            new Date().toLocaleDateString(),
        },
      ];
    }

    setVisitors(updated);

    localStorage.setItem(
      "visitors",
      JSON.stringify(updated)
    );

    setForm({
      name: "",
      gender: "",
      maritalStatus: "",
      phone: "",
      email: "",
      residence: "",
      invitedBy: "",
      followUpStatus: "New Visitor",
    });
  };

  const handleEdit = (visitor) => {
    setForm({
      name: visitor.name,
      gender: visitor.gender,
      maritalStatus: visitor.maritalStatus,
      phone: visitor.phone,
      email: visitor.email,
      residence: visitor.residence,
      invitedBy: visitor.invitedBy,
      followUpStatus:
        visitor.followUpStatus,
    });

    setEditId(visitor.id);
  };

  const handleDelete = (id) => {
    const updated = visitors.filter(
      (v) => v.id !== id
    );

    setVisitors(updated);

    localStorage.setItem(
      "visitors",
      JSON.stringify(updated)
    );
  };

  const totalVisitors = visitors.length;

  const maleVisitors = visitors.filter(
    (v) => v.gender === "Male"
  ).length;

  const femaleVisitors = visitors.filter(
    (v) => v.gender === "Female"
  ).length;

  const marriedVisitors = visitors.filter(
    (v) => v.maritalStatus === "Married"
  ).length;

  const singleVisitors = visitors.filter(
    (v) => v.maritalStatus === "Single"
  ).length;

  const joinedChurch = visitors.filter(
    (v) =>
      v.followUpStatus ===
      "Joined Church"
  ).length;

  const returnedVisitors = visitors.filter(
    (v) =>
      v.followUpStatus === "Returned"
  ).length;

  return (
    <AppLayout>
      <h1>👋 Visitors Management</h1>

      {/* REPORT CARDS */}

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>{totalVisitors}</h2>
          <p>Total Visitors</p>
        </div>

        <div style={styles.statCard}>
          <h2>{maleVisitors}</h2>
          <p>Male Visitors</p>
        </div>

        <div style={styles.statCard}>
          <h2>{femaleVisitors}</h2>
          <p>Female Visitors</p>
        </div>

        <div style={styles.statCard}>
          <h2>{marriedVisitors}</h2>
          <p>Married</p>
        </div>

        <div style={styles.statCard}>
          <h2>{singleVisitors}</h2>
          <p>Single</p>
        </div>

        <div style={styles.statCard}>
          <h2>{returnedVisitors}</h2>
          <p>Returned</p>
        </div>

        <div style={styles.statCard}>
          <h2>{joinedChurch}</h2>
          <p>Joined Church</p>
        </div>
      </div>

      {/* FORM */}

      <div style={styles.card}>
        <h3>
          {editId
            ? "Edit Visitor"
            : "Register Visitor"}
        </h3>

        <div style={styles.formGrid}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">
              Gender
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">
              Marital Status
            </option>
            <option>Single</option>
            <option>Married</option>
          </select>

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="residence"
            placeholder="Residence"
            value={form.residence}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="invitedBy"
            placeholder="Invited By"
            value={form.invitedBy}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="followUpStatus"
            value={form.followUpStatus}
            onChange={handleChange}
            style={styles.input}
          >
            <option>
              New Visitor
            </option>
            <option>
              Contacted
            </option>
            <option>
              Returned
            </option>
            <option>
              Joined Church
            </option>
          </select>
        </div>

        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          {editId
            ? "Update Visitor"
            : "Add Visitor"}
        </button>
      </div>

      {/* VISITOR TABLE */}

      <div style={styles.card}>
        <h3>Visitors List</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Residence</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id}>
                <td>{visitor.name}</td>
                <td>{visitor.gender}</td>
                <td>{visitor.phone}</td>
                <td>{visitor.residence}</td>
                <td>
                  {visitor.followUpStatus}
                </td>
                <td>
                  {visitor.dateVisited}
                </td>

                <td>
                  <button
                    style={styles.editBtn}
                    onClick={() =>
                      handleEdit(visitor)
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      handleDelete(
                        visitor.id
                      )
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
    </AppLayout>
  );
}

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
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
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "15px",
    marginBottom: "20px",
    marginTop: "15px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  editBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    marginRight: "5px",
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
};

export default Visitors;