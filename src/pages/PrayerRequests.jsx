import { useState } from "react";
import AppLayout from "../layouts/AppLayout";

function PrayerRequests() {
  const [requests, setRequests] = useState([]);
  const [text, setText] = useState("");

  const addRequest = () => {
    if (!text) return;

    setRequests([
      ...requests,
      {
        id: Date.now(),
        request: text,
      },
    ]);

    setText("");
  };

  return (
    <AppLayout>
      <h2>🙏 Prayer Requests</h2>

      <div style={styles.form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Prayer Request"
        />

        <button onClick={addRequest}>
          Add
        </button>
      </div>

      {requests.map((r) => (
        <div key={r.id} style={styles.card}>
          {r.request}
        </div>
      ))}
    </AppLayout>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
};

export default PrayerRequests;