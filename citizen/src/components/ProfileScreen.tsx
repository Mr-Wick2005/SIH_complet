import { useState } from 'react';
import { Settings, LogOut, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [userReports, setUserReports] = useState([
    {
      id: 1,
      title: 'Road damage near Railway Station',
      status: 'pending',
      timeAgo: '2 days ago'
    },
    {
      id: 2,
      title: 'Streetlight not working',
      status: 'resolved',
      timeAgo: '1 week ago'
    },
    {
      id: 3,
      title: 'Garbage accumulation',
      status: 'underway',
      timeAgo: '3 days ago'
    }
  ]);

  const userProfile = {
    name: 'wertyuio',
    phone: '1234567890',
    points: 0,
    rank: '#N/A',
    totalReports: 8,
    resolved: 5,
    pending: 2,
    underway: 1,
    verified: false
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-[#138808]';
      case 'pending': return 'text-[#FF9933]';
      case 'underway': return 'text-[#000080]';
      default: return 'text-[#6c757d]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return '✓';
      case 'pending': return '⏱';
      case 'underway': return '🔄';
      default: return '•';
    }
  };

  const handleDeleteReport = (reportId: number) => {
    setUserReports(prev => prev.filter(report => report.id !== reportId));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#1E2A38] text-white p-4 pt-12 flex justify-between items-center">
        <h1 className="text-xl">Profile</h1>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Settings size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Profile Info */}
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-[#1E2A38] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">W</span>
          </div>
          <h2 className="text-xl text-[#1E2A38] mb-1">{userProfile.name}</h2>
          <p className="text-[#6c757d] mb-4">{userProfile.phone}</p>
          
          {/* Verification Status */}
          <div className="inline-flex items-center px-3 py-1 bg-yellow-100 rounded-full mb-6">
            <span className="text-xs text-yellow-800">⚠ Verification Pending</span>
          </div>
        </div>

        {/* Points and Rank */}
        <div className="px-6 mb-6">
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <div className="text-2xl text-[#1E2A38] mb-1">{userProfile.points}</div>
              <div className="text-sm text-[#6c757d]">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-[#FF9933] mb-1">{userProfile.rank}</div>
              <div className="text-sm text-[#6c757d]">Rank</div>
            </div>
          </div>
        </div>

        {/* Your Impact */}
        <div className="px-6 mb-6">
          <h3 className="text-lg text-[#1E2A38] mb-4">Your Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-[#1E2A38] mb-1">{userProfile.totalReports}</div>
              <div className="text-sm text-[#6c757d]">Total Reports</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-[#138808] mb-1">{userProfile.resolved}</div>
              <div className="text-sm text-[#6c757d]">Resolved</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-[#FF9933] mb-1">{userProfile.pending}</div>
              <div className="text-sm text-[#6c757d]">Pending</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl text-red-600 mb-1">{userProfile.underway}</div>
              <div className="text-sm text-[#6c757d]">Underway</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-6 pb-6 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <span className="text-lg mr-2">🏆</span>
            <h3 className="text-lg text-[#1E2A38]">Achievements</h3>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <span className="text-2xl">🥇</span>
            <div>
              <h4 className="text-[#1E2A38]">First Reporter</h4>
              <p className="text-sm text-[#6c757d]">Reported your first issue</p>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="px-6 py-6">
          <h3 className="text-lg text-[#1E2A38] mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {userReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-[#1E2A38] mb-1">{report.title}</h4>
                  <p className="text-sm text-[#6c757d]">{report.timeAgo}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                    <span>{getStatusIcon(report.status)}</span>
                    <span className="text-sm capitalize">{report.status}</span>
                  </div>
                  <Button
                    onClick={() => handleDeleteReport(report.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions - As part of scrollable content */}
        <div className="px-6 pb-6 space-y-3 border-t border-gray-200 pt-6">
          <Button 
            variant="outline"
            className="w-full h-12 border-[#e9ecef] text-[#1E2A38] hover:bg-[#f8f9fa]"
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          
          <Button 
            onClick={onLogout}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}