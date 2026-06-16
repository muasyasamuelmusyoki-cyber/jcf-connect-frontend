import AppLayout from "../layouts/AppLayout";

function SMS() {
  return (
    <AppLayout>
      <h1>SMS Center</h1>

      <textarea
        placeholder="Type SMS message..."
        rows="8"
        style={{
          width: "100%",
        }}
      />

      <button>
        Send SMS
      </button>
    </AppLayout>
  );
}

export default SMS;