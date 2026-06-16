import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function VolunteerManagement() {
  const [volunteers, setVolunteers] =
    useState([]);

  const [name, setName] = useState("");

  const addVolunteer = () => {
    if (!name) return;

    setVolunteers([
      ...volunteers,
      {
        id: Date.now(),
        name,
      },
    ]);

    setName("");
  };

  return (
    <AppLayout>
      <h1>Volunteer Management</h1>

      <input
        placeholder="Volunteer Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button onClick={addVolunteer}>
        Add Volunteer
      </button>

      {volunteers.map((v) => (
        <div key={v.id}>
          {v.name}
        </div>
      ))}
    </AppLayout>
  );
}

export default VolunteerManagement;