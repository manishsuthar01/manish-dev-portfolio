export default function Alert({ severity = "info", children }) {
  const colors = {
    info: "#2563eb",
    warning: "#d97706",
    error: "#dc2626",
  };

  return (
    <div style={{
      border: `1px solid ${colors[severity]}`,
      padding: "1rem",
      margin: "1rem 0"
    }}>
      {children}
    </div>
  );
}
