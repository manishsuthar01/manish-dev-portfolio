import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ userName, password }) => {
    const success = errorhandler({ userName, password });
    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authUser", JSON.stringify(data.data));
        setAuthUser(data.data);
        return true;
      } else {
        throw new Error(data.message || "Login Failed!");
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function errorhandler({ userName, password }) {
  if (!userName || !password) {
    toast.error("Please fill in all fields ");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 character");
    return false;
  }
  return true;
}
