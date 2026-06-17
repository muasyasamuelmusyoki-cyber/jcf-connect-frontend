import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Departments() {
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("departments");
    return saved ? JSON.parse(saved) : [];
  });

  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    chair: "",
    secretary: "",
    treasurer: "",
    assistant: "",
  });

  const [memberForm, setMemberForm] = useState({
    departmentId: "",
    fullName: "",
    phone: "",
    gender: "Male",
    role: "Member",
  });

  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "departments",
      JSON.stringify(departments)
    );
  }, [departments]);

  const createDepartment = () => {
    if (!departmentForm.name) return;

    const newDepartment = {
      id: Date.now(),
      ...departmentForm,
      members: [],
    };

    setDepartments([...departments, newDepartment]);

    setDepartmentForm({
      name: "",
      chair: "",
      secretary: "",
      treasurer: "",
      assistant: "",
    });
  };

  const addMember = () => {
    if (
      !memberForm.departmentId ||
      !memberForm.fullName
    )
      return;

    const updated = departments.map((dept) => {
      if (
        dept.id === Number(memberForm.departmentId)
      ) {
        return {
          ...dept,
          members: [
            ...dept.members,
            {
              id: Date.now(),
              fullName: memberForm.fullName,
              phone: memberForm.phone,
              gender: memberForm.gender,
              role: memberForm.role,
            },
          ],
        };
      }

      return dept;
    });

    setDepartments(updated);

    setMemberForm({
      departmentId: "",
      fullName: "",
      phone: "",
      gender: "Male",
      role: "Member",
    });
  };

  const updateMember = () => {
    const updated = departments.map((dept) => {
      if (
        dept.id === editingMember.departmentId
      ) {
        return {
          ...dept,
          members: dept.members.map((member) =>
            member.id === editingMember.id
              ? editingMember
              : member
          ),
        };
      }

      return dept;
    });

    setDepartments(updated);
    setEditingMember(null);
  };

  const deleteMember = (
    departmentId,
    memberId
  ) => {
    const updated = departments.map((dept) => {
      if (dept.id === departmentId) {
        return {
          ...dept,
          members: dept.members.filter(
            (member) => member.id !== memberId
          ),
        };
      }

      return dept;
    });

    setDepartments(updated);
  };

  const deleteDepartment = (id) => {
    const updated = departments.filter(
      (dept) => dept.id !== id
    );

    setDepartments(updated);
  };

  return (
    <AppLayout>
      <h1>🏢 Departments Management</h1>

      {/* STATS */}

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>{departments.length}</h2>
          <p>Total Departments</p>
        </div>

        <div style={styles.statCard}>
          <h2>
            {departments.reduce(
              (total, dept) =>
                total + dept.members.length,
              0
            )}
          </h2>
          <p>Total Members</p>
        </div>

        <div style={styles.statCard}>
          <h2>
            {
              departments.filter(
                (d) => d.members.length > 0
              ).length
            }
          </h2>
          <p>Active Departments</p>
        </div>
      </div>

      {/* CREATE DEPARTMENT */}

      <div style={styles.card}>
        <h2>Create Department</h2>

        <div style={styles.grid}>
          <input
            placeholder="Department Name"
            value={departmentForm.name}
            onChange={(e) =>
              setDepartmentForm({
                ...departmentForm,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Chair"
            value={departmentForm.chair}
            onChange={(e) =>
              setDepartmentForm({
                ...departmentForm,
                chair: e.target.value,
              })
            }
          />

          <input
            placeholder="Secretary"
            value={departmentForm.secretary}
            onChange={(e) =>
              setDepartmentForm({
                ...departmentForm,
                secretary: e.target.value,
              })
            }
          />

          <input
            placeholder="Treasurer"
            value={departmentForm.treasurer}
            onChange={(e) =>
              setDepartmentForm({
                ...departmentForm,
                treasurer: e.target.value,
              })
            }
          />

          <input
            placeholder="Assistant"
            value={departmentForm.assistant}
            onChange={(e) =>
              setDepartmentForm({
                ...departmentForm,
                assistant: e.target.value,
              })
            }
          />
        </div>

        <button
          style={styles.primaryBtn}
          onClick={createDepartment}
        >
          Create Department
        </button>
      </div>

      {/* ADD MEMBER */}

      <div style={styles.card}>
        <h2>Add Department Member</h2>

        <div style={styles.grid}>
          <select
            value={memberForm.departmentId}
            onChange={(e) =>
              setMemberForm({
                ...memberForm,
                departmentId: e.target.value,
              })
            }
          >
            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept.id}
                value={dept.id}
              >
                {dept.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Full Name"
            value={memberForm.fullName}
            onChange={(e) =>
              setMemberForm({
                ...memberForm,
                fullName: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone Number"
            value={memberForm.phone}
            onChange={(e) =>
              setMemberForm({
                ...memberForm,
                phone: e.target.value,
              })
            }
          />

          <select
            value={memberForm.gender}
            onChange={(e) =>
              setMemberForm({
                ...memberForm,
                gender: e.target.value,
              })
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <select
            value={memberForm.role}
            onChange={(e) =>
              setMemberForm({
                ...memberForm,
                role: e.target.value,
              })
            }
          >
            <option>Member</option>
            <option>Chair</option>
            <option>Secretary</option>
            <option>Treasurer</option>
            <option>Assistant</option>
          </select>
        </div>

        <button
          style={styles.primaryBtn}
          onClick={addMember}
        >
          Add Member
        </button>
      </div>

      {/* EDIT MEMBER */}

      {editingMember && (
        <div style={styles.card}>
          <h2>Edit Member</h2>

          <div style={styles.grid}>
            <input
              value={editingMember.fullName}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  fullName: e.target.value,
                })
              }
            />

            <input
              value={editingMember.phone}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  phone: e.target.value,
                })
              }
            />

            <select
              value={editingMember.gender}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  gender: e.target.value,
                })
              }
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <select
              value={editingMember.role}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  role: e.target.value,
                })
              }
            >
              <option>Member</option>
              <option>Chair</option>
              <option>Secretary</option>
              <option>Treasurer</option>
              <option>Assistant</option>
            </select>
          </div>

          <button
            style={styles.primaryBtn}
            onClick={updateMember}
          >
            Save Changes
          </button>
        </div>
      )}

      {/* DEPARTMENTS */}

      {departments.map((dept) => (
        <div
          key={dept.id}
          style={styles.departmentCard}
        >
          <div style={styles.departmentHeader}>
            <h2>{dept.name}</h2>

            <button
              style={styles.deleteDepartmentBtn}
              onClick={() =>
                deleteDepartment(dept.id)
              }
            >
              Delete Department
            </button>
          </div>

          <p>
            <strong>Chair:</strong> {dept.chair}
          </p>

          <p>
            <strong>Secretary:</strong>{" "}
            {dept.secretary}
          </p>

          <p>
            <strong>Treasurer:</strong>{" "}
            {dept.treasurer}
          </p>

          <p>
            <strong>Assistant:</strong>{" "}
            {dept.assistant}
          </p>

          <h3>
            Department Members (
            {dept.members.length})
          </h3>

          {dept.members.map((member) => (
            <div
              key={member.id}
              style={styles.memberCard}
            >
              <h4>{member.fullName}</h4>

              <p>📞 {member.phone}</p>

              <p>👤 {member.gender}</p>

              <p>
                <strong>Role:</strong>{" "}
                {member.role}
              </p>

              <div style={styles.actionButtons}>
                <button
                  style={styles.editBtn}
                  onClick={() =>
                    setEditingMember({
                      ...member,
                      departmentId: dept.id,
                    })
                  }
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    deleteMember(
                      dept.id,
                      member.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </AppLayout>
  );
}

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
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

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "10px",
    marginBottom: "15px",
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  departmentCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  departmentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  memberCard: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "10px",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  editBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteDepartmentBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Departments;