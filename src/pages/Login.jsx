import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    login({
      id: 1,
      name: "System Administrator",
      email: form.email,
      role: "Admin",
    });

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>JCF CONNECT</h1>

        <p style={styles.subtitle}>
          JOY CHRISTIAN FELLOWSHIP – RONGAI
        </p>

        <p style={styles.slogan}>
          CITY OF CHAMPIONS
        </p>

        <input
          type="text"
          name="email"
          placeholder="Email or Phone"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },

  card: {
    width: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  logo: {
    marginBottom: "10px",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  slogan: {
    color: "#999",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#1f6feb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;