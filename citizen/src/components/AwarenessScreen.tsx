import { BookOpen, Megaphone, Lightbulb, FileText, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AwarenessScreen() {
  const announcements = [
    {
      id: 1,
      title: 'Swachh Bharat Mission 2024',
      description: 'Join us in making Jharkhand cleaner. Report garbage issues through CivicSense.',
      date: '15 Jan 2024',
      type: 'announcement',
      urgent: true
    },
    {
      id: 2,
      title: 'New Waste Collection Schedule',
      description: 'Updated timings for garbage collection in urban areas. Check your local schedule.',
      date: '12 Jan 2024',
      type: 'update',
      urgent: false
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'How to Report Issues Effectively',
      description: 'Learn to write clear descriptions and take good photos',
      icon: '📝',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Civic Responsibility Guide',
      description: 'Your role in building a better community',
      icon: '🤝',
      readTime: '5 min read'
    },
    {
      id: 3,
      title: 'Digital India Initiative',
      description: 'How technology is transforming governance',
      icon: '💻',
      readTime: '4 min read'
    }
  ];

  const infographics = [
    {
      id: 1,
      title: 'Waste Segregation Made Easy',
      image: 'https://images.unsplash.com/photo-1620609997104-1cd7ca877232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwd2FzdGUlMjBkdW1wfGVufDF8fHx8MTc1ODIwMTUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Learn the right way to separate your waste'
    },
    {
      id: 2,
      title: 'Road Safety Guidelines',
      image: 'https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb2FkJTIwcG90aG9sZSUyMGRhbWFnZXxlbnwxfHx8fDE3NTgxNjgwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Tips for safer roads and responsible driving'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#000080] text-white p-4 pt-12">
        <div className="flex items-center mb-2">
          <BookOpen size={24} className="mr-2" />
          <h1 className="text-xl">Awareness</h1>
        </div>
        <p className="text-blue-200 text-sm">Stay informed and be a responsible citizen</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Government Announcements */}
        <div className="p-4 border-b border-[#e9ecef]">
          <div className="flex items-center mb-3">
            <Megaphone size={20} className="text-[#FF9933] mr-2" />
            <h2 className="text-lg text-[#1E2A38]">Government Announcements</h2>
          </div>
          
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-[#f8f9fa] rounded-lg p-4 border-l-4 border-[#FF9933]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#1E2A38] pr-2">{announcement.title}</h3>
                  {announcement.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6c757d] mb-2">{announcement.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6c757d]">{announcement.date}</span>
                  <Button variant="outline" size="sm" className="text-xs">
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Civic Responsibility Guides */}
        <div className="p-4 border-b border-[#e9ecef]">
          <div className="flex items-center mb-3">
            <Lightbulb size={20} className="text-[#138808] mr-2" />
            <h2 className="text-lg text-[#1E2A38]">Civic Guidelines</h2>
          </div>
          
          <div className="space-y-3">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white border border-[#e9ecef] rounded-lg p-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">{guide.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-[#1E2A38] mb-1">{guide.title}</h3>
                    <p className="text-sm text-[#6c757d] mb-2">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6c757d]">{guide.readTime}</span>
                      <Button variant="ghost" size="sm" className="text-xs text-[#000080]">
                        <ExternalLink size={12} className="mr-1" />
                        Read
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infographics */}
        <div className="p-4">
          <div className="flex items-center mb-3">
            <FileText size={20} className="text-[#FF9933] mr-2" />
            <h2 className="text-lg text-[#1E2A38]">Infographics</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {infographics.map((infographic) => (
              <div key={infographic.id} className="bg-white border border-[#e9ecef] rounded-lg overflow-hidden">
                <div className="relative h-40">
                  <ImageWithFallback
                    src={infographic.image}
                    alt={infographic.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button className="bg-white/90 text-[#1E2A38] hover:bg-white">
                      View Infographic
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[#1E2A38] mb-2">{infographic.title}</h3>
                  <p className="text-sm text-[#6c757d]">{infographic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-4 bg-[#f8f9fa] border-t border-[#e9ecef]">
          <div className="text-center">
            <h3 className="text-[#1E2A38] mb-2">Need Help?</h3>
            <p className="text-sm text-[#6c757d] mb-3">
              Contact your local municipal office for immediate assistance
            </p>
            <div className="space-y-2">
              <div className="text-sm text-[#1E2A38]">
                📞 Helpline: 1800-XXX-XXXX
              </div>
              <div className="text-sm text-[#1E2A38]">
                ✉️ Email: civic@jharkhand.gov.in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}