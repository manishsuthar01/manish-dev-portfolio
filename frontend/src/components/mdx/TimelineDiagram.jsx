export default function TimelineDiagram({ title, steps = [] }) {
  if (!steps.length) return null;

  return (
    <div className="not-prose my-16">
      {title && (
        <h4 className="mb-8 text-center font-jakarta text-sm uppercase tracking-widest text-muted-foreground">
          {title}
        </h4>
      )}

      <div className="relative mx-auto max-w-xl border-l border-border/60 pl-6 space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-background border border-border" />
            <p className="font-medium">{step.title}</p>
            {step.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
