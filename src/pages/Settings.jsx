import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    churchName: "Joy Christian Fellowship",
    churchBranch: "Rongai",
    slogan: "City of Champions",
    churchPhone: "",
    churchEmail: "",
    allowDepartmentEdits: false,
    darkMode: false,
    smsNotifications: true,
    emailNotifications: true,
  });

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("settings"));

    if (saved) {
      setSettings(saved);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert("Settings Saved Successfully");
  };

  return (
    <AppLayout>
      <h1>⚙️ System Settings</h1>

      {/* CHURCH DETAILS */}
      <div style={styles.card}>
        <h2>Church Information</h2>

        <div style={styles.grid}>
          <input
            name="churchName"
            value={settings.churchName}
            onChange={handleChange}
            placeholder="Church Name"
          />

          <input
            name="churchBranch"
            value={settings.churchBranch}
            onChange={handleChange}
            placeholder="Branch"
          />

          <input
            name="slogan"
            value={settings.slogan}
            onChange={handleChange}
            placeholder="Church Theme"
          />

          <input
            name="churchPhone"
            value={settings.churchPhone}
            onChange={handleChange}
            placeholder="Church Phone"
          />

          <input
            name="churchEmail"
            value={settings.churchEmail}
            onChange={handleChange}
            placeholder="Church Email"
          />
        </div>
      </div>

      {/* SYSTEM SETTINGS */}
      <div style={styles.card}>
        <h2>System Preferences</h2>

        <div style={styles.option}>
          <label>
            Allow Department Leaders
            To Edit Records
          </label>

          <input
            type="checkbox"
            name="allowDepartmentEdits"
            checked={
              settings.allowDepartmentEdits
            }
            onChange={handleChange}
          />
        </div>

        <div style={styles.option}>
          <label>Enable Dark Mode</label>

          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div style={styles.card}>
        <h2>Notifications</h2>

        <div style={styles.option}>
          <label>SMS Notifications</label>

          <input
            type="checkbox"
            name="smsNotifications"
            checked={
              settings.smsNotifications
            }
            onChange={handleChange}
          />
        </div>

        <div style={styles.option}>
          <label>Email Notifications</label>

          <input
            type="checkbox"
            name="emailNotifications"
            checked={
              settings.emailNotifications
            }
            onChange={handleChange}
          />
        </div>
      </div>

      {/* SECURITY */}
      <div style={styles.card}>
        <h2>Security</h2>

        <p>
          Admin users manage all permissions.
        </p>

        <p>
          Department leaders can only access
          their departments.
        </p>

        <p>
          All sensitive changes require admin
          approval.
        </p>
      </div>

      {/* BACKUP */}
      <div style={styles.card}>
        <h2>Backup & Restore</h2>

        <button style={styles.button}>
          Backup System
        </button>

        <button style={styles.restoreBtn}>
          Restore Backup
        </button>
      </div>

      <button
        style={styles.saveBtn}
        onClick={saveSettings}
      >
        Save Settings
      </button>
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

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  option: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },

  restoreBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  saveBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Settings;