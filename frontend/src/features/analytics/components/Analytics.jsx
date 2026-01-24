import React, { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Analytics = memo(({ data }) => {
  if (!data || !data.blogs || !data.projects) return null;
  const { blogs, projects } = data;

  const barData = [
    {
      name: "Blogs",
      total: blogs.total,
      published: blogs.published,
      drafts: blogs.drafts,
    },
    {
      name: "Projects",
      total: projects.total,
      published: projects.published,
      drafts: projects.drafts,
    },
  ];

  const blogStatusData = [
    { name: "Published", value: blogs.published },
    { name: "Drafts", value: blogs.drafts },
  ];

  const COLORS = ["#10b981", "#6b7280"];

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-jakarta">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Analytics Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Real-time performance of your portfolio and thoughts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Blogs"
          value={blogs.total}
          subValue={`${blogs.published} Published`}
        />
        <StatCard
          title="Total Projects"
          value={projects.total}
          subValue={`${projects.published} Published`}
        />
        <StatCard
          title="Active Drafts"
          value={blogs.drafts + projects.drafts}
          subValue="Require attention"
        />
        <StatCard title="Success Rate" value="100%" subValue="System Online" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-xl border border-border  shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Content Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="published"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
                <Bar
                  dataKey="drafts"
                  fill="#6b7280"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border  shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Blog Status</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={blogStatusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {blogStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
});

const StatCard = ({ title, value, subValue }) => (
  <div className="p-6 rounded-xl border border-border  shadow-sm hover:border-accent transition-colors">
    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
      {title}
    </p>
    <h2 className="text-4xl font-bold mt-2 text-foreground">{value}</h2>
    <p className="text-xs text-accent mt-2 font-medium">{subValue}</p>
  </div>
);

export default Analytics;
