import { useState } from "react";
import AppLayout from "../layouts/AppLayout";

function Visitors() {
  const [visitors, setVisitors] = useState(
    JSON.parse(localStorage.getItem("visitors") || "[]")
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    invitedBy: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        { id: Date.now(), ...form, status: "New" },
      ];
    }

    setVisitors(updated);
    localStorage.setItem("visitors", JSON.stringify(updated));

    setForm({ name: "", phone: "", invitedBy: "" });
  };

  const handleEdit = (v) => {
    setForm({
      name: v.name,
      phone: v.phone,
      invitedBy: v.invitedBy,
    });
    setEditId(v.id);
  };

  const handleDelete = (id) => {
    const updated = visitors.filter((v) => v.id !== id);
    setVisitors(updated);
    localStorage.setItem("visitors", JSON.stringify(updated));
  };

  return (
    <AppLayout>
      <h2>👋 Visitors</h2>

      <div style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="invitedBy"
          placeholder="Invited By"
          value={form.invitedBy}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Invited By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.phone}</td>
              <td>{v.invitedBy}</td>
              <td>{v.status}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Edit</button>
                <button onClick={() => handleDelete(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}

const styles = {
  form: { display: "flex", gap: "10px", margin: "20px 0" },
  table: { width: "100%", background: "white" },
};

export default Visitors;