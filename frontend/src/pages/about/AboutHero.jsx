const AboutHero = () => {
  return (
    <section className="mx-auto max-w-7xl px-10 md:px-12 py-20 md:py-32 border-b border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        
        <div className="md:col-span-4">
          <h2 className="font-jakarta text-[10px] md:text-xs uppercase tracking-[0.45em] text-muted-foreground/60 sticky top-32">
            01 / Profile
          </h2>
        </div>

        <div className="md:col-span-8 flex flex-col gap-10 md:gap-12">
          {/* Main Heading - Matched to text-4xl sm:text-5xl md:text-8xl scale */}
          <h1 className="font-jakarta font-light text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.1] ">
            Intent over noise.
          </h1>

          {/* Body Text - Consistent with Project descriptions */}
          <div className="max-w-2xl space-y-8 font-instrument text-base sm:text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
            <p>
              I’m Manish, a full-stack developer based in India. I approach
              software as a system of decisions — how things scale, how they
              behave, and how they feel to use. I care deeply about structure,
              clarity, and long-term maintainability.
            </p>

            <p>
              My work lives between frontend engineering and system design. I
              enjoy breaking down complex problems into calm, understandable
              interfaces and clean internal architectures. If something feels
              heavy or over-engineered, I see it as a signal to simplify.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;