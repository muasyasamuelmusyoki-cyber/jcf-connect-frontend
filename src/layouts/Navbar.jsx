function Navbar() {
  return (
    <div style={styles.navbar}>
      <div>
        <h3 style={{ margin: 0 }}>Dashboard</h3>
        <small style={{ color: "#666" }}>Welcome back, Admin</small>
      </div>

      <div style={styles.right}>
        <span>📅 {new Date().toDateString()}</span>
        <button style={styles.btn}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #eee",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  btn: {
    padding: "6px 12px",
    background: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;