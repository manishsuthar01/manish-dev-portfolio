import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FolderCode,
  BookOpen,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import useLogOut from "@/features/auth/hooks/useLogOut";

const Sidebar = () => {
  const { logOut, loading } = useLogOut();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Analytics", icon: <LayoutGrid size={16} />, href: "/dashboard" },
    {
      name: "Projects",
      icon: <FolderCode size={16} />,
      href: "/dashboard/projects",
    },
    { name: "Blog", icon: <BookOpen size={16} />, href: "/dashboard/blog" },
  ];

  return (
    <aside className=" sticky top-0  h-screen w-64 border-r border-border/60 bg-background flex flex-col z-50">
      <div className="px-8 py-10">
        <div className="flex flex-col gap-1">
          <span
            className="font-jakarta text-lg font-light tracking-tighter text-foreground cursor-pointer"
            onClick={() => navigate("/")}
          >
            Manish<span className="text-primary">.</span>
          </span>
          <span className="font-instrument text-[9px] uppercase tracking-[0.4em] text-muted-foreground/50">
            Admin System
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              group flex items-center justify-between px-4 py-3 transition-all duration-300
              ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground/90 hover:text-foreground hover:translate-x-1"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <span className="text-current">{item.icon}</span>
              <span className="font-instrument text-[11px] uppercase tracking-[0.2em]">
                {item.name}
              </span>
            </div>
            {/* Minimal Indicator */}
            <ArrowUpRight
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-border/40 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-instrument text-[10px] uppercase tracking-widest text-muted-foreground">
            System Online
          </span>
        </div>

        <button
          onClick={logOut}
          disabled={loading}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border/60 font-instrument text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-foreground hover:border-transparent transition-all duration-500 cursor-pointer"
        >
          <LogOut size={14} />
          {loading ? "Closing..." : "Sign Out"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
