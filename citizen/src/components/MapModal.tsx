import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { MapPin, Navigation, X } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  issueTitle: string;
}

export function MapModal({ isOpen, onClose, location, issueTitle }: MapModalProps) {
  const handleGetDirections = () => {
    // In a real app, this would open Google Maps or similar
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = `https://www.google.com/maps/search/${encodedLocation}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[#1E2A38]">Issue Location</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
          <DialogDescription className="text-[#6c757d]">
            View the location of this civic issue on the map and get directions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Issue Info */}
          <div className="bg-[#f8f9fa] p-3 rounded-lg">
            <h4 className="text-[#1E2A38] text-sm mb-1">{issueTitle}</h4>
            <div className="flex items-center text-[#6c757d] text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>

          {/* Mock Map Display */}
          <div className="bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] h-48 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-2 h-2 bg-[#138808] rounded-full"></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-[#6c757d] rounded-full"></div>
              <div className="absolute bottom-6 left-8 w-1 h-1 bg-[#6c757d] rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#FF9933] rounded-full"></div>
            </div>
            <div className="text-center z-10">
              <div className="w-12 h-12 bg-[#000080] rounded-full flex items-center justify-center mb-2 mx-auto">
                <MapPin size={24} className="text-white" />
              </div>
              <p className="text-[#1E2A38] text-sm">Issue Location</p>
              <p className="text-[#6c757d] text-xs">{location}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              onClick={handleGetDirections}
              className="w-full bg-[#000080] hover:bg-[#000066] text-white"
            >
              <Navigation size={16} className="mr-2" />
              Get Directions
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}