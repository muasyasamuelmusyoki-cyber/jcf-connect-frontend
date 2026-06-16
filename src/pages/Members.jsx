import AppLayout from "../layouts/AppLayout";
import { useContext, useState } from "react";
import { MemberContext } from "../context/MemberContext";

function Members() {
  const {
    members,
    addMember,
    deleteMember,
    updateMember,
  } = useContext(MemberContext);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    emergencyContact: "",
    group: "",
    baptismStatus: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name) return;

    if (editId) {
      updateMember(editId, form);
      setEditId(null);
    } else {
      addMember({
        ...form,
        status: "Active",
      });
    }

    setForm({
      name: "",
      phone: "",
      email: "",
      gender: "",
      dob: "",
      address: "",
      emergencyContact: "",
      group: "",
      baptismStatus: "",
    });
  };

  const handleEdit = (member) => {
    setEditId(member.id);

    setForm({
      name: member.name || "",
      phone: member.phone || "",
      email: member.email || "",
      gender: member.gender || "",
      dob: member.dob || "",
      address: member.address || "",
      emergencyContact:
        member.emergencyContact || "",
      group: member.group || "",
      baptismStatus:
        member.baptismStatus || "",
    });
  };

  return (
    <AppLayout>
      <h1>Members Management</h1>

      <div style={styles.formGrid}>
        <input
          name="name"
          placeholder="Full Name"
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
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={form.emergencyContact}
          onChange={handleChange}
        />

        <input
          name="group"
          placeholder="Growth Group"
          value={form.group}
          onChange={handleChange}
        />

        <select
          name="baptismStatus"
          value={form.baptismStatus}
          onChange={handleChange}
        >
          <option value="">
            Baptism Status
          </option>
          <option>Baptized</option>
          <option>Not Baptized</option>
        </select>

        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          {editId
            ? "Update Member"
            : "Add Member"}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Group</th>
            <th>Baptism</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.email}</td>
              <td>{m.group}</td>
              <td>{m.baptismStatus}</td>

              <td>
                <button
                  onClick={() =>
                    handleEdit(m)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteMember(m.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}

const styles = {
  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "10px",
    marginBottom: "20px",
  },

  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    background: "#fff",
    borderCollapse: "collapse",
  },
};

export default Members;