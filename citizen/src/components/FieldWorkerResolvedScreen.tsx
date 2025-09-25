import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Calendar, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { MapModal } from './MapModal';

interface ResolvedIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  reportedDate: string;
  resolvedDate: string;
  verifiedDate: string;
  resolvedBy: string;
  imageUrl: string;
  resolutionImageUrl: string;
  resolutionDescription: string;
  resolutionTime: number; // in days
}

export function FieldWorkerResolvedScreen() {
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{location: string, title: string} | null>(null);
  // Mock data for resolved issues
  const resolvedIssues: ResolvedIssue[] = [
    {
      id: '1',
      title: 'Street Light Repair',
      description: 'Malfunctioning LED street light causing safety concerns in residential area.',
      location: 'Rajesh Colony, Street 12',
      tags: ['Street Light', 'Infrastructure'],
      reportedDate: '2024-01-05',
      resolvedDate: '2024-01-07',
      verifiedDate: '2024-01-08',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1517036561936-87eb1db2775d?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop',
      resolutionDescription: 'Replaced the faulty LED bulb and checked electrical connections. Street light is now fully operational.',
      resolutionTime: 2
    },
    {
      id: '2',
      title: 'Pothole Filling',
      description: 'Large pothole on main road causing vehicle damage and traffic issues.',
      location: 'Main Road, Near Hospital',
      tags: ['Road', 'Infrastructure'],
      reportedDate: '2024-01-01',
      resolvedDate: '2024-01-03',
      verifiedDate: '2024-01-04',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
      resolutionDescription: 'Filled the pothole with proper asphalt mixture and leveled the surface. Road is now smooth and safe for vehicles.',
      resolutionTime: 2
    },
    {
      id: '3',
      title: 'Garbage Collection',
      description: 'Overflowing garbage bin creating unhygienic conditions.',
      location: 'Market Area, Zone 4',
      tags: ['Garbage', 'Sanitation'],
      reportedDate: '2023-12-28',
      resolvedDate: '2023-12-29',
      verifiedDate: '2023-12-30',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      resolutionDescription: 'Emptied the overflowing garbage bin and scheduled regular collection. Area is now clean and hygienic.',
      resolutionTime: 1
    },
    {
      id: '4',
      title: 'Water Line Repair',
      description: 'Burst water pipe causing water wastage and road damage.',
      location: 'Housing Society, Block B',
      tags: ['Water', 'Infrastructure'],
      reportedDate: '2023-12-25',
      resolvedDate: '2023-12-27',
      verifiedDate: '2023-12-28',
      resolvedBy: 'Ravi Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      resolutionImageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
      resolutionDescription: 'Repaired the burst pipe section and restored water supply. Tested for leaks and confirmed proper functioning.',
      resolutionTime: 2
    },
  ];

  const getTagColor = (tag: string) => {
    const colors = {
      'Road': 'bg-blue-100 text-blue-800',
      'Garbage': 'bg-orange-100 text-orange-800',
      'Water': 'bg-cyan-100 text-cyan-800',
      'Street Light': 'bg-purple-100 text-purple-800',
      'Infrastructure': 'bg-gray-100 text-gray-800',
      'Sanitation': 'bg-pink-100 text-pink-800'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleViewOnMap = (location: string, title: string) => {
    setSelectedLocation({ location, title });
    setMapModalOpen(true);
  };

  const getResolutionTimeColor = (days: number) => {
    if (days === 1) return 'bg-green-100 text-green-800';
    if (days <= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="flex-1 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-[#e9ecef]">
        <h1 className="text-[#1E2A38] text-xl">Resolved</h1>
      </div>



      {/* Resolved Issues List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {resolvedIssues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden border border-[#e9ecef] rounded-lg">
            {/* Success Header */}
            <div className="bg-[#138808] text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 size={16} className="mr-2" />
                <span className="text-sm">Verified & Resolved</span>
              </div>
              <Badge className={`${getResolutionTimeColor(issue.resolutionTime)} text-xs`}>
                {issue.resolutionTime} day{issue.resolutionTime !== 1 ? 's' : ''}
              </Badge>
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
              <div className="relative border-l-2 border-[#138808]">
                <img 
                  src={issue.resolutionImageUrl} 
                  alt="After resolution"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-[#138808] text-white text-xs">After</Badge>
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
              <div className="bg-[#f0f9f0] p-3 rounded-lg border border-[#138808]/20">
                <h4 className="text-[#138808] text-sm mb-1 flex items-center">
                  <Award size={14} className="mr-1" />
                  Resolution Details
                </h4>
                <p className="text-[#1E2A38] text-sm leading-relaxed">
                  {issue.resolutionDescription}
                </p>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-[#f8f9fa] rounded">
                  <div className="text-[#6c757d] mb-1">Reported</div>
                  <div className="text-[#1E2A38]">
                    {new Date(issue.reportedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-center p-2 bg-[#fff3cd] rounded">
                  <div className="text-[#6c757d] mb-1">Resolved</div>
                  <div className="text-[#1E2A38]">
                    {new Date(issue.resolvedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-center p-2 bg-[#d4edda] rounded">
                  <div className="text-[#6c757d] mb-1">Verified</div>
                  <div className="text-[#1E2A38]">
                    {new Date(issue.verifiedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Resolved By */}
              <div className="flex items-center justify-center bg-[#138808]/10 p-2 rounded-lg">
                <CheckCircle2 size={16} className="text-[#138808] mr-2" />
                <span className="text-[#138808] text-sm">
                  Resolved by {issue.resolvedBy}
                </span>
              </div>
            </div>
          </Card>
        ))}
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