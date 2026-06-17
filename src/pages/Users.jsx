import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "Department User",
    department: "",
  });

  useEffect(() => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(savedUsers);

    const savedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];

    setDepartments(savedDepartments);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = () => {
    if (
      !form.fullName ||
      !form.username ||
      !form.password
    )
      return;

    const newUser = {
      id: Date.now(),
      ...form,
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setForm({
      fullName: "",
      username: "",
      password: "",
      role: "Department User",
      department: "",
    });
  };

  const deleteUser = (id) => {
    const updated = users.filter(
      (user) => user.id !== id
    );

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );
  };

  return (
    <AppLayout>
      <h1>User Management</h1>

      <div style={styles.formCard}>
        <h3>Create User</h3>

        <div style={styles.formGrid}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option>Admin</option>
            <option>Pastor</option>
            <option>Church Secretary</option>
            <option>Finance Officer</option>
            <option>Department Chair</option>
            <option>Department Secretary</option>
            <option>Department Treasurer</option>
            <option>Department Assistant</option>
            <option>Department User</option>
          </select>

          {form.role.includes("Department") && (
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">
                Select Department
              </option>

              {departments.map((dept) => (
                <option
                  key={dept.id}
                  value={dept.name}
                >
                  {dept.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          style={styles.addBtn}
          onClick={addUser}
        >
          Create User
        </button>
      </div>

      <div style={styles.userGrid}>
        {users.map((user) => (
          <div
            key={user.id}
            style={styles.card}
          >
            <h3>{user.fullName}</h3>

            <p>
              <strong>Username:</strong>{" "}
              {user.username}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user.role}
            </p>

            {user.department && (
              <p>
                <strong>Department:</strong>{" "}
                {user.department}
              </p>
            )}

            <button
              style={styles.deleteBtn}
              onClick={() =>
                deleteUser(user.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
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

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  addBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  userGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Users;