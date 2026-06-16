import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const addUser = () => {
    if (!name || !role) return;

    setUsers([
      ...users,
      {
        id: Date.now(),
        name,
        role,
      },
    ]);

    setName("");
    setRole("");
  };

  return (
    <AppLayout>
      <h2>👤 Users</h2>

      <div style={styles.form}>
        <input
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={addUser}>
          Add User
        </button>
      </div>

      {users.map((u) => (
        <div key={u.id} style={styles.card}>
          {u.name} - {u.role}
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

export default Users;