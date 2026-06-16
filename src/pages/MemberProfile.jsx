import AppLayout from "../layouts/AppLayout";

function MemberProfile() {
  return (
    <AppLayout>
      <h1>Member Profile</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Profile Details</h2>

        <p>
          Full profile view will appear
          here.
        </p>
      </div>
    </AppLayout>
  );
}

export default MemberProfile;