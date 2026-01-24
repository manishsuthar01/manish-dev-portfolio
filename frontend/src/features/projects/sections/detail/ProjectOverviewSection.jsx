const ProjectOverviewSection = ({ project }) => {
  return (
    <section className="mx-auto max-w-7xl px-10 md:px-12 py-16 md:py-24 ">
      <div className="w-full">
        <div className="flex  items-center justify-center">
          <div className="md:col-span-8 lg:col-span-7 space-y-6 md:space-y-8">
            
            <h2 className="font-jakarta text-xl md:text-2xl font-medium leading-tight text-foreground tracking-tight">
              The Objective
            </h2>
            
            <p className="font-instrument text-base sm:text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
              {project?.description || 
                "Strategic overview of the project's core purpose and the problems we set out to solve through intentional engineering and refined design systems."}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverviewSection;