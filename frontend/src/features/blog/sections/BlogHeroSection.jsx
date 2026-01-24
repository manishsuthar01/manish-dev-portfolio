import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BlogHeroSection = ({ blog }) => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-line", {
      width: 0,
      duration: 1.5,
      ease: "power4.inOut",
    }).from(
      ".reveal-text",
      {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
      },
      "-=0.8",
    );
  }, [blog]);

  return (
    <section className="relative w-full flex flex-col justify-end px-10 md:px-12 pt-24 pb-12 md:pt-32 md:pb-20 bg-background">
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end mb-12 md:mb-16">
          <div className="md:col-span-9 lg:col-span-8 overflow-hidden">
            <p className="font-jakarta text-[10px] uppercase tracking-[0.5em] text-muted-foreground/40 mb-6 md:mb-8 block">
              Published / {new Date(blog?.publishedAt).getFullYear() || "2026"}
            </p>
            <h1 className="font-jakarta font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.1] tracking-tight">
              <span className="reveal-text block">{blog?.title}</span>
            </h1>
          </div>

          <div className="md:col-span-3 lg:col-span-4 flex md:justify-end">
            <div className="max-w-[180px] md:text-right">
              <p className="font-instrument italic text-base md:text-lg text-muted-foreground/60 leading-snug">
                Insights into the craft of digital creation.
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-[3rem] shadow-xl">
          <div className="hero-line absolute top-0 left-0 h-px bg-foreground/20 z-10" />
          <img
            src={blog?.imageUrl}
            className="h-full w-full object-cover transition-transform duration-[3s] hover:scale-105"
            alt={blog?.title}
          />
          <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 pt-8 mt-10 border-t border-border/30">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
              Reading Time
            </span>
            <span className="text-xs md:text-sm font-jakarta uppercase tracking-wide">
              {blog?.readingTime || "6 Min Read"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/80">
              Last Updated
            </span>
            <span className="text-xs md:text-sm font-jakarta uppercase tracking-wide">
              {new Date(blog?.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/80">
              Author
            </span>
            <span className="text-xs md:text-sm font-jakarta uppercase tracking-wide">
              Manish Suthar
            </span>
          </div>
          <div className="flex flex-col gap-1.5 md:items-end">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/80">
              Action
            </span>
            <span className="text-xs md:text-sm font-jakarta uppercase cursor-pointer hover:text-muted-foreground transition-colors flex items-center gap-1">
              Copy Link <span className="text-lg">↗</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSection;
