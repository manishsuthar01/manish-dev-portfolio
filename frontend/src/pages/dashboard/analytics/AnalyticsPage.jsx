import Analytics from "@/features/analytics/components/Analytics";
import useDashboardAnalytics from "@/features/analytics/hooks/useDashboardAnalytics";
import React from "react";

const AdminAnalyticsPage = () => {
  console.log("analylis page  chala");
  const { data, loading } = useDashboardAnalytics();
  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center font-jakarta text-muted-foreground italic">
        Fetching Analytics...
      </div>
    );
  }
  return <Analytics data={data} />;
};

export default AdminAnalyticsPage;
