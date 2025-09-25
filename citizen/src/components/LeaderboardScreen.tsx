import { Trophy, Medal, Star, Award, TrendingUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

export function LeaderboardScreen() {
  const topContributors = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: 'RK',
      points: 1250,
      reportsSubmitted: 47,
      badge: 'Civic Hero',
      badgeColor: 'bg-yellow-500',
      rank: 1,
      city: 'Ranchi'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: 'PS',
      points: 1180,
      reportsSubmitted: 42,
      badge: 'Community Champion',
      badgeColor: 'bg-gray-400',
      rank: 2,
      city: 'Jamshedpur'
    },
    {
      id: 3,
      name: 'Amit Singh',
      avatar: 'AS',
      points: 1050,
      reportsSubmitted: 38,
      badge: 'Active Citizen',
      badgeColor: 'bg-orange-500',
      rank: 3,
      city: 'Dhanbad'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      avatar: 'SD',
      points: 890,
      reportsSubmitted: 32,
      badge: 'Rising Star',
      badgeColor: 'bg-blue-500',
      rank: 4,
      city: 'Bokaro'
    },
    {
      id: 5,
      name: 'Ravi Prasad',
      avatar: 'RP',
      points: 750,
      reportsSubmitted: 28,
      badge: 'Good Citizen',
      badgeColor: 'bg-green-500',
      rank: 5,
      city: 'Ranchi'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Report',
      description: 'Submit your first civic issue',
      icon: '🎯',
      unlocked: true
    },
    {
      id: 2,
      title: 'Problem Solver',
      description: 'Report 10 issues',
      icon: '🔧',
      unlocked: true
    },
    {
      id: 3,
      title: 'Community Leader',
      description: 'Get 100 upvotes on reports',
      icon: '👑',
      unlocked: false
    },
    {
      id: 4,
      title: 'Super Citizen',
      description: 'Report 50 issues',
      icon: '⭐',
      unlocked: false
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Award className="text-orange-500" size={20} />;
      default: return <span className="text-[#6c757d]">#{rank}</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white p-4 pt-12">
        <div className="flex items-center mb-2">
          <Trophy size={24} className="mr-2" />
          <h1 className="text-xl">Leaderboard</h1>
        </div>
        <p className="text-orange-100 text-sm">Top contributors making a difference</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Top 3 Podium */}
        <div className="p-4 bg-gradient-to-b from-[#f8f9fa] to-white">
          <div className="text-center mb-4">
            <h2 className="text-lg text-[#1E2A38]">🏆 This Month's Heroes</h2>
            <p className="text-sm text-[#6c757d]">Citizens who made the biggest impact</p>
          </div>
          
          <div className="flex justify-center items-end space-x-4 mb-6">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative mb-2">
                <Avatar className="w-12 h-12 mx-auto border-2 border-gray-400">
                  <AvatarFallback className="bg-gray-100 text-[#1E2A38]">
                    {topContributors[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">2</span>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 w-20">
                <div className="text-xs text-[#1E2A38]">{topContributors[1].name.split(' ')[0]}</div>
                <div className="text-xs text-[#6c757d]">{topContributors[1].points}pts</div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative mb-2">
                <Avatar className="w-16 h-16 mx-auto border-4 border-yellow-500">
                  <AvatarFallback className="bg-yellow-100 text-[#1E2A38]">
                    {topContributors[0].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy size={16} className="text-white" />
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 w-24">
                <div className="text-sm text-[#1E2A38]">{topContributors[0].name.split(' ')[0]}</div>
                <div className="text-xs text-[#6c757d]">{topContributors[0].points}pts</div>
                <Badge className="text-xs mt-1 bg-yellow-500 text-white">
                  {topContributors[0].badge}
                </Badge>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative mb-2">
                <Avatar className="w-12 h-12 mx-auto border-2 border-orange-500">
                  <AvatarFallback className="bg-orange-100 text-[#1E2A38]">
                    {topContributors[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">3</span>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-2 w-20">
                <div className="text-xs text-[#1E2A38]">{topContributors[2].name.split(' ')[0]}</div>
                <div className="text-xs text-[#6c757d]">{topContributors[2].points}pts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="p-4">
          <h3 className="text-lg text-[#1E2A38] mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-[#138808]" />
            All Contributors
          </h3>
          
          <div className="space-y-3">
            {topContributors.map((contributor) => (
              <div key={contributor.id} className="bg-white border border-[#e9ecef] rounded-lg p-4 flex items-center">
                <div className="flex items-center justify-center w-8 mr-3">
                  {getRankIcon(contributor.rank)}
                </div>
                
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarFallback className="bg-[#f8f9fa] text-[#1E2A38]">
                    {contributor.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#1E2A38]">{contributor.name}</h4>
                    <div className="text-sm text-[#1E2A38]">{contributor.points} pts</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#6c757d]">{contributor.city}</span>
                      <span className="text-xs text-[#6c757d]">•</span>
                      <span className="text-xs text-[#6c757d]">{contributor.reportsSubmitted} reports</span>
                    </div>
                    <Badge 
                      className={`text-xs text-white ${contributor.badgeColor}`}
                    >
                      {contributor.badge}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="p-4 bg-[#f8f9fa] border-t border-[#e9ecef]">
          <h3 className="text-lg text-[#1E2A38] mb-4 flex items-center">
            <Star size={20} className="mr-2 text-[#FF9933]" />
            Your Achievements
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`border rounded-lg p-3 text-center ${
                  achievement.unlocked 
                    ? 'bg-white border-[#138808] border-2' 
                    : 'bg-gray-50 border-[#e9ecef]'
                }`}
              >
                <div className="text-2xl mb-2">
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <h4 className={`text-sm mb-1 ${
                  achievement.unlocked ? 'text-[#1E2A38]' : 'text-[#6c757d]'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${
                  achievement.unlocked ? 'text-[#6c757d]' : 'text-[#adb5bd]'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <Badge className="mt-2 text-xs bg-[#138808] text-white">
                    Unlocked!
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}