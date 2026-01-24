import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import useLogOut from "@/features/auth/hooks/useLogOut";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { authUser } = useAuthContext();
  const { logOut, loading } = useLogOut();
  const [open, setOpen] = useState(false);
  const [showNavImage, setShowNavImage] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navItems = ["Home", "About", "Work", "Blog", "Contact"];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 605) {
        setShowNavImage(true);
      } else {
        setShowNavImage(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 800) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-500 font-instrument font-semibold sticky top-0 bg-transparent backdrop-blur-xs transition-transform duration-500 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-5 gap-6">
        <div className="flex items-center gap-3">
          <div
            className={`transition-all duration-500 ease-out overflow-hidden rounded-full border-2 border-primary shadow-sm
            ${showNavImage ? "w-8 h-8 opacity-100 ml-2" : "w-0 h-0 opacity-0 ml-0"}`}
          >
            <img
              src="/hero.png"
              className="w-full h-full object-cover"
              alt="Nav Profile"
            />
          </div>
          <NavLink
            to="/"
            className="font-jakarta text-xl font-light tracking-tighter text-foreground"
          >
            Manish
          </NavLink>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : ""
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {authUser ? (
            <>
              <NavLink
                to="/dashboard"
                className="rounded-full px-5 py-1.5 border border-border text-[11px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
              >
                Dashboard
              </NavLink>

              <button
                className="rounded-full px-5 py-1.5 bg-primary text-foreground text-[12px] uppercase tracking-widest border border-border hover:bg-foreground hover:text-background transition-all disabled:opacity-50"
                disabled={loading}
                onClick={logOut}
              >
                {loading ? "..." : "Logout"}
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-full px-5 py-1.5 bg-primary text-foreground text-[12px] uppercase tracking-widest border border-border hover:bg-foreground hover:text-background transition-all"
            >
              Login
            </NavLink>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-px bg-foreground" />
          <span className="w-6 h-px bg-foreground" />
          <span className="w-6 h-px bg-foreground" />
        </button>
      </div>

      {open && (
        <div className="md:hidden  px-6 py-6 space-y-6 bg-background">
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest text-foreground">
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `hover:text-foreground ${isActive ? "text-foreground" : ""}`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            {authUser ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-5 py-2 border border-border text-xs uppercase tracking-widest text-center"
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={() => {
                    logOut();
                    setOpen(false);
                  }}
                  disabled={loading}
                  className="rounded-full px-5 py-2 bg-primary text-foreground text-xs uppercase tracking-widest border border-border disabled:opacity-50"
                >
                  {loading ? "..." : "Logout"}
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full px-5 py-2 bg-primary text-foreground text-xs uppercase tracking-widest border border-border text-center"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
