import AppLayout from "../layouts/AppLayout";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

function Dashboard() {
  const { stats } = useContext(DashboardContext);

  const attendanceData = [
    {
      name: "Adults",
      value: stats.adultsAttendance || 450,
    },
    {
      name: "Teens",
      value: stats.teensAttendance || 120,
    },
    {
      name: "Children",
      value: stats.childrenAttendance || 180,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
  ];

  return (
    <AppLayout>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          📊 Dashboard
        </h1>

        <p style={styles.subtitle}>
          Welcome to JCF Connect Church
          Management System
        </p>
      </div>

      {/* TOP STATISTICS */}
      <div style={styles.grid}>
        <StatCard
          title="Members"
          value={stats.totalMembers || 0}
          color="#2563eb"
          icon="👥"
        />

        <StatCard
          title="Visitors"
          value={stats.totalVisitors || 0}
          color="#16a34a"
          icon="🙋"
        />

        <StatCard
          title="Departments"
          value={
            stats.totalDepartments || 0
          }
          color="#9333ea"
          icon="🏢"
        />

        <StatCard
          title="Attendance"
          value={
            stats.totalAttendance || 0
          }
          color="#0891b2"
          icon="📅"
        />

        <StatCard
          title="Highest Attendance"
          value={
            stats.highestAttendance ||
            0
          }
          color="#dc2626"
          icon="🔥"
        />

        <StatCard
          title="Average Attendance"
          value={
            stats.averageAttendance ||
            0
          }
          color="#f59e0b"
          icon="📈"
        />
      </div>

      {/* SECOND ROW */}
      <div style={styles.bottomGrid}>
        <div style={styles.panel}>
          <h3>
            📌 Recent Activity
          </h3>

          <ul style={styles.list}>
            <li>
              New members registered
            </li>
            <li>
              Visitors added
            </li>
            <li>
              Attendance records
              updated
            </li>
            <li>
              Departments created
            </li>
            <li>
              Reports uploaded
            </li>
          </ul>
        </div>

        <div style={styles.panel}>
          <h3>
            ⛪ Church Vision
          </h3>

          <p>
            Building disciples,
            empowering believers,
            transforming communities
            and advancing God's
            Kingdom.
          </p>
        </div>
      </div>

      {/* SUMMARY SECTION */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <h3>Total Members</h3>

          <h1>
            {stats.totalMembers || 0}
          </h1>
        </div>

        <div style={styles.summaryCard}>
          <h3>Total Visitors</h3>

          <h1>
            {stats.totalVisitors || 0}
          </h1>
        </div>

        <div style={styles.summaryCard}>
          <h3>
            Total Departments
          </h3>

          <h1>
            {stats.totalDepartments ||
              0}
          </h1>
        </div>

        <div style={styles.summaryCard}>
          <h3>
            Total Attendance
          </h3>

          <h1>
            {stats.totalAttendance ||
              0}
          </h1>
        </div>
      </div>

      {/* ATTENDANCE CHART */}
      <div style={styles.chartCard}>
        <h2>
          📊 Attendance
          Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
              data={attendanceData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label={({
                name,
                percent,
              }) =>
                `${name} ${(
                  percent * 100
                ).toFixed(0)}%`
              }
            >
              {attendanceData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div
          style={
            styles.chartSummary
          }
        >
          {attendanceData.map(
            (item, index) => (
              <div
                key={index}
                style={
                  styles.chartStat
                }
              >
                <h4>{item.name}</h4>

                <h2>
                  {item.value}
                </h2>
              </div>
            )
          )}
        </div>
      </div>
    </AppLayout>
  );
}

/* STAT CARD */

function StatCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      style={{
        ...styles.card,
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        style={styles.cardHeader}
      >
        <span
          style={styles.icon}
        >
          {icon}
        </span>

        <h4
          style={{
            margin: 0,
          }}
        >
          {title}
        </h4>
      </div>

      <h2
        style={{
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    width: "100%",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  icon: {
    fontSize: "24px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  panel: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  },

  list: {
    paddingLeft: "20px",
    lineHeight: "2",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  summaryCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  },

  chartCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    marginTop: "25px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
    width: "100%",
  },

  chartSummary: {
    display: "flex",
    justifyContent:
      "space-around",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },

  chartStat: {
    textAlign: "center",
  },
};

export default Dashboard;