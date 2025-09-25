import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, User, Camera, Mic, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { MapModal } from './MapModal';
import exampleImage from 'figma:asset/36d7116bd82235ba71bd72ae0e8b2a8eafe7151e.png';

interface AssignedIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  reportedDate: string;
  assignedBy: string;
  imageUrl: string;
  priority: 'high' | 'medium' | 'low';
}

interface AssignedScreenProps {
  onResolveIssue: (issueId: string, resolutionData: any) => void;
}

export function AssignedScreen({ onResolveIssue }: AssignedScreenProps) {
  const [selectedIssue, setSelectedIssue] = useState<AssignedIssue | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{location: string, title: string} | null>(null);
  const [resolutionPhoto, setResolutionPhoto] = useState<File | null>(null);
  const [resolutionDescription, setResolutionDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for assigned issues
  const assignedIssues: AssignedIssue[] = [
    {
      id: '1',
      title: 'Broken Street Light',
      description: 'Street light pole #47 has been non-functional for 3 days. Located near the main road intersection.',
      location: 'MG Road, Sector 15',
      tags: ['Street Light', 'Infrastructure'],
      reportedDate: '2024-01-15',
      assignedBy: 'Admin Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1517036561936-87eb1db2775d?w=400&h=250&fit=crop',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Garbage Overflow',
      description: 'Public dustbin is overflowing and needs immediate attention. Creating hygiene issues.',
      location: 'Park Street, Block A',
      tags: ['Garbage', 'Sanitation'],
      reportedDate: '2024-01-14',
      assignedBy: 'Admin Singh',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Pothole on Main Road',
      description: 'Large pothole causing traffic disruption and vehicle damage. Multiple complaints received.',
      location: 'NH-44, Near Bus Stand',
      tags: ['Road', 'Infrastructure'],
      reportedDate: '2024-01-13',
      assignedBy: 'Admin Patel',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Water Pipe Leakage',
      description: 'Major water pipe leakage causing water wastage and road flooding.',
      location: 'Civil Lines, Ward 12',
      tags: ['Water', 'Infrastructure'],
      reportedDate: '2024-01-12',
      assignedBy: 'Admin Sharma',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      priority: 'high'
    },
  ];

  const handleSubmitResolution = async () => {
    if (!selectedIssue || !resolutionDescription) return;

    setIsSubmitting(true);
    
    const resolutionData = {
      issueId: selectedIssue.id,
      resolutionPhoto,
      description: resolutionDescription,
      resolvedDate: new Date().toISOString(),
      resolvedBy: 'Current Worker' // This would come from auth context
    };

    // Simulate API call
    setTimeout(() => {
      onResolveIssue(selectedIssue.id, resolutionData);
      setSelectedIssue(null);
      setResolutionPhoto(null);
      setResolutionDescription('');
      setIsSubmitting(false);
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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

  return (
    <div className="flex-1 bg-white overflow-hidden">
      {/* CitySeva Header */}
      <div className="bg-white p-4 border-b border-[#e9ecef]">
        <div className="flex items-center mb-3">
          <img 
            src={exampleImage} 
            alt="CitySeva Logo" 
            className="w-8 h-8 mr-3"
          />
          <div>
            <h1 className="text-[#1E2A38] text-lg leading-tight">CitySeva</h1>
            <p className="text-[#6c757d] text-xs">Serve. Solve. Succeed.</p>
          </div>
        </div>
        <h2 className="text-[#1E2A38] text-xl">Assigned Reports</h2>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {assignedIssues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden border border-[#e9ecef] rounded-lg">
            {/* Issue Image */}
            <div className="h-32 relative">
              <img 
                src={issue.imageUrl} 
                alt={issue.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge className={getPriorityColor(issue.priority)}>
                  {issue.priority.toUpperCase()} PRIORITY
                </Badge>
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

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center text-xs text-[#6c757d]">
                  <Calendar size={12} className="mr-1" />
                  <span>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-xs text-[#6c757d]">
                  <User size={12} className="mr-1" />
                  <span>Assigned by {issue.assignedBy}</span>
                </div>
              </div>

              {/* Resolve Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full h-10 bg-[#138808] hover:bg-[#0f6b06] text-white"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    Resolve Issue
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-[#1E2A38]">Submit Resolution</DialogTitle>
                    <DialogDescription className="text-[#6c757d]">
                      Provide details and photos of how this issue was resolved.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {/* Photo Upload */}
                    <div>
                      <Label className="text-[#1E2A38]">Resolution Photo</Label>
                      <div className="mt-2 border-2 border-dashed border-[#e9ecef] rounded-lg p-4">
                        <div className="text-center">
                          <Camera size={24} className="mx-auto text-[#6c757d] mb-2" />
                          <p className="text-sm text-[#6c757d] mb-2">Take a photo of the resolved issue</p>
                          <div className="flex space-x-2">
                            <Button variant="outline" className="flex-1 text-xs">
                              <Camera size={14} className="mr-1" />
                              Camera
                            </Button>
                            <Button variant="outline" className="flex-1 text-xs">
                              Gallery
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label className="text-[#1E2A38]">Resolution Description</Label>
                      <div className="relative mt-2">
                        <Textarea
                          placeholder="Describe how the issue was resolved..."
                          value={resolutionDescription}
                          onChange={(e) => setResolutionDescription(e.target.value)}
                          className="bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38] pr-10"
                          rows={3}
                        />
                        <button className="absolute right-2 top-2 p-1 text-[#6c757d] hover:text-[#1E2A38]">
                          <Mic size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      onClick={handleSubmitResolution}
                      disabled={!resolutionDescription || isSubmitting}
                      className="w-full h-12 bg-[#FF9933] hover:bg-[#e6841a] text-white"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Resolution'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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