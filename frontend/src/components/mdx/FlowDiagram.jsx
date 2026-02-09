import React from "react";

export default function FlowDiagram({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <div className="not-prose my-14">
      <div className="flex flex-col items-center gap-4">

        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Box */}
            <div className="w-full max-w-md rounded-xl border border-border/60 bg-background px-6 py-4 text-center shadow-sm">
              <p className="font-jakarta text-sm md:text-base font-medium">
                {step}
              </p>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="text-muted-foreground text-xl leading-none">
                ↓
              </div>
            )}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
}
