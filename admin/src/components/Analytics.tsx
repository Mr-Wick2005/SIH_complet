import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getCategoryStats, mockReports } from "../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Download, Calendar } from "lucide-react";
import { Button } from "./ui/button";

export function Analytics() {
  const categoryData = getCategoryStats();
  
  // Response time data (mock)
  const responseTimeData = [
    { department: "Sanitation", avgHours: 2.4 },
    { department: "Public Works", avgHours: 4.2 },
    { department: "Water Supply", avgHours: 1.8 },
    { department: "Traffic", avgHours: 0.8 },
    { department: "Parks", avgHours: 8.5 },
    { department: "Lighting", avgHours: 6.3 },
  ];

  // Weekly trend data (mock)
  const weeklyTrendData = [
    { day: "Mon", reports: 12, resolved: 8 },
    { day: "Tue", reports: 19, resolved: 15 },
    { day: "Wed", reports: 8, resolved: 12 },
    { day: "Thu", reports: 15, resolved: 10 },
    { day: "Fri", reports: 22, resolved: 18 },
    { day: "Sat", reports: 6, resolved: 8 },
    { day: "Sun", reports: 4, resolved: 5 },
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#06b6d4', '#f59e0b', '#10b981', '#8b5cf6'];

  const totalReports = categoryData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Analytics & Insights</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">78%</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↗ +5.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">3.2h</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↘ -0.8h</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Citizen Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">4.2/5</div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on 156 responses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Reports by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, count }) => `${category}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="capitalize">{item.category.replace('-', ' ')}</span>
                  <span className="text-muted-foreground">({item.count})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response Time by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Avg Response Time by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="department" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} hours`, 'Avg Response Time']} />
                <Bar dataKey="avgHours" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Report Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="reports" stroke="#ef4444" strokeWidth={2} name="New Reports" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Problem Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Top Problem Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { area: "Downtown District", reports: 28, trend: "+15%" },
              { area: "Oak Avenue Corridor", reports: 22, trend: "+8%" },
              { area: "Park Boulevard", reports: 18, trend: "-5%" },
              { area: "Main Street", reports: 14, trend: "+12%" },
              { area: "Residential Zone A", reports: 11, trend: "-2%" },
            ].map((area, index) => (
              <div key={area.area} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{area.area}</p>
                    <p className="text-sm text-muted-foreground">{area.reports} reports</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${area.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                  {area.trend}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}