import { useState } from 'react';
import { ArrowLeft, Camera, Upload, MapPin, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function ReportScreen() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: 'Auto-detected: Current Location',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Issue reported successfully! We will review it soon.');
      // Reset form
      setFormData({
        category: '',
        title: '',
        description: '',
        location: 'Auto-detected: Current Location',
        image: null
      });
    }, 2000);
  };

  const canSubmit = formData.category && formData.title && formData.description;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#1E2A38] text-white p-4 pt-12 flex items-center">
        <ArrowLeft size={24} className="mr-3" />
        <h1 className="text-xl">Report Issue</h1>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-6">
          {/* Photo of Issue */}
          <div>
            <Label className="text-[#1E2A38] mb-3 block">Photo of Issue</Label>
            
            {/* Photo Upload Area */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera size={32} className="text-gray-400" />
              </div>
            </div>

            {/* Upload Buttons */}
            <div className="space-y-3">
              <label className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-[#e9ecef] text-[#6c757d] hover:bg-gray-50"
                  asChild
                >
                  <div className="flex items-center justify-center space-x-2 cursor-pointer">
                    <Camera size={18} />
                    <span>Take Photo</span>
                  </div>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <label className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-[#e9ecef] text-[#6c757d] hover:bg-gray-50"
                  asChild
                >
                  <div className="flex items-center justify-center space-x-2 cursor-pointer">
                    <Upload size={18} />
                    <span>Upload from Gallery</span>
                  </div>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {formData.image && (
              <p className="text-sm text-[#138808] mt-2">✓ Image selected: {formData.image.name}</p>
            )}
          </div>

          {/* Issue Title */}
          <div>
            <Label htmlFor="title" className="text-[#1E2A38] mb-2 block">Issue Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief title for the issue"
              className="h-12 bg-gray-50 border-gray-300 text-[#6c757d] placeholder:text-[#6c757d]"
            />
          </div>

          {/* Category */}
          <div>
            <Label className="text-[#1E2A38] mb-2 block">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="h-12 bg-gray-50 border-gray-300 text-[#6c757d]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="road">Road</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="streetlight">Streetlight</SelectItem>
                <SelectItem value="garbage">Garbage</SelectItem>
                <SelectItem value="animal">Animal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label className="text-[#1E2A38] mb-2 block">Location</Label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d]" />
              <Input
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10 h-12 bg-gray-50 border-gray-300 text-[#000080]"
                placeholder="Auto-detected: Current Location"
              />
            </div>
            <p className="text-xs text-[#6c757d] mt-1">Location auto-detected. Tap to edit manually</p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-[#1E2A38] mb-2 block">Description</Label>
            <div className="relative">
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue in detail..."
                className="bg-gray-50 border-gray-300 text-[#6c757d] placeholder:text-[#6c757d] min-h-24 pr-12"
              />
              <button className="absolute bottom-3 right-3 p-2 text-[#6c757d] hover:text-[#FF9933]">
                <Mic size={16} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full h-12 bg-[#FF9933] hover:bg-[#e6851a] text-white disabled:bg-[#6c757d] rounded-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Report'
              )}
            </Button>
          </div>

          {/* Reporting Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="text-[#000080] mb-3">Reporting Tips:</h4>
            <ul className="space-y-2 text-sm text-[#000080]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Provide clear photos of the issue</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Be specific about the location</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include relevant details that help authorities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Choose the most appropriate category</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}