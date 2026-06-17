import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "Admin",
    department: "",
    status: "Active",
  });

  useEffect(() => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const savedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];

    setUsers(savedUsers);
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
    ) {
      alert("Fill all required fields");
      return;
    }

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
      role: "Admin",
      department: "",
      status: "Active",
    });
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  };

  return (
    <AppLayout>
      <h1>User Management</h1>

      <div style={styles.formCard}>
        <h2>Create User</h2>

        <div style={styles.formGrid}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
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
            <optgroup label="Main System">
              <option value="Admin">
                Admin
              </option>

              <option value="Pastor">
                Pastor
              </option>

              <option value="Church Secretary">
                Church Secretary
              </option>

              <option value="Finance Officer">
                Finance Officer
              </option>
            </optgroup>

            <optgroup label="Department Users">
              <option value="Department Chair">
                Department Chair
              </option>

              <option value="Department Secretary">
                Department Secretary
              </option>

              <option value="Department Treasurer">
                Department Treasurer
              </option>

              <option value="Department Assistant">
                Department Assistant
              </option>
            </optgroup>
          </select>

          {form.role.startsWith("Department") && (
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

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">
              Active
            </option>

            <option value="Disabled">
              Disabled
            </option>
          </select>
        </div>

        <button
          style={styles.addBtn}
          onClick={addUser}
        >
          Create User
        </button>
      </div>

      <h2>Registered Users</h2>

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

            <p>
              <strong>Status:</strong>{" "}
              {user.status}
            </p>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                deleteUser(user.id)
              }
            >
              Delete User
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
    marginTop: "20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  userGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  deleteBtn: {
    marginTop: "15px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Users;