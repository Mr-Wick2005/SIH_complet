import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Trophy, 
  Medal, 
  Star, 
  Clock, 
  CheckCircle2, 
  Target,
  TrendingUp,
  Users,
  Award,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { User } from "../lib/auth";

interface WorkerPerformanceProps {
  currentUser: User;
}

interface WorkerPerformance {
  id: string;
  name: string;
  email: string;
  totalAssigned: number;
  totalResolved: number;
  avgResolutionTime: number; // in hours
  rating: number;
  badges: string[];
  points: number;
  rank: number;
  monthlyTarget: number;
  monthlyCompleted: number;
  recentActivity: {
    date: Date;
    action: string;
    reportId: string;
  }[];
}

const mockPerformanceData: WorkerPerformance[] = [
  {
    id: 'W001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@cityseva.gov',
    totalAssigned: 45,
    totalResolved: 42,
    avgResolutionTime: 2.3,
    rating: 4.8,
    badges: ['Speed Demon', 'Problem Solver', 'Community Hero'],
    points: 1250,
    rank: 1,
    monthlyTarget: 25,
    monthlyCompleted: 23,
    recentActivity: [
      { date: new Date('2024-01-15T14:30:00'), action: 'Resolved', reportId: 'RPT-045' },
      { date: new Date('2024-01-15T11:20:00'), action: 'Started work on', reportId: 'RPT-046' },
      { date: new Date('2024-01-14T16:45:00'), action: 'Resolved', reportId: 'RPT-044' }
    ]
  },
  {
    id: 'W003',
    name: 'Amit Sharma',
    email: 'amit.sharma@cityseva.gov',
    totalAssigned: 38,
    totalResolved: 36,
    avgResolutionTime: 2.8,
    rating: 4.9,
    badges: ['Quality Master', 'Traffic Expert'],
    points: 1180,
    rank: 2,
    monthlyTarget: 20,
    monthlyCompleted: 19,
    recentActivity: [
      { date: new Date('2024-01-15T15:15:00'), action: 'Resolved', reportId: 'RPT-043' },
      { date: new Date('2024-01-15T09:30:00'), action: 'Updated', reportId: 'RPT-042' }
    ]
  },
  {
    id: 'W004',
    name: 'Sunita Devi',
    email: 'sunita.devi@cityseva.gov',
    totalAssigned: 41,
    totalResolved: 38,
    avgResolutionTime: 3.1,
    rating: 4.7,
    badges: ['Sanitation Star', 'Reliable Worker'],
    points: 1050,
    rank: 3,
    monthlyTarget: 22,
    monthlyCompleted: 20,
    recentActivity: [
      { date: new Date('2024-01-15T13:45:00'), action: 'Resolved', reportId: 'RPT-041' },
      { date: new Date('2024-01-14T14:20:00'), action: 'Started work on', reportId: 'RPT-040' }
    ]
  },
  {
    id: 'W002',
    name: 'Priya Singh',
    email: 'priya.singh@cityseva.gov',
    totalAssigned: 32,
    totalResolved: 29,
    avgResolutionTime: 3.5,
    rating: 4.6,
    badges: ['Water Specialist'],
    points: 890,
    rank: 4,
    monthlyTarget: 18,
    monthlyCompleted: 16,
    recentActivity: [
      { date: new Date('2024-01-15T12:00:00'), action: 'Updated', reportId: 'RPT-039' },
      { date: new Date('2024-01-14T15:30:00'), action: 'Resolved', reportId: 'RPT-038' }
    ]
  }
];

const badgeColors: Record<string, string> = {
  'Speed Demon': 'bg-[#dc3545] text-white',
  'Problem Solver': 'bg-[#FF9933] text-white',
  'Community Hero': 'bg-[#138808] text-white',
  'Quality Master': 'bg-[#000080] text-white',
  'Traffic Expert': 'bg-[#6c757d] text-white',
  'Sanitation Star': 'bg-[#FF9933] text-white',
  'Reliable Worker': 'bg-[#138808] text-white',
  'Water Specialist': 'bg-blue-500 text-white'
};

export function WorkerPerformance({ currentUser }: WorkerPerformanceProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [sortBy, setSortBy] = useState<'rank' | 'points' | 'resolution'>('rank');

  if (currentUser.role !== 'department-admin') {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="w-16 h-16 text-[#6c757d] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#1E2A38] mb-2">Access Restricted</h2>
          <p className="text-[#6c757d]">Worker performance data is only available to Department Administrators.</p>
        </CardContent>
      </Card>
    );
  }

  const sortedWorkers = [...mockPerformanceData].sort((a, b) => {
    switch (sortBy) {
      case 'points': return b.points - a.points;
      case 'resolution': return a.avgResolutionTime - b.avgResolutionTime;
      default: return a.rank - b.rank;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <div className="w-5 h-5 flex items-center justify-center text-sm font-bold text-[#6c757d]">#{rank}</div>;
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-[#138808]';
    if (percentage >= 75) return 'text-[#FF9933]';
    return 'text-[#dc3545]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E2A38]">Worker Performance</h1>
        <p className="text-[#6c757d] mt-1">Track field worker performance and achievements</p>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#138808]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6c757d]">Total Workers</p>
                <p className="text-2xl font-bold text-[#1E2A38]">{mockPerformanceData.length}</p>
              </div>
              <Users className="w-8 h-8 text-[#138808]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#FF9933]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6c757d]">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-[#1E2A38]">2.9h</p>
              </div>
              <Clock className="w-8 h-8 text-[#FF9933]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#000080]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6c757d]">Monthly Target</p>
                <p className="text-2xl font-bold text-[#1E2A38]">85%</p>
              </div>
              <Target className="w-8 h-8 text-[#000080]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#dc3545]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6c757d]">Top Performer</p>
                <p className="text-lg font-bold text-[#1E2A38]">Rajesh K.</p>
              </div>
              <Trophy className="w-8 h-8 text-[#dc3545]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="performance">Performance Details</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-4">
          {/* Sort Controls */}
          <div className="flex items-center space-x-4">
            <p className="text-sm text-[#6c757d]">Sort by:</p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={sortBy === 'rank' ? 'default' : 'outline'}
                onClick={() => setSortBy('rank')}
                className={sortBy === 'rank' ? 'bg-[#FF9933] hover:bg-[#e6873d]' : ''}
              >
                Rank
              </Button>
              <Button
                size="sm"
                variant={sortBy === 'points' ? 'default' : 'outline'}
                onClick={() => setSortBy('points')}
                className={sortBy === 'points' ? 'bg-[#FF9933] hover:bg-[#e6873d]' : ''}
              >
                Points
              </Button>
              <Button
                size="sm"
                variant={sortBy === 'resolution' ? 'default' : 'outline'}
                onClick={() => setSortBy('resolution')}
                className={sortBy === 'resolution' ? 'bg-[#FF9933] hover:bg-[#e6873d]' : ''}
              >
                Speed
              </Button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-4">
            {sortedWorkers.map((worker, index) => (
              <Card key={worker.id} className={`${index < 3 ? 'border-l-4' : ''} ${
                index === 0 ? 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white' :
                index === 1 ? 'border-l-gray-400 bg-gradient-to-r from-gray-50 to-white' :
                index === 2 ? 'border-l-amber-600 bg-gradient-to-r from-amber-50 to-white' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(worker.rank)}
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-[#FF9933] text-white">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-[#1E2A38]">{worker.name}</h3>
                        <p className="text-sm text-[#6c757d]">{worker.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-[#6c757d]">Points</p>
                        <p className="text-xl font-bold text-[#1E2A38]">{worker.points}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-[#6c757d]">Resolved</p>
                        <p className="text-xl font-bold text-[#138808]">{worker.totalResolved}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-[#6c757d]">Avg Time</p>
                        <p className="text-xl font-bold text-[#FF9933]">{worker.avgResolutionTime}h</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{worker.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPerformanceData.map((worker) => {
              const completionRate = (worker.totalResolved / worker.totalAssigned) * 100;
              const monthlyProgress = (worker.monthlyCompleted / worker.monthlyTarget) * 100;
              
              return (
                <Card key={worker.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-[#FF9933] text-white">
                            {worker.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-[#1E2A38]">{worker.name}</CardTitle>
                          <p className="text-sm text-[#6c757d]">Rank #{worker.rank}</p>
                        </div>
                      </div>
                      {getRankIcon(worker.rank)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#6c757d]">Task Completion Rate</span>
                        <span className={`font-medium ${getPerformanceColor(completionRate)}`}>
                          {completionRate.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#6c757d]">Monthly Target Progress</span>
                        <span className={`font-medium ${getPerformanceColor(monthlyProgress)}`}>
                          {worker.monthlyCompleted}/{worker.monthlyTarget} ({monthlyProgress.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={monthlyProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#6c757d]">Total Assigned:</span>
                        <span className="ml-2 font-medium text-[#1E2A38]">{worker.totalAssigned}</span>
                      </div>
                      <div>
                        <span className="text-[#6c757d]">Avg Time:</span>
                        <span className="ml-2 font-medium text-[#1E2A38]">{worker.avgResolutionTime}h</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-[#6c757d] mb-2">Recent Activity:</p>
                      <div className="space-y-1">
                        {worker.recentActivity.slice(0, 3).map((activity, idx) => (
                          <div key={idx} className="text-xs text-[#6c757d] flex justify-between">
                            <span>{activity.action} {activity.reportId}</span>
                            <span>{activity.date.toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPerformanceData.map((worker) => (
              <Card key={worker.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#FF9933] text-white">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-[#1E2A38]">{worker.name}</CardTitle>
                      <p className="text-sm text-[#6c757d]">{worker.points} points earned</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#1E2A38]">Earned Badges:</h4>
                    <div className="flex flex-wrap gap-2">
                      {worker.badges.map((badge) => (
                        <Badge 
                          key={badge} 
                          className={badgeColors[badge] || 'bg-gray-500 text-white'}
                        >
                          <Award className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#1E2A38]">Next Achievement:</p>
                          <p className="text-xs text-[#6c757d]">Master Resolver (50 completed tasks)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#138808]">{worker.totalResolved}/50</p>
                          <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-full bg-[#138808] rounded-full" 
                              style={{ width: `${Math.min((worker.totalResolved / 50) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}