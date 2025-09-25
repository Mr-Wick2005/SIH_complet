import { useState } from "react";
import { Bell, Search, Settings, LogOut, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import citySeveLogo from "figma:asset/764af81e046bc093cfa2314c551298051f1fc754.png";
import { User as UserType } from "../lib/auth";

interface TopNavbarProps {
  currentUser: UserType;
  onLogout: () => void;
  onMenuToggle?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopNavbar({ 
  currentUser, 
  onLogout, 
  onMenuToggle, 
  searchQuery, 
  onSearchChange 
}: TopNavbarProps) {
  const [notificationCount] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section - Logo and Search */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            {onMenuToggle && (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-[#1E2A38]"
                onClick={onMenuToggle}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <img src={citySeveLogo} alt="CitySeva" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-[#1E2A38]">CitySeva Admin</h1>
              <p className="text-sm text-[#6c757d]">Municipal Dashboard</p>
            </div>
          </div>

          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d] h-4 w-4" />
            <Input
              placeholder="Search reports, issues, or locations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-80 border-gray-300 focus:border-[#FF9933] focus:ring-[#FF9933]"
            />
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative text-[#1E2A38] hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#dc3545]"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-[#1E2A38] hover:bg-gray-100">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#FF9933] text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-[#6c757d]">
                    {currentUser.role === 'department-admin' ? 'Department Admin' : 'Field Worker'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d] h-4 w-4" />
          <Input
            placeholder="Search reports or issues..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full border-gray-300 focus:border-[#FF9933] focus:ring-[#FF9933]"
          />
        </div>
      </div>
    </header>
  );
}