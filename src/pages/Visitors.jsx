import { useState } from "react";
import AppLayout from "../layouts/AppLayout";

function Visitors() {
  const [visitors, setVisitors] = useState(
    JSON.parse(localStorage.getItem("visitors") || "[]")
  );

  const [form, setForm] = useState({
    name: "",
    maritalStatus: "",
    phone: "",
    email: "",
    residence: "",
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
          status: "New Visitor",
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
      maritalStatus: "",
      phone: "",
      email: "",
      residence: "",
    });
  };

  const handleEdit = (visitor) => {
    setForm({
      name: visitor.name,
      maritalStatus: visitor.maritalStatus,
      phone: visitor.phone,
      email: visitor.email,
      residence: visitor.residence,
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

  return (
    <AppLayout>
      <h1>👋 Visitors Management</h1>

      {/* FORM CARD */}
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
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">
              Marital Status
            </option>
            <option value="Single">
              Single
            </option>
            <option value="Married">
              Married
            </option>
          </select>

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="residence"
            placeholder="Area of Residence"
            value={form.residence}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          {editId
            ? "Update Visitor"
            : "Add Visitor"}
        </button>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        <h3>Visitors List</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Marital Status</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Residence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id}>
                <td>{visitor.name}</td>
                <td>{visitor.maritalStatus}</td>
                <td>{visitor.phone}</td>
                <td>{visitor.email}</td>
                <td>{visitor.residence}</td>
                <td>{visitor.status}</td>

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
                      handleDelete(visitor.id)
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
    marginTop: "15px",
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "100%",
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