import QRCode from "react-qr-code";

function MemberCard({ member }) {
  return (
    <div
      style={{
        width: "400px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        border: "2px solid #1f6feb",
      }}
    >
      <h2>JOY CHRISTIAN FELLOWSHIP – RONGAI</h2>
      <p>CITY OF CHAMPIONS</p>

      <hr />

      <h3>{member.fullName}</h3>

      <p>Member No: {member.memberNumber}</p>
      <p>Department: {member.department}</p>
      <p>Growth Group: {member.group}</p>

      <QRCode
        value={member.id.toString()}
        size={100}
      />
    </div>
  );
}

export default MemberCard;