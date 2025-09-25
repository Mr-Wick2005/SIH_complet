import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  LayoutDashboard, 
  FileText, 
  MapPin, 
  ClipboardList,
  AlertTriangle,
  BarChart3,
  Users,
  Download,
  ChevronLeft,
  ChevronRight,
  User as UserIcon
} from "lucide-react";
import { User, hasPermission } from "../lib/auth";
import citySeveLogo from "figma:asset/764af81e046bc093cfa2314c551298051f1fc754.png";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentUser: User;
  onLogout: () => void;
}

export function Sidebar({ activeSection, onSectionChange, currentUser, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
      permission: null,
    },
    {
      id: "map",
      label: "Live Map & Heatmap",
      icon: MapPin,
      badge: null,
      permission: null,
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      badge: "15",
      permission: null,
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: ClipboardList,
      badge: "8",
      permission: null,
    },
    {
      id: "alerts",
      label: "Alerts & Announcements",
      icon: AlertTriangle,
      badge: null,
      permission: null,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
      permission: "view-analytics",
    },
    {
      id: "performance",
      label: "Worker Performance",
      icon: Users,
      badge: null,
      permission: "manage-departments",
    },
    {
      id: "downloads",
      label: "Downloads",
      icon: Download,
      badge: null,
      permission: "manage-departments",
    },
  ].filter(item => !item.permission || hasPermission(currentUser, item.permission));

  return (
    <div className={`bg-[#1E2A38] text-white flex flex-col h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-[#2a3642]">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img src={citySeveLogo} alt="CitySeva" className="h-8 w-8" />
              <div>
                <h1 className="text-lg font-bold text-white">CitySeva Admin</h1>
                <p className="text-sm text-gray-300">Municipal Dashboard</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <img src={citySeveLogo} alt="CitySeva" className="h-8 w-8 mx-auto" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto text-gray-300 hover:text-white hover:bg-[#2a3642]"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-[#2a3642]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-300 truncate">
                {currentUser.role === 'department-admin' ? 'Department Admin' : 'Field Worker'}
              </p>
              <p className="text-xs text-gray-400 truncate mt-1">
                Municipal Services
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full ${isCollapsed ? 'justify-center px-3' : 'justify-start px-3'} h-10 ${
                  isActive 
                    ? 'bg-[#FF9933] text-white hover:bg-[#e6873d]' 
                    : 'text-gray-300 hover:bg-[#2a3642] hover:text-white'
                }`}
                onClick={() => onSectionChange(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary"
                        className="ml-2 bg-[#dc3545] text-white hover:bg-[#c82333]"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a3642]">
        {!isCollapsed ? (
          <div className="text-center">
            <p className="text-xs text-gray-400">© 2024 CitySeva</p>
            <p className="text-xs text-gray-500 mt-1">Government of India</p>
          </div>
        ) : (
          <div className="w-2 h-2 bg-[#138808] rounded-full mx-auto"></div>
        )}
      </div>
    </div>
  );
}