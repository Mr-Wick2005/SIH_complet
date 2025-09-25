import React from 'react';
import { CheckCircle, Calendar, MapPin, Building } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockResolvedIssues = [
  {
    id: 1,
    title: 'Road repair completed',
    description: 'Potholes filled and road surface improved',
    location: 'MG Road, Ranchi',
    category: 'Road',
    reportedDate: '2023-12-01',
    resolvedDate: '2023-12-15',
    solvedBy: 'Municipal Corporation',
    beforeImage: 'https://images.unsplash.com/photo-1738574138187-ae52275c61c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpYyUyMGluZnJhc3RydWN0dXJlJTIwcm9hZCUyMHJlcGFpcnxlbnwxfHx8fDE3NTgyMDc2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    afterImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwcmVwYWlyZWR8ZW58MXx8fHwxNzU4MjA3Nzc3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Streetlight restored',
    description: 'New LED streetlight installed and working properly',
    location: 'Station Road, Jamshedpur',
    category: 'Streetlight',
    reportedDate: '2023-11-20',
    resolvedDate: '2023-11-25',
    solvedBy: 'Electricity Department',
    beforeImage: 'https://images.unsplash.com/photo-1742119193536-7d228ef7f466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBzdHJlZXRsaWdodCUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc1ODEwNTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    afterImage: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXRsaWdodCUyMHdvcmtpbmd8ZW58MXx8fHwxNzU4MjA3Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Waste collection resumed',
    description: 'Regular garbage pickup schedule restored in the area',
    location: 'Civil Lines, Dhanbad',
    category: 'Garbage',
    reportedDate: '2023-11-15',
    resolvedDate: '2023-11-18',
    solvedBy: 'Sanitation Department',
    beforeImage: 'https://images.unsplash.com/photo-1690211506506-57486e819dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwd2FzdGUlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc1ODIwNzYyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    afterImage: 'https://images.unsplash.com/photo-1558618047-1c4e4e21e1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHN0cmVldHxlbnwxfHx8fDE3NTgyMDc3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function ResolvedScreen() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-[#138808] text-white p-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-6 h-6" />
          <h1 className="text-xl font-bold">Resolved Issues</h1>
        </div>
        <p className="text-sm opacity-80 mt-1">Issues that have been successfully resolved</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {mockResolvedIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-lg shadow-sm border">
            {/* Header with success indicator */}
            <div className="bg-green-50 p-4 rounded-t-lg border-b border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                <span className="text-sm text-green-700">Solved By: {issue.solvedBy}</span>
              </div>
              <h3 className="font-bold text-[#1E2A38]">{issue.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
            </div>

            <div className="p-4 space-y-4">
              {/* Location and dates */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {issue.location}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reported: {new Date(issue.reportedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Resolved: {new Date(issue.resolvedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Before/After Images */}
              <div>
                <h4 className="font-semibold text-[#1E2A38] mb-3">Before & After</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Before</p>
                    <ImageWithFallback 
                      src={issue.beforeImage}
                      alt={`${issue.title} before`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">After</p>
                    <ImageWithFallback 
                      src={issue.afterImage}
                      alt={`${issue.title} after`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                </div>
              </div>

              {/* Category and Authority */}
              <div className="flex items-center justify-between pt-3 border-t">
                <Badge variant="outline" className="text-[#1E2A38]">
                  [{issue.category}]
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-4 h-4 mr-1" />
                  {issue.solvedBy}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state message */}
        {mockResolvedIssues.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No resolved issues yet</h3>
            <p className="text-gray-500">Resolved issues will appear here once authorities take action.</p>
          </div>
        )}
      </div>
    </div>
  );
}