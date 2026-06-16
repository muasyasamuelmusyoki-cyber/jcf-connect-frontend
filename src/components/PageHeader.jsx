function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <h2>{title}</h2>
      <p style={{ color: "#64748b" }}>
        {subtitle}
      </p>
    </div>
  );
}

export default PageHeader;