import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function FollowUps() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

  const addTask = () => {
    if (!name) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name,
      },
    ]);

    setName("");
  };

  return (
    <AppLayout>
      <h1>Visitor Follow Ups</h1>

      <input
        placeholder="Visitor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addTask}>
        Add Follow Up
      </button>

      {tasks.map((task) => (
        <div key={task.id}>
          {task.name}
        </div>
      ))}
    </AppLayout>
  );
}

export default FollowUps;