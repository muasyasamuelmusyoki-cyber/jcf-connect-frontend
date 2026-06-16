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
  },

  main: {
    flex: 1,
    background: "#f5f7fb",
  },

  content: {
    padding: "25px",
  },
};

export default AppLayout;