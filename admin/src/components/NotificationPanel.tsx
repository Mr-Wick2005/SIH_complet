import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bell, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { User } from "../lib/auth";
import { mockReports } from "../lib/mock-data";

interface NotificationPanelProps {
  currentUser: User;
}

export function NotificationPanel({ currentUser }: NotificationPanelProps) {
  // Generate notifications based on user role and reports
  const generateNotifications = () => {
    const notifications = [];
    const now = new Date();
    
    // Critical alerts for all users
    const criticalReports = mockReports.filter(r => r.priority === 'critical' && r.status === 'new');
    criticalReports.forEach(report => {
      notifications.push({
        id: `critical-${report.id}`,
        type: 'critical',
        title: `Critical: ${report.title}`,
        description: report.location.address,
        time: '10 minutes ago',
        icon: AlertTriangle,
        color: 'red',
      });
    });

    // Overdue reports for department admins and super admins
    if (currentUser.role !== 'field-officer') {
      const overdueReports = mockReports.filter(r => {
        const hoursSinceSubmission = (now.getTime() - r.submittedAt.getTime()) / (1000 * 60 * 60);
        return hoursSinceSubmission > 24 && (r.status === 'new' || r.status === 'acknowledged');
      });
      
      overdueReports.slice(0, 2).forEach(report => {
        notifications.push({
          id: `overdue-${report.id}`,
          type: 'warning',
          title: `Overdue: ${report.title}`,
          description: report.location.address,
          time: '2 hours ago',
          icon: Clock,
          color: 'orange',
        });
      });
    }

    // Recent updates
    const recentlyResolved = mockReports.filter(r => r.status === 'resolved').slice(0, 1);
    recentlyResolved.forEach(report => {
      notifications.push({
        id: `resolved-${report.id}`,
        type: 'success',
        title: `Resolved: ${report.title}`,
        description: report.location.address,
        time: '1 hour ago',
        icon: CheckCircle,
        color: 'green',
      });
    });

    return notifications.slice(0, 4); // Limit to 4 notifications
  };

  const notifications = generateNotifications();

  const getNotificationBg = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 border-red-200';
      case 'orange': return 'bg-orange-50 border-orange-200';
      case 'green': return 'bg-green-50 border-green-200';
      case 'blue': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getNotificationDot = (color: string) => {
    switch (color) {
      case 'red': return 'bg-[#dc3545]';
      case 'orange': return 'bg-[#FF9933]';
      case 'green': return 'bg-[#138808]';
      case 'blue': return 'bg-[#000080]';
      default: return 'bg-[#6c757d]';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'success': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-l-4 border-l-[#dc3545]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#1E2A38]">
          <Bell className="w-5 h-5 text-[#dc3545]" />
          Live Alerts & Notifications
          {notifications.filter(n => n.type === 'critical').length > 0 && (
            <Badge className="ml-auto bg-[#dc3545] text-white">
              {notifications.filter(n => n.type === 'critical').length} Critical
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${getNotificationBg(notification.color)}`}
                >
                  <div className={`w-2 h-2 rounded-full ${getNotificationDot(notification.color)} mt-2`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#1E2A38]">{notification.title}</p>
                        <p className="text-xs text-[#6c757d]">{notification.description}</p>
                        <p className="text-xs text-[#6c757d]">{notification.time}</p>
                      </div>
                      <Badge variant={getBadgeVariant(notification.type)} className="text-xs ml-2">
                        {notification.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-[#6c757d]">
              <Bell className="w-8 h-8 mx-auto mb-2 text-[#6c757d]" />
              <p className="text-sm">No new notifications</p>
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="w-full border-[#000080] text-[#000080] hover:bg-[#000080] hover:text-white">
          View All Notifications
        </Button>
      </CardContent>
    </Card>
  );
}