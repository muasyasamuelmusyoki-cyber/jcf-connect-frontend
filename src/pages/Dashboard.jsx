import AppLayout from "../layouts/AppLayout";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

import {
  FaUsers,
  FaUserFriends,
  FaLayerGroup,
  FaMoneyBillWave,
  FaGift,
  FaCalendarCheck,
} from "react-icons/fa";

function Dashboard() {
  const { stats } = useContext(DashboardContext);

  return (
    <AppLayout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>
            Welcome to JCF Connect Church Management System
          </p>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={<FaUsers />}
          color="#2563eb"
        />

        <StatCard
          title="Visitors"
          value={stats.totalVisitors}
          icon={<FaUserFriends />}
          color="#16a34a"
        />

        <StatCard
          title="Growth Groups"
          value={stats.totalGroups}
          icon={<FaLayerGroup />}
          color="#9333ea"
        />

        <StatCard
          title="Tithes"
          value={`KES ${stats.totalTithe}`}
          icon={<FaMoneyBillWave />}
          color="#ea580c"
        />

        <StatCard
          title="Offerings"
          value={`KES ${stats.totalOffering}`}
          icon={<FaGift />}
          color="#dc2626"
        />

        <StatCard
          title="Attendance"
          value={stats.totalAttendance || 0}
          icon={<FaCalendarCheck />}
          color="#0891b2"
        />
      </div>

      {/* CONTENT SECTION */}
      <div style={styles.bottomGrid}>
        {/* RECENT ACTIVITY */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>
            Recent Activity
          </h3>

          <div style={styles.activity}>
            ✅ New Member Registered
          </div>

          <div style={styles.activity}>
            ✅ Visitor Follow-Up Added
          </div>

          <div style={styles.activity}>
            ✅ Offering Recorded
          </div>

          <div style={styles.activity}>
            ✅ Attendance Updated
          </div>
        </div>

        {/* CHURCH INFO */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>
            Church Vision
          </h3>

          <p style={styles.vision}>
            Building disciples, empowering believers,
            and advancing the Kingdom of God through
            worship, fellowship, discipleship and
            outreach.
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.quickActions}>
        <h3 style={styles.panelTitle}>
          Quick Actions
        </h3>

        <div style={styles.actionGrid}>
          <button style={styles.actionBtn}>
            Add Member
          </button>

          <button style={styles.actionBtn}>
            Register Visitor
          </button>

          <button style={styles.actionBtn}>
            Record Attendance
          </button>

          <button style={styles.actionBtn}>
            Add Finance Record
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      style={{
        ...styles.card,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div
        style={{
          ...styles.iconBox,
          color,
        }}
      >
        {icon}
      </div>

      <div>
        <p style={styles.cardTitle}>
          {title}
        </p>

        <h2 style={styles.cardValue}>
          {value}
        </h2>
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  },

  iconBox: {
    fontSize: "30px",
  },

  cardTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  cardValue: {
    margin: "5px 0 0 0",
    fontSize: "28px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(400px,1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  panel: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  },

  panelTitle: {
    marginTop: 0,
    marginBottom: "15px",
  },

  activity: {
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  vision: {
    lineHeight: "1.8",
    color: "#475569",
  },

  quickActions: {
    background: "#fff",
    marginTop: "25px",
    padding: "20px",
    borderRadius: "14px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
  },

  actionBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Dashboard;