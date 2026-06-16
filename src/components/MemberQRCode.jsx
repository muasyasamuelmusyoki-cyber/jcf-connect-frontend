import QRCode from "react-qr-code";

function MemberQRCode({ member }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3>{member.fullName}</h3>

      <QRCode
        value={JSON.stringify({
          memberId: member.id,
          name: member.fullName,
        })}
        size={150}
      />

      <p>ID: {member.id}</p>
    </div>
  );
}

export default MemberQRCode;