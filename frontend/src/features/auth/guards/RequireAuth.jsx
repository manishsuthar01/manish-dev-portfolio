import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const RequireAuth = ({ children }) => {
  const { authUser, loading } = useAuthContext(); // Assume your context tracks initial loading
  const location = useLocation();

  // 1. Show a clean, minimal loader while checking session
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="space-y-4 text-center">
           <div className="h-px w-12 bg-primary animate-pulse mx-auto" />
           <p className="font-instrument text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40">
             Verifying Session
           </p>
        </div>
      </div>
    );
  }

  // 2. Redirect to login, but save the current location so we can send them back after login
  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;