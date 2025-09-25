import { useState } from 'react';
import { Search, Clock, TrendingUp, MapPin, ChevronUp, ChevronDown, MessageCircle, Share2, Bell, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CommentsModal } from './CommentsModal';
import logoImage from 'figma:asset/78bc8dcd9bd312650408779b924c163f8a10ea43.png';

interface HomeScreenProps {
  onShowAlerts: () => void;
}

export function HomeScreen({ onShowAlerts }: HomeScreenProps) {
  const [selectedCity, setSelectedCity] = useState('Ranchi');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortFilter, setSortFilter] = useState('recent'); // Add sort filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [commentsModal, setCommentsModal] = useState<{
    isOpen: boolean;
    issueId: number | null;
    issueTitle: string;
  }>({
    isOpen: false,
    issueId: null,
    issueTitle: ''
  });

  const cities = ['All Cities', 'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'];
  const categories = ['All', 'Road', 'Water', 'Animal', 'Streetlight', 'Garbage'];
  const sortOptions = ['recent', 'upvotes']; // Add sort options

  const mockIssues = [
    {
      id: 1,
      title: 'Street light not working for 3 weeks',
      description: 'The street light at the intersection has been non-functional for the past 3 weeks, creating safety concerns.',
      location: 'Park Road & Station Road Intersection, Ranchi',
      image: 'https://images.unsplash.com/photo-1742119193536-7d228ef7f466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXRsaWdodCUyMGJyb2tlbiUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc1ODIwMTUwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      upvotes: 24,
      downvotes: 2,
      comments: [
        { id: 1, author: 'municipal.worker', content: 'We have received your complaint and will address this issue within 48 hours.', timeAgo: '1 hour ago', upvotes: 5 },
        { id: 2, author: 'local.resident', content: 'This is a serious safety concern. Thank you for reporting this.', timeAgo: '2 hours ago', upvotes: 3 }
      ],
      status: 'In Progress',
      statusColor: 'bg-blue-100 text-blue-800',
      category: 'Streetlight',
      tags: ['Streetlight', 'safety', 'crime_prevention', 'intersection'],
      city: 'Ranchi',
      timeAgo: '2 hours ago',
      author: 'rajesh.kumar',
      hasAiPrediction: false
    },
    {
      id: 2,
      title: 'Stagnant water causing mosquito breeding',
      description: 'There is stagnant water collected in the construction area that has not been cleared for weeks.',
      location: 'Behind City Hospital, Medical Road, Ranchi',
      image: 'https://images.unsplash.com/photo-1620609997104-1cd7ca877232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwd2FzdGUlMjBkdW1wfGVufDF8fHx8MTc1ODIwMTUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      upvotes: 35,
      downvotes: 1,
      comments: [
        { id: 3, author: 'health.official', content: 'This poses a significant health risk. Immediate action required.', timeAgo: '30 minutes ago', upvotes: 8 },
        { id: 4, author: 'concerned.citizen', content: 'Already seeing increased mosquito activity in the area.', timeAgo: '1 hour ago', upvotes: 4 }
      ],
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      category: 'Water',
      tags: ['Water', 'health_risk', 'mosquito_breeding', 'construction'],
      city: 'Ranchi',
      timeAgo: 'Sep 18, 2025',
      author: 'siddheshachrekar.06',
      hasAiPrediction: true,
      aiPrediction: 'High risk of dengue and malaria outbreak. Immediate water drainage recommended.'
    },
    {
      id: 3,
      title: 'Pack of stray dogs aggressive towards children',
      description: 'A pack of 6-7 stray dogs has become increasingly aggressive in our residential area.',
      location: 'Community Park, Raj Bhawan Road, Ranchi',
      image: 'https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb2FkJTIwcG90aG9sZSUyMGRhbWFnZXxlbnwxfHx8fDE3NTgxNjgwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      upvotes: 18,
      downvotes: 0,
      comments: [
        { id: 5, author: 'animal.control', content: 'Team dispatched to handle the situation. Please avoid the area.', timeAgo: '3 hours ago', upvotes: 12 },
        { id: 6, author: 'parent.user', content: 'Thank you for reporting. My kids play here regularly.', timeAgo: '4 hours ago', upvotes: 6 }
      ],
      status: 'Resolved',
      statusColor: 'bg-green-100 text-green-800',
      category: 'Animal',
      tags: ['Animal', 'safety', 'children', 'aggressive'],
      city: 'Ranchi',
      timeAgo: '1 day ago',
      author: 'priya.sharma',
      hasAiPrediction: true,
      aiPrediction: 'Potential rabies risk. Contact animal control and avoid direct contact.'
    }
  ];

  const filteredIssues = mockIssues.filter(issue => {
    const cityMatch = selectedCity === 'All Cities' || issue.city === selectedCity;
    const categoryMatch = activeCategory === 'All' || issue.category === activeCategory;
    const searchMatch = searchQuery === '' || 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return cityMatch && categoryMatch && searchMatch;
  }).sort((a, b) => {
    // Apply sorting based on sortFilter
    if (sortFilter === 'upvotes') {
      return b.upvotes - a.upvotes; // Sort by upvotes descending
    } else {
      // Sort by recent (assuming higher id means more recent)
      return b.id - a.id;
    }
  });

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'streetlight': return 'bg-yellow-100 text-yellow-800';
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'animal': return 'bg-purple-100 text-purple-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'health_risk': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpvote = (issueId: number) => {
    // Update upvotes in real implementation
    console.log('Upvoted issue:', issueId);
  };

  const handleDownvote = (issueId: number) => {
    // Update downvotes in real implementation
    console.log('Downvoted issue:', issueId);
  };

  const handleOpenComments = (issue: any) => {
    setCommentsModal({
      isOpen: true,
      issueId: issue.id,
      issueTitle: issue.title
    });
  };

  const handleCloseComments = () => {
    setCommentsModal({
      isOpen: false,
      issueId: null,
      issueTitle: ''
    });
  };

  const handleShare = (issue: any) => {
    if (navigator.share) {
      navigator.share({
        title: issue.title,
        text: issue.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${issue.title} - ${window.location.href}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 pt-12 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={logoImage} 
                alt="CitySeva Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg text-[#1E2A38]">CitySeva</h1>
              <p className="text-xs text-[#6c757d]">Serve. Solve. Succeed.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onShowAlerts}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative"
            >
              <Bell size={18} className="text-[#6c757d]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d]" />
          <Input
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 text-[#1E2A38]"
          />
        </div>

        {/* Quick Actions / Filters */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <button 
            onClick={() => setSortFilter('recent')}
            className={`flex items-center justify-center h-10 rounded-lg transition-colors ${
              sortFilter === 'recent' 
                ? 'bg-[#000080] text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Clock size={16} className={sortFilter === 'recent' ? 'text-white' : 'text-[#6c757d]'} />
          </button>
          <button 
            onClick={() => setSortFilter('upvotes')}
            className={`flex items-center justify-center h-10 rounded-lg transition-colors ${
              sortFilter === 'upvotes' 
                ? 'bg-[#000080] text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <TrendingUp size={16} className={sortFilter === 'upvotes' ? 'text-white' : 'text-[#6c757d]'} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <MapPin size={16} className="text-[#6c757d]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {cities.map((city) => (
                <DropdownMenuItem
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={selectedCity === city ? 'bg-blue-50 text-blue-800' : ''}
                >
                  {city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="flex items-center justify-center h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
            <Sparkles size={16} className="text-purple-600" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-[#000080] text-white'
                  : 'bg-gray-100 text-[#6c757d] hover:bg-gray-200'
              }`}
            >
              {category === 'All' ? '••• All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Issues Feed */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        {filteredIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Issue Image */}
            <div className="relative h-48">
              <ImageWithFallback
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs ${issue.statusColor}`}>
                  {issue.status}
                </span>
              </div>
              {issue.hasAiPrediction && (
                <div className="absolute top-3 right-3">
                  <button className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-md border border-purple-200">
                    <Sparkles size={12} className="text-purple-600" />
                    <span className="text-xs text-purple-700">AI</span>
                  </button>
                </div>
              )}
            </div>

            {/* Issue Content */}
            <div className="p-4 pb-3">
              <h3 className="text-[#1E2A38] text-base mb-2 leading-tight">{issue.title}</h3>
              
              <p className="text-sm text-[#6c757d] mb-3 leading-relaxed">{issue.description}</p>
              
              <div className="flex items-center text-xs text-[#6c757d] mb-3">
                <MapPin size={12} className="mr-1 flex-shrink-0" />
                <span className="leading-relaxed">{issue.location}</span>
              </div>

              {/* AI Prediction */}
              {issue.hasAiPrediction && issue.aiPrediction && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start space-x-2">
                    <Sparkles size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-purple-700 mb-1">AI Health Prediction</p>
                      <p className="text-xs text-purple-600 leading-relaxed">{issue.aiPrediction}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {issue.tags.map((tag, index) => (
                  <span key={index} className={`px-2 py-1 rounded-md text-xs ${getTagColor(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-[#6c757d] mb-3">
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <span>{issue.timeAgo}</span>
                </div>
                <span>by {issue.author}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleUpvote(issue.id)}
                      className="flex items-center space-x-1 text-[#138808] hover:bg-green-50 rounded px-1 py-1"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <span className="mx-1 text-sm text-[#1E2A38]">{issue.upvotes}</span>
                    <button 
                      onClick={() => handleDownvote(issue.id)}
                      className="flex items-center space-x-1 text-[#6c757d] hover:bg-gray-50 rounded px-1 py-1"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleOpenComments(issue)}
                    className="flex items-center space-x-1 text-[#000080] hover:bg-blue-50 rounded px-2 py-1"
                  >
                    <MessageCircle size={16} />
                    <span className="text-sm">Discuss</span>
                  </button>
                </div>

                <button 
                  onClick={() => handleShare(issue)}
                  className="flex items-center space-x-1 text-[#6c757d] hover:text-[#1E2A38] hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="text-center py-8">
            <div className="text-[#6c757d] text-sm">No issues found for your search criteria</div>
            <div className="text-xs text-[#6c757d] mt-1">Try adjusting your filters</div>
          </div>
        )}
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={commentsModal.isOpen}
        onClose={handleCloseComments}
        issueTitle={commentsModal.issueTitle}
        comments={commentsModal.issueId ? filteredIssues.find(issue => issue.id === commentsModal.issueId)?.comments || [] : []}
      />
    </div>
  );
}