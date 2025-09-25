import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getTodaysStats, mockReports } from "../lib/mock-data";
import { User } from "../lib/auth";
import { AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react";

interface DashboardStatsProps {
  currentUser: User;
}

export function DashboardStats({ currentUser }: DashboardStatsProps) {
  // Filter stats based on user role
  const getRelevantReports = () => {
    if (currentUser.role === 'department-admin') {
      return mockReports.filter(report => report.departmentId === currentUser.department);
    }
    if (currentUser.role === 'field-officer') {
      return mockReports.filter(report => 
        report.assignedTo === currentUser.name ||
        (report.departmentId === currentUser.department && !report.assignedTo)
      );
    }
    return mockReports;
  };

  const relevantReports = getRelevantReports();
  const today = new Date();
  const todayReports = relevantReports.filter(report => 
    report.submittedAt.toDateString() === today.toDateString()
  );
  
  const stats = {
    totalReports: relevantReports.length,
    todayReports: todayReports.length,
    inProgress: relevantReports.filter(r => r.status === 'in-progress').length,
    resolved: relevantReports.filter(r => r.status === 'resolved').length,
    avgResponseTime: '2.4 hours',
  };

  const statCards = [
    {
      title: "Total Reports",
      value: stats.totalReports.toString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Today's Reports",
      value: stats.todayReports.toString(),
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "In Progress",
      value: stats.inProgress.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Resolved",
      value: stats.resolved.toString(),
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.title === "In Progress" && (
                <p className="text-xs text-muted-foreground mt-1">
                  Avg response: {stats.avgResponseTime}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}