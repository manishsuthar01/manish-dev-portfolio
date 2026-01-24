import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <main className="protect-main w-full ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
