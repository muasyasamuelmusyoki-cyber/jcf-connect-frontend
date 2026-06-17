import AppLayout from "../layouts/AppLayout";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

function Dashboard() {
  const { stats } = useContext(DashboardContext);

  return (
    <AppLayout>
      <div style={styles.header}>
        <h1>📊 Dashboard</h1>
        <p>Welcome to JCF Connect</p>
      </div>

      {/* STATS GRID */}
      <div style={styles.grid}>
        <StatCard title="Members" value={stats.totalMembers} color="#2563eb" icon="👥" />
        <StatCard title="Visitors" value={stats.totalVisitors} color="#16a34a" icon="🙋" />
        <StatCard title="Groups" value={stats.totalGroups} color="#9333ea" icon="🏠" />
        <StatCard title="Attendance" value={stats.totalAttendance || 0} color="#0891b2" icon="📅" />
        <StatCard title="Tithes" value={`KES ${stats.totalTithe}`} color="#dc2626" icon="💰" />
        <StatCard title="Offerings" value={`KES ${stats.totalOffering}`} color="#f59e0b" icon="🎁" />
      </div>

      {/* SECTIONS */}
      <div style={styles.bottomGrid}>
        <div style={styles.panel}>
          <h3>Recent Activity</h3>
          <ul>
            <li>Member added</li>
            <li>Visitor recorded</li>
            <li>Attendance updated</li>
          </ul>
        </div>

        <div style={styles.panel}>
          <h3>Church Vision</h3>
          <p>Building disciples and transforming lives.</p>
        </div>
      </div>
    </AppLayout>
  );
}

/* CARD */
function StatCard({ title, value, color, icon }) {
  return (
    <div style={{ ...styles.card, borderTop: `5px solid ${color}` }}>
      <div style={styles.cardHeader}>
        <span style={styles.icon}>{icon}</span>
        <h4 style={{ margin: 0 }}>{title}</h4>
      </div>

      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}

/* STYLES (FULL RESPONSIVE) */
const styles = {
  header: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    width: "100%",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    minWidth: 0,
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  icon: {
    fontSize: "22px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
    marginTop: "20px",
    width: "100%",
  },

  panel: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    minWidth: 0,
  },
};

export default Dashboard;