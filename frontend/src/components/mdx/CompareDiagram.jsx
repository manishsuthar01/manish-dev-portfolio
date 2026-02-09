export default function CompareDiagram({
  leftTitle,
  rightTitle,
  leftPoints = [],
  rightPoints = [],
}) {
  return (
    <div className="not-prose my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left */}
        <div className="rounded-xl border border-border/60 p-6">
          <h4 className="mb-4 text-center font-jakarta text-sm uppercase tracking-widest">
            {leftTitle}
          </h4>
          <ul className="space-y-2 text-sm">
            {leftPoints.map((point, i) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="rounded-xl border border-border/60 p-6">
          <h4 className="mb-4 text-center font-jakarta text-sm uppercase tracking-widest">
            {rightTitle}
          </h4>
          <ul className="space-y-2 text-sm">
            {rightPoints.map((point, i) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
