import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar";

function AppLayout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
  },

  main: {
    flex: 1,
    background: "#f5f7fb",
    width: "100%",
    overflowX: "hidden",
  },

  content: {
    padding: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default AppLayout;