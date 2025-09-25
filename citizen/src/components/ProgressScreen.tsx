import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Calendar, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { MapModal } from './MapModal';

interface ProgressIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  reportedDate: string;
  resolvedDate: string;
  resolvedBy: string;
  imageUrl: string;
  resolutionImageUrl: string;
  resolutionDescription: string;
  status: 'pending' | 'verified';
}

export function ProgressScreen() {
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{location: string, title: string} | null>(null);
  // Mock data for issues in progress
  const progressIssues: ProgressIssue[] = [
    {
      id: '1',
      title: 'Broken Traffic Signal',
      description: 'Traffic signal at the main junction was malfunctioning.',
      location: 'Central Square, Sector 10',
      tags: ['Traffic', 'Infrastructure'],
      reportedDate: '2024-01-10',
      resolvedDate: '2024-01-16',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop',
      resolutionDescription: 'Replaced the faulty circuit board and tested all signal lights. Traffic signal is now fully operational.',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Clogged Drainage',
      description: 'Storm drain blocked causing waterlogging during rains.',
      location: 'Residential Area, Block C',
      tags: ['Drainage', 'Infrastructure'],
      reportedDate: '2024-01-08',
      resolvedDate: '2024-01-15',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      resolutionDescription: 'Cleared all debris and garbage from the drainage system. Applied preventive measures to avoid future blockages.',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Damaged Public Bench',
      description: 'Park bench was broken and unsafe for public use.',
      location: 'City Park, Zone 2',
      tags: ['Park', 'Infrastructure'],
      reportedDate: '2024-01-12',
      resolvedDate: '2024-01-17',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop',
      resolutionDescription: 'Repaired the wooden planks and reinforced the metal frame. Bench is now safe and ready for public use.',
      status: 'pending'
    }
  ];

  const getTagColor = (tag: string) => {
    const colors = {
      'Traffic': 'bg-red-100 text-red-800',
      'Drainage': 'bg-blue-100 text-blue-800',
      'Park': 'bg-green-100 text-green-800',
      'Infrastructure': 'bg-gray-100 text-gray-800',
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'pending') {
      return (
        <Badge className="bg-gray-100 text-[#6c757d] border-gray-200">
          <Clock size={12} className="mr-1" />
          Awaiting Admin Verification
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle2 size={12} className="mr-1" />
        Verified
      </Badge>
    );
  };

  const handleViewOnMap = (location: string, title: string) => {
    setSelectedLocation({ location, title });
    setMapModalOpen(true);
  };

  return (
    <div className="flex-1 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-[#e9ecef]">
        <h1 className="text-[#1E2A38] text-xl">Progress</h1>
      </div>

      {/* Progress List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {progressIssues.length === 0 ? (
          <div className="text-center py-12">
            <Clock size={48} className="mx-auto text-[#6c757d] mb-4" />
            <h3 className="text-[#1E2A38] mb-2">No Pending Resolutions</h3>
            <p className="text-[#6c757d] text-sm">
              All submitted resolutions have been verified
            </p>
          </div>
        ) : (
          progressIssues.map((issue) => (
            <Card key={issue.id} className="overflow-hidden border border-[#e9ecef] rounded-lg">
              {/* Status Header */}
              <div className="bg-[#f8f9fa] px-4 py-2 border-b border-[#e9ecef]">
                <div className="flex items-center justify-between">
                  {getStatusBadge(issue.status)}
                  <span className="text-xs text-[#6c757d]">
                    Submitted {new Date(issue.resolvedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="grid grid-cols-2 h-32">
                <div className="relative">
                  <img 
                    src={issue.imageUrl} 
                    alt="Before resolution"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-red-500 text-white text-xs">Before</Badge>
                  </div>
                </div>
                <div className="relative border-l border-[#e9ecef]">
                  <img 
                    src={issue.resolutionImageUrl} 
                    alt="After resolution"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-green-500 text-white text-xs">After</Badge>
                  </div>
                </div>
              </div>

              {/* Issue Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-[#1E2A38] mb-1">{issue.title}</h3>
                  <p className="text-[#6c757d] text-sm leading-relaxed">{issue.description}</p>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#6c757d] text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{issue.location}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[#000080] border-[#000080] hover:bg-[#000080]/10 text-xs h-8"
                    onClick={() => handleViewOnMap(issue.location, issue.title)}
                  >
                    <ExternalLink size={12} className="mr-1" />
                    View on Map
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Resolution Description */}
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <h4 className="text-[#1E2A38] text-sm mb-1">Resolution Details</h4>
                  <p className="text-[#6c757d] text-sm leading-relaxed">
                    {issue.resolutionDescription}
                  </p>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-xs text-[#6c757d]">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 size={12} className="mr-1" />
                    <span>Resolved: {new Date(issue.resolvedDate).toLocaleDateString()}</span>
                  </div>
                </div>


              </div>
            </Card>
          ))
        )}
      </div>

      {/* Map Modal */}
      {selectedLocation && (
        <MapModal
          isOpen={mapModalOpen}
          onClose={() => setMapModalOpen(false)}
          location={selectedLocation.location}
          issueTitle={selectedLocation.title}
        />
      )}
    </div>
  );
}