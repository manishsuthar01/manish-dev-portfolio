import React from "react";

const ServicesSection = () => {
  const services = [
    "Full-Stack Development",
    "Frontend / UI Engineering",
    "System Architecture & APIs",
  ];

  return (
    <section className="mt-10 py-12 md:py-20 mx-auto flex flex-col items-center w-full overflow-hidden">
      <div className="mb-20 md:mb-30 max-w-2xl text-center px-4">
        <h2 className="font-jakarta font-light tracking-tight text-4xl sm:text-5xl md:text-7xl text-foreground leading-[1.1]">
          what i bring to the table
        </h2>
      </div>

      <div className="w-full border-t border-border">
        {services.map((service, index) => (
          <div
            key={index}
            className="link group w-full py-8 md:py-12 flex flex-col items-center justify-center border-b border-border/50 transition-colors relative overflow-hidden cursor-pointer"
          >
            <h1 className="font-jakarta text-[6vw] md:text-[4vw] lg:text-[3.5vw] whitespace-nowrap font-light text-foreground/80 group-hover:opacity-0 transition-opacity duration-300 px-6">
              {service}
            </h1>

            <div className="moveLink pointer-events-none absolute inset-0 flex items-center bg-primary z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]">
              <div className="moveX flex items-center animate-marquee">
                {[...Array(8)].map((_, i) => (
                  <React.Fragment key={i}>
                    <h2 className="whitespace-nowrap font-jakarta font-light text-[6vw] md:text-[4vw] lg:text-[3.5vw] px-6 md:px-10 tracking-tight">
                      {service}
                    </h2>
                    <div className="shrink-0 w-16 h-8 md:w-32 md:h-16 mx-2 md:mx-4 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg"
                        alt=""
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
