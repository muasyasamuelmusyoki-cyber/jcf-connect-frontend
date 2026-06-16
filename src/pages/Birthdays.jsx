import AppLayout from "../layouts/AppLayout";

function Birthdays() {
  return (
    <AppLayout>
      <h1>Birthdays</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        Upcoming birthdays will appear here.
      </div>
    </AppLayout>
  );
}

export default Birthdays;