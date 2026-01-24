import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const ContactHero = () => {
  const form = useRef();

  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE;
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE;
  const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        toast.success("Email sent successfully");
        form.current.reset();
      })
      .catch((error) => {
        toast.error(error.text || "Failed to send email");
      });
  };
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".form-container", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 md:py-48">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-8">
            <h1 className="font-jakarta font-light text-5xl md:text-7xl tracking-tighter leading-[1]">
              Let’s
              <br />
              <span className="italic font-instrument text-muted-foreground/50">
                talk
              </span>
            </h1>

            <p className="font-instrument text-lg md:text-xl font-light text-muted-foreground/70 max-w-md leading-relaxed">
              Have a project, role, or idea in mind? I’m always open to
              thoughtful conversations and meaningful work.
            </p>
          </div>

          <div className="mt-16 space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/80 mb-2 ">
                Email
              </p>
              <a
                href="mailto:manishsuthar@gmail.com"
                className=" group inline-flex items-center gap-2 font-jakarta md:text-xl text-sm font-light text-foreground transition-all "
              >
                manishsuthar78775@gmail.com
                <span className="opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  →
                </span>
              </a>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/40 mb-2">
                Elsewhere
              </p>
              <div className="flex gap-8 font-jakarta text-base font-light">
                <a
                  className="hover:underline underline-offset-4"
                  href="https://www.linkedin.com/in/manish-suthar1/"
                >
                  LinkedIn
                </a>
                <a
                  className="hover:underline underline-offset-4"
                  href="https://github.com/manishsuthar01"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form Container */}
        <div className="lg:col-span-7 form-container">
          <div
            className="
                        relative
                        rounded-2xl
                        border border-border/60
                        bg-background
                        shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)]
                        px-6 py-10
                        sm:px-8 sm:py-12
                        md:px-12 md:py-14
                       "
          >
            <form className="space-y-10" onSubmit={sendEmail} ref={form}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input type="hidden" name="title" value="Portfolio Contact" />

                <Field label="Name" placeholder="John Doe" name="user_name" />
                <Field
                  label="Email"
                  placeholder="john@example.com"
                  type="email"
                  name="user_email"
                />
              </div>

              <Field
                label="Message"
                placeholder="Tell me briefly about what you want to build."
                textarea
                name="message"
              />

              <button
                type="submit"
                className="
          group
          inline-flex
          items-center
          gap-4
          text-sm
          uppercase
          tracking-[0.3em]
          text-muted-foreground
          border-b border-border/60
          pb-2    
          hover:text-foreground
          transition-colors
        "
              >
                Send message
                <span className="group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  placeholder,
  type = "text",
  textarea = false,
  name,
}) => (
  <div className="space-y-3">
    <label className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60">
      {label}
    </label>

    {textarea ? (
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        required
        className="w-full bg-transparent border-b border-border/60 py-3 font-jakarta outline-none focus:border-foreground resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="w-full bg-transparent border-b border-border/60 py-3 font-jakarta outline-none focus:border-foreground"
      />
    )}
  </div>
);

export default ContactHero;
