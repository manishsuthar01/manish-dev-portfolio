const Footer = () => {
  return (
    <footer className="dark-grid mt-20 w-full text-background">
      <div className="mx-auto max-w-7xl flex flex-col justify-evenly items-center-safe md:px-12 py-12 md:py-16">
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-x-20 
            gap-y-10
          "
        >
          <div className="flex flex-col gap-3">
            <h3 className="font-jakarta text-2xl md:text-3xl font-light tracking-tight text-center">
              Manish.
            </h3>
            <div className="font-instrument text-sm md:text-base text-white/50 space-y-0.5 text-center  ">
              <p>A design practice rooted in craft.</p>
              <p>Rajasthan, India</p>
            </div>
          </div>
 
          <div className="flex flex-col gap-4">
            <h4 className="font-jakarta text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/40 text-center">
              Get in touch
            </h4>
            <ul className="font-instrument text-sm md:text-base space-y-2 text-white/80 text-center ">
              <li>
                <a
                  href="mailto:manissuthar78775@gmail.com"
                  className="hover:text-white transition-colors border-b border-transparent hover:border-white/20"
                >
                  manissuthar78775@gmail.com
                </a>
              </li>
              <li>+91-8000740967</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-jakarta text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/40 text-center ">
              Socials
            </h4>
            <ul className="font-instrument text-sm md:text-base space-y-2 text-background/80 text-center ">
              {[
                { label: "Instagram", href: "https://www.instagram.com/money.s47?igsh=bWoxbm9laTJpdHFk" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/manish-suthar1/" },
                { label: "X / Twitter", href: "https://x.com/ManishSuth047" },
              ].map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors border-b border-transparent hover:border-background/20"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Reduced mt and pt */}
        <div
          className="
            mt-12
            pt-6
            border-t border-white/5
            flex 
            flex-col 
            md:flex-row 
            justify-between 
            items-center 
            gap-4
            text-center
          "
        >
          <p className="font-instrument text-[10px] uppercase tracking-[0.3em] text-white/20">
            © {new Date().getFullYear()} — MANISH SUTHAR
          </p>
          <p className="font-instrument text-[10px] uppercase tracking-[0.3em] text-white/20">
            Designed with Intent
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;