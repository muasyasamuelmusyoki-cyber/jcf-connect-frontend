import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const today =
    new Date().toLocaleDateString();

  return (
    <div style={styles.navbar}>
      <div>
        <h3 style={{ margin: 0 }}>
          JCF Connect
        </h3>

        <p style={styles.date}>
          {today}
        </p>
      </div>

      <div style={styles.right}>
        <div style={styles.notification}>
          🔔
        </div>

        <div style={styles.user}>
          <div>
            <strong>
              {user?.name}
            </strong>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Administrator
            </p>
          </div>
        </div>

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    height: "70px",
    background: "#fff",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "0 25px",
    borderBottom:
      "1px solid #e2e8f0",
  },

  date: {
    margin: 0,
    fontSize: "12px",
    color: "#64748b",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  notification: {
    fontSize: "22px",
    cursor: "pointer",
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoutBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Navbar;