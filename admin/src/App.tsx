import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopNavbar } from "./components/TopNavbar";
import { DashboardStats } from "./components/DashboardStats";
import { MapView } from "./components/MapView";
import { ReportsTable } from "./components/ReportsTable";
import { Analytics } from "./components/Analytics";
import { AlertsAndAnnouncements } from "./components/AlertsAndAnnouncements";
import { AssignmentsPage } from "./components/AssignmentsPage";
import { WorkerPerformance } from "./components/WorkerPerformance";
import { DownloadsPage } from "./components/DownloadsPage";
import { LoginPage } from "./components/LoginPage";
import { NotificationPanel } from "./components/NotificationPanel";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { User } from "./lib/auth";
import { 
  Bell, 
  Plus, 
  RefreshCw, 
  Search, 
  TrendingUp, 
  Users, 
  MapPin,
  FileText,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveSection("dashboard");
  };

  // Show login page if not authenticated
  if (!isAuthenticated || !currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <DashboardStats currentUser={currentUser} />
            
            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Live Map */}
              <div className="xl:col-span-2">
                <Card className="h-[500px]">
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#1E2A38]">
                      <MapPin className="w-5 h-5 mr-2 text-[#FF9933]" />
                      Live City Map with Heatmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <MapView />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Issues & Quick Actions */}
              <div className="space-y-6">
                {/* Recent Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-[#1E2A38]">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-[#dc3545]" />
                        Recent Issues
                      </div>
                      <Badge variant="secondary" className="bg-[#dc3545] text-white">
                        Live
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { id: "RPT-045", title: "Pothole on MG Road", priority: "high", time: "2 min ago" },
                        { id: "RPT-044", title: "Street light not working", priority: "medium", time: "15 min ago" },
                        { id: "RPT-043", title: "Garbage overflow", priority: "high", time: "1 hour ago" },
                        { id: "RPT-042", title: "Water pipeline leak", priority: "critical", time: "2 hours ago" }
                      ].map((issue) => (
                        <div key={issue.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                          <div>
                            <p className="font-medium text-[#1E2A38] text-sm">{issue.title}</p>
                            <p className="text-xs text-[#6c757d]">{issue.id}</p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              className={
                                issue.priority === 'critical' ? 'bg-[#dc3545] text-white' :
                                issue.priority === 'high' ? 'bg-[#FF9933] text-white' :
                                'bg-[#000080] text-white'
                              }
                            >
                              {issue.priority}
                            </Badge>
                            <p className="text-xs text-[#6c757d] mt-1">{issue.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#1E2A38]">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-[#FF9933] hover:bg-[#e6873d] text-white" variant="default">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Manual Report
                    </Button>
                    <Button className="w-full justify-start border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button className="w-full justify-start border-[#000080] text-[#000080] hover:bg-[#000080] hover:text-white" variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Advanced Search
                    </Button>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <NotificationPanel currentUser={currentUser} />
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E2A38]">Resolution Trends</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-[#138808] mx-auto mb-2" />
                    <p className="text-[#6c757d]">Line chart placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E2A38]">Issue Categories</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF9933] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold">42%</span>
                    </div>
                    <p className="text-[#6c757d]">Pie chart placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E2A38]">Daily Reports</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="flex items-end space-x-2 mb-2">
                      <div className="w-4 h-8 bg-[#dc3545] rounded"></div>
                      <div className="w-4 h-12 bg-[#FF9933] rounded"></div>
                      <div className="w-4 h-6 bg-[#138808] rounded"></div>
                      <div className="w-4 h-10 bg-[#000080] rounded"></div>
                    </div>
                    <p className="text-[#6c757d]">Bar chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "map":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#1E2A38]">Live Map & Heatmap</h1>
                <p className="text-[#6c757d]">Real-time view of all active reports with density mapping</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933] hover:text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="h-[600px]">
                  <CardContent className="h-full p-0">
                    <MapView />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E2A38]">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Category</label>
                      <div className="space-y-2">
                        {['sanitation', 'public-works', 'water-supply', 'traffic'].map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-[#6c757d] capitalize">{category.replace('-', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Status</label>
                      <div className="space-y-2">
                        {['new', 'in-progress', 'resolved'].map(status => (
                          <div key={status} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-[#6c757d] capitalize">{status.replace('-', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-[#138808] hover:bg-[#117507] text-white">
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "reports":
        return <ReportsTable currentUser={currentUser} />;

      case "assignments":
        return <AssignmentsPage currentUser={currentUser} />;

      case "alerts":
        return <AlertsAndAnnouncements currentUser={currentUser} />;

      case "analytics":
        return <Analytics />;

      case "performance":
        return <WorkerPerformance currentUser={currentUser} />;

      case "downloads":
        return <DownloadsPage currentUser={currentUser} />;

      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-[#138808] mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-[#1E2A38] mb-2">Feature Coming Soon</h2>
              <p className="text-[#6c757d]">This section is under development and will be available soon.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="h-screen flex bg-white">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar 
          currentUser={currentUser}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}