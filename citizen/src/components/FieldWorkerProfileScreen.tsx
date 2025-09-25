import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Award, 
  Zap, 
  Target,
  Settings,
  LogOut,
  Globe,
  Shield
} from 'lucide-react';

interface FieldWorkerProfileScreenProps {
  onLogout: () => void;
}

export function FieldWorkerProfileScreen({ onLogout }: FieldWorkerProfileScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Mock worker data
  const workerData = {
    name: 'Ravi Kumar',
    departmentId: 'PWD-2024-1157',
    phone: '+91 98765 43210',
    govtId: 'GID-MH-789456',
    city: 'Mumbai',
    joinDate: '2023-06-15',
    profileImage: null,
    isVerified: true,
    stats: {
      totalResolved: 47,
      avgResolutionTime: 2.3,
      successRate: 96,
      currentMonth: 12
    },
    badges: [
      { id: 1, name: 'Quick Responder', icon: 'Zap', description: '24hr response time', earned: true },
      { id: 2, name: 'Most Active Worker', icon: 'Target', description: '50+ issues resolved', earned: true },
      { id: 3, name: 'Perfect Record', icon: 'Award', description: '100% success rate', earned: false },
      { id: 4, name: 'Community Hero', icon: 'Shield', description: '1 year of service', earned: true }
    ]
  };

  const getBadgeIcon = (iconName: string) => {
    const icons = {
      'Zap': Zap,
      'Target': Target,
      'Award': Award,
      'Shield': Shield
    };
    return icons[iconName as keyof typeof icons] || Award;
  };

  const languages = ['English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்'];

  return (
    <div className="flex-1 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-[#e9ecef]">
        <h1 className="text-[#1E2A38] text-xl">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {/* Profile Card */}
        <Card className="p-6 border border-[#e9ecef] rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={workerData.profileImage || ''} />
              <AvatarFallback className="bg-[#000080] text-white text-xl">
                {workerData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-[#1E2A38]">{workerData.name}</h2>
                {workerData.isVerified && (
                  <CheckCircle2 size={16} className="text-[#138808]" />
                )}
              </div>
              <p className="text-[#6c757d] text-sm mb-1">{workerData.departmentId}</p>
              <Badge className="bg-[#000080]/10 text-[#000080] text-xs">
                Government Field Worker
              </Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <Phone size={14} className="text-[#6c757d] mr-2" />
              <span className="text-[#1E2A38]">{workerData.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <User size={14} className="text-[#6c757d] mr-2" />
              <span className="text-[#1E2A38]">{workerData.govtId}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin size={14} className="text-[#6c757d] mr-2" />
              <span className="text-[#1E2A38]">{workerData.city}</span>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-4 border border-[#e9ecef] rounded-lg">
          <h3 className="text-[#1E2A38] mb-4 flex items-center">
            <Target size={16} className="mr-2" />
            Performance Statistics
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-[#f8f9fa] rounded-lg">
              <div className="text-2xl text-[#138808] mb-1">{workerData.stats.totalResolved}</div>
              <div className="text-xs text-[#6c757d]">Total Issues Resolved</div>
            </div>
            <div className="text-center p-3 bg-[#f8f9fa] rounded-lg">
              <div className="text-2xl text-[#FF9933] mb-1">{workerData.stats.avgResolutionTime}</div>
              <div className="text-xs text-[#6c757d]">Avg Resolution Days</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#1E2A38]">Success Rate</span>
                <span className="text-[#138808]">{workerData.stats.successRate}%</span>
              </div>
              <Progress value={workerData.stats.successRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#1E2A38]">This Month</span>
                <span className="text-[#000080]">{workerData.stats.currentMonth} resolved</span>
              </div>
              <Progress value={(workerData.stats.currentMonth / 20) * 100} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Badges & Achievements */}
        <Card className="p-4 border border-[#e9ecef] rounded-lg">
          <h3 className="text-[#1E2A38] mb-4 flex items-center">
            <Award size={16} className="mr-2" />
            Badges & Achievements
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {workerData.badges.map((badge) => {
              const IconComponent = getBadgeIcon(badge.icon);
              return (
                <div 
                  key={badge.id}
                  className={`p-3 rounded-lg border ${
                    badge.earned 
                      ? 'bg-[#f0f9f0] border-[#138808]/20' 
                      : 'bg-[#f8f9fa] border-[#e9ecef]'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <IconComponent 
                      size={16} 
                      className={badge.earned ? 'text-[#138808]' : 'text-[#6c757d]'} 
                    />
                    <span className={`text-sm ${badge.earned ? 'text-[#138808]' : 'text-[#6c757d]'}`}>
                      {badge.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#6c757d]">{badge.description}</p>
                  {!badge.earned && (
                    <Badge className="mt-2 bg-[#6c757d]/10 text-[#6c757d] text-xs">
                      In Progress
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4 border border-[#e9ecef] rounded-lg">
          <h3 className="text-[#1E2A38] mb-4 flex items-center">
            <Settings size={16} className="mr-2" />
            Settings
          </h3>
          
          <div className="space-y-4">
            {/* Language Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Globe size={16} className="text-[#6c757d] mr-2" />
                  <span className="text-[#1E2A38] text-sm">Language Selection</span>
                </div>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-sm text-[#1E2A38] bg-[#f8f9fa] border border-[#e9ecef] rounded px-2 py-1"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-4 border-t border-[#e9ecef]">
              <Button 
                onClick={onLogout}
                variant="outline"
                className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Card>


      </div>
    </div>
  );
}