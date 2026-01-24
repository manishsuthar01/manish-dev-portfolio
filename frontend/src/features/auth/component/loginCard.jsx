import React, { useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import useLogin from "../hooks/useLogin";

const LoginCard = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const { login, loading } = useLogin();
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
      gsap.from(".login-element", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) {
      navigate("/");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center  px-6 overflow-hidden"
    >
      <div className="absolute top-12 left-12">
        <p className="font-instrument text-[10px] uppercase tracking-[0.5em] text-muted-foreground/30">
          Secure / Authentication / Gateway
        </p>
      </div>

      <div className="login-card w-full max-w-md overflow-hidden rounded-[2rem] border border-border/60 bg-background p-10 md:p-14 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.1)]">
        <div className="mb-12 space-y-3 text-center login-element">
          <h1 className="font-jakarta text-4xl font-light tracking-tighter">
            Admin{" "}
            <span className="italic font-instrument text-muted-foreground/50 text-3xl">
              Portal
            </span>
          </h1>
          <p className="font-instrument text-sm text-muted-foreground/60 font-light">
            Enter system credentials to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6 login-element">
            <div className="space-y-2">
              <label className="font-instrument text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                Identity
              </label>
              <input
                type="text"
                placeholder="userName"
                className="w-full bg-transparent border-b border-border/50 py-2 font-jakarta text-base outline-none focus:border-foreground transition-colors"
                onChange={(e) =>
                  setCredentials({ ...credentials, userName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="font-instrument text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                Passphrase
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-border/50 py-2 font-jakarta text-base outline-none focus:border-foreground transition-colors"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-element group relative w-full overflow-hidden rounded-full  py-4 text-[10px] uppercase tracking-[0.4em] text-foreground hover:bg-foreground hover:text-background"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 ">
              {/* {loading ? <span className="font-black">....</span> : "Login"} */}
              <span>login→</span>
            </span>
          </button>
        </form>
      </div>

      <div className="absolute bottom-12 right-12">
        <p className="font-instrument text-[9px] uppercase tracking-widest text-muted-foreground/20">
          Encrypted Session — TLS 1.3
        </p>
      </div>
    </section>
  );
};

export default LoginCard;
