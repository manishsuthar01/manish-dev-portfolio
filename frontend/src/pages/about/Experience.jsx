const Experience = () => {
  const history = [
    {
      role: "Full Stack Developer",
      company: "Freelance",
      year: "2024 — Present",
      note: "Owning problems end-to-end, from architecture to interface, with a strong focus on clarity and long-term maintainability.",
    },
    {
      role: "Frontend Engineer",
      company: "Tech Studio",
      year: "2023 — 2024",
      note: "Worked on UI systems, performance optimization, and interaction patterns for real-world products.",
    },
    {
      role: "Open Source Contributor",
      company: "GitHub",
      year: "2022 — 2023",
      note: "Collaborated in public repositories, learning through feedback, reviews, and shared ownership.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 border-b border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="sticky top-32 space-y-6">
            <h2 className="font-jakarta text-xs uppercase tracking-[0.45em] text-muted-foreground/60">
              02 / Experience
            </h2>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="border-t border-border/50">
            {history.map((item, index) => (
              <div
                key={index}
                className="group border-b border-border/50 transition-colors duration-300 hover:bg-sand/40"
              >
                <div className="flex flex-col md:flex-row justify-between gap-10 py-12">
                  <div className="space-y-4">
                    <h3 className="font-jakarta text-2xl md:text-3xl font-light tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1">
                      {item.role}
                    </h3>

                    <p className="font-instrument text-base md:text-lg italic text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">
                      {item.company}
                    </p>

                    <p className="font-instrument text-base md:text-lg text-muted-foreground/60 max-w-xl leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                      {item.note}
                    </p>
                  </div>

                  <div className="flex items-start md:items-center">
                    <span className="font-instrument text-sm uppercase tracking-widest text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
