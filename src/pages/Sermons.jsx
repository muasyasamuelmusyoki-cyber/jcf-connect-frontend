import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("");

  const addSermon = () => {
    if (!title) return;

    setSermons([
      ...sermons,
      {
        id: Date.now(),
        title,
        preacher,
      },
    ]);

    setTitle("");
    setPreacher("");
  };

  return (
    <AppLayout>
      <h1>Sermons Library</h1>

      <input
        placeholder="Sermon Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Preacher"
        value={preacher}
        onChange={(e) =>
          setPreacher(e.target.value)
        }
      />

      <button onClick={addSermon}>
        Add Sermon
      </button>

      {sermons.map((s) => (
        <div key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.preacher}</p>
        </div>
      ))}
    </AppLayout>
  );
}

export default Sermons;