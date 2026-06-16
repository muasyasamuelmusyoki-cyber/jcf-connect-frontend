import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const addAnnouncement = () => {
    if (!message) return;

    setAnnouncements([
      ...announcements,
      {
        id: Date.now(),
        message,
      },
    ]);

    setMessage("");
  };

  return (
    <AppLayout>
      <h1>Church Announcements</h1>

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Announcement..."
      />

      <button onClick={addAnnouncement}>
        Add
      </button>

      {announcements.map((a) => (
        <div key={a.id}>
          {a.message}
        </div>
      ))}
    </AppLayout>
  );
}

export default Announcements;