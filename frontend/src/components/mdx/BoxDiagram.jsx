export default function BoxDiagram({ title, blocks = [] }) {
  if (!blocks.length) return null;
  console.log(blocks);

  return (
    <div className="not-prose my-14">
      {title && (
        <h4 className="mb-6 text-center font-jakarta text-sm uppercase tracking-widest text-muted">
          {title}
        </h4>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="min-w-[160px] rounded-xl border border-border/60  px-6 py-4 text-center shadow-sm"
          >
            <p className="font-medium">{block}</p>
            {block && (
              <p className="mt-1 text-sm text-foreground">
                {block}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
