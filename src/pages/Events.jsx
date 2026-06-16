import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    description: "",
  });

  const addEvent = () => {
    if (!form.name) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({
      name: "",
      date: "",
      venue: "",
      description: "",
    });
  };

  return (
    <AppLayout>
      <h2>🎉 Events</h2>

      <div style={styles.form}>
        <input
          placeholder="Event Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) =>
            setForm({
              ...form,
              venue: e.target.value,
            })
          }
        />

        <button onClick={addEvent}>
          Add Event
        </button>
      </div>

      {events.map((event) => (
        <div key={event.id} style={styles.card}>
          <h3>{event.name}</h3>

          <p>📅 {event.date}</p>

          <p>📍 {event.venue}</p>
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
    flexWrap: "wrap",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
};

export default Events;