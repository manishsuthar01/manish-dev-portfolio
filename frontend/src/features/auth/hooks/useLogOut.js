import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import gsap from "gsap";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logOut = async () => {
    setLoading(true);
    
    // 1. Trigger the GSAP Exit Animation first
    // This targets your main layout container
    const tl = gsap.timeline();
    
    tl.to("#root", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.inOut"
    });

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // 2. Perform state cleanup after animation starts
      localStorage.removeItem("authUser");
      
      // Delay the state update slightly so the animation can be seen
      setTimeout(() => {
        setAuthUser(null);
        // Reset the root visibility for the Login page
        gsap.set("#root", { opacity: 1, y: 0 });
      }, 500);

      toast.success("Session closed.");
    } catch (error) {
      // If error, bring the UI back
      gsap.to("#root", { opacity: 1, y: 0, duration: 0.3 });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logOut };
};

export default useLogOut;