export default function Diagram({ title, data, labels }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <h4>{title}</h4>
      <ul>
        {data.map((value, i) => (
          <li key={i}>
            {labels[i]} → {value}%
          </li>
        ))}
      </ul>
    </div>
  );
}
