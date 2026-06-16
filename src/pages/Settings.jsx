import AppLayout from "../layouts/AppLayout";

function Settings() {
  return (
    <AppLayout>
      <h2>⚙️ Settings</h2>

      <div style={styles.card}>
        Church Name: Joy Christian Fellowship
      </div>

      <div style={styles.card}>
        Theme: Built To Last
      </div>

      <div style={styles.card}>
        Location: Rongai
      </div>
    </AppLayout>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
};

export default Settings;