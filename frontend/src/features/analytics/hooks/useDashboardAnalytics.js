import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const useDashboardAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getAnalysis = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics");
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to get Analytics");
      }

      setData(result.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAnalysis();
  }, [getAnalysis]); // Added dependency array to prevent infinite loop

  return { data, loading };
};

export default useDashboardAnalytics;
