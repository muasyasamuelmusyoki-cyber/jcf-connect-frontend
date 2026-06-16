import AppLayout from "../layouts/AppLayout";

function Reports() {
  return (
    <AppLayout>
      <h2>📊 Reports</h2>

      <div style={styles.card}>
        Membership Reports
      </div>

      <div style={styles.card}>
        Attendance Reports
      </div>

      <div style={styles.card}>
        Financial Reports
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

export default Reports;