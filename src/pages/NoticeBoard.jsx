import AppLayout from "../layouts/AppLayout";

function NoticeBoard() {
  return (
    <AppLayout>
      <h1>Notice Board</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Upcoming Sunday Service</h3>

        <p>
          Theme: Built To Last
        </p>

        <p>
          Time: 8:00 AM
        </p>
      </div>
    </AppLayout>
  );
}

export default NoticeBoard;