import AppLayout from "../layouts/AppLayout";

function EmailCenter() {
  return (
    <AppLayout>
      <h1>Email Center</h1>

      <input
        placeholder="Subject"
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
      />

      <textarea
        rows="10"
        placeholder="Email message..."
        style={{
          width: "100%",
        }}
      />

      <button>
        Send Email
      </button>
    </AppLayout>
  );
}

export default EmailCenter;