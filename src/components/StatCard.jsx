function StatCard({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>

      <div>
        <p style={styles.title}>{title}</p>
        <h2 style={styles.value}>{value}</h2>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  icon: {
    fontSize: "30px",
  },

  title: {
    color: "#64748b",
    margin: 0,
  },

  value: {
    margin: 0,
  },
};

export default StatCard;