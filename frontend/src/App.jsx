import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import WorkPage from "./pages/work/WorkPage";
import ProjectDetailPage from "./pages/project/ProjectDetailPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailPage from "./pages/blog/BlogDetailPage";
import NotFoundPange from "./pages/not-found/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RequireAuth from "./features/auth/guards/RequireAuth";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import CreateBlogPage from "./pages/dashboard/blog/CreateBlogPage";
import AdminProjectPage from "./pages/dashboard/projects/AdminProjectPage";
import AdminBlogPage from "./pages/dashboard/blog/AdminBlogPage";
import AdminAnalyticsPage from "./pages/dashboard/analytics/AnalyticsPage";
import CustomCursor from "./components/CustomCursor";
import { GlobalLoader } from "./components/GlobalLoader";
import { useLoading } from "./context/LoadingContext";

const App = () => {
  const { isPageLoading } = useLoading();
  return (
    <>
      <GlobalLoader isVisible={isPageLoading} />
      <CustomCursor />

      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminAnalyticsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="blog/new" element={<CreateBlogPage />} />
          <Route path="projects" element={<AdminProjectPage />} />
          {/* <Route path="projects/new" element={<CreateProjectPage />} /> */}

          {/* <Route path="blog/:id/edit" element={<EditBlogPage />} /> */}
          {/* <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="projects/:id/edit" element={<EditProjectPage />} /> */}
        </Route>

        <Route path="/*" element={<NotFoundPange />}></Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
