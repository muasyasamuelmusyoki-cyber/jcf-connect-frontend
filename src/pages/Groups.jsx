import { useState } from "react";
import AppLayout from "../layouts/AppLayout";

function Groups() {
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups") || "[]")
  );

  const [form, setForm] = useState({
    name: "",
    leader: "",
    code: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return;

    let updated;

    if (editId) {
      updated = groups.map((g) =>
        g.id === editId ? { ...g, ...form } : g
      );
      setEditId(null);
    } else {
      updated = [...groups, { id: Date.now(), ...form }];
    }

    setGroups(updated);
    localStorage.setItem("groups", JSON.stringify(updated));

    setForm({ name: "", leader: "", code: "" });
  };

  return (
    <AppLayout>
      <h2>📍 Growth Groups</h2>

      <div style={styles.form}>
        <input
          name="name"
          placeholder="Group Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="leader"
          placeholder="Leader"
          value={form.leader}
          onChange={handleChange}
        />

        <input
          name="code"
          placeholder="Code"
          value={form.code}
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
            <th>Leader</th>
            <th>Code</th>
          </tr>
        </thead>

        <tbody>
          {groups.map((g) => (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{g.leader}</td>
              <td>{g.code}</td>
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

export default Groups;