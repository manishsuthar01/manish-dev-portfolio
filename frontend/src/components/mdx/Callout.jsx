export default function Callout({ type = "info", title, children }) {
  return (
    <div style={{
      borderLeft: "4px solid #3b82f6",
      padding: "1rem",
      margin: "1rem 0",
      background: "#f8fafc"
    }}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
