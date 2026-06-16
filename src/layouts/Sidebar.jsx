import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaLayerGroup,
  FaMoneyBill,
  FaCog,
  FaChartBar,
  FaChurch,
  FaCalendarCheck,
  FaBuilding,
  FaPrayingHands,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      {/* BRAND */}
      <div style={styles.brand}>
        <h2 style={styles.logo}>JCF CONNECT</h2>
        <p style={styles.subTitle}>JOY CHRISTIAN FELLOWSHIP</p>
        <p style={styles.city}>CITY OF CHAMPIONS</p>
      </div>

      {/* MAIN */}
      <div style={styles.menuSection}>
        <p style={styles.sectionTitle}>MAIN</p>

        <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
        <NavItem to="/members" icon={<FaUsers />} label="Members" />
        <NavItem to="/visitors" icon={<FaUserFriends />} label="Visitors" />
        <NavItem to="/groups" icon={<FaLayerGroup />} label="Growth Groups" />
        <NavItem
          to="/attendance"
          icon={<FaCalendarCheck />}
          label="Attendance"
        />
      </div>

      {/* MINISTRY */}
      <div style={styles.menuSection}>
        <p style={styles.sectionTitle}>MINISTRY</p>

        <NavItem
          to="/departments"
          icon={<FaBuilding />}
          label="Departments"
        />

        <NavItem
          to="/events"
          icon={<FaCalendarAlt />}
          label="Events"
        />

        <NavItem
          to="/prayers"
          icon={<FaPrayingHands />}
          label="Prayer Requests"
        />
      </div>

      {/* FINANCE */}
      <div style={styles.menuSection}>
        <p style={styles.sectionTitle}>FINANCE</p>

        <NavItem
          to="/finance"
          icon={<FaMoneyBill />}
          label="Finance"
        />

        <NavItem
          to="/reports"
          icon={<FaChartBar />}
          label="Reports"
        />
      </div>

      {/* SYSTEM */}
      <div style={styles.menuSection}>
        <p style={styles.sectionTitle}>SYSTEM</p>

        <NavItem
          to="/users"
          icon={<FaUserShield />}
          label="Users"
        />

        <NavItem
          to="/settings"
          icon={<FaCog />}
          label="Settings"
        />
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>

        <div style={styles.version}>
          <FaChurch />
          <span style={{ marginLeft: "10px" }}>
            JCF System v1.0
          </span>
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.link,
        background: isActive
          ? "linear-gradient(90deg,#2563eb,#1d4ed8)"
          : "transparent",
      })}
    >
      <span style={styles.icon}>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

const styles = {
  sidebar: {
    width: "270px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    borderRight: "1px solid #1e293b",
  },

  brand: {
    borderBottom: "1px solid #1e293b",
    paddingBottom: "20px",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
  },

  subTitle: {
    marginTop: "8px",
    marginBottom: "0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  city: {
    marginTop: "4px",
    color: "#3b82f6",
    fontSize: "12px",
    fontWeight: "600",
  },

  menuSection: {
    marginTop: "25px",
  },

  sectionTitle: {
    color: "#64748b",
    fontSize: "11px",
    letterSpacing: "1px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    borderRadius: "10px",
    color: "#ffffff",
    textDecoration: "none",
    marginBottom: "8px",
    transition: "0.3s",
    fontWeight: "500",
  },

  icon: {
    fontSize: "16px",
  },

  footer: {
    marginTop: "auto",
    borderTop: "1px solid #1e293b",
    paddingTop: "20px",
  },

  logoutButton: {
    width: "100%",
    padding: "12px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  version: {
    marginTop: "15px",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
  },
};

export default Sidebar;