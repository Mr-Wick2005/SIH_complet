import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  ClipboardList, 
  User, 
  MapPin, 
  Clock, 
  Search,
  Filter,
  UserPlus,
  Bot,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { User as UserType } from "../lib/auth";
import { Report, mockReports } from "../lib/mock-data";

interface AssignmentsPageProps {
  currentUser: UserType;
}

interface Worker {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'busy' | 'offline';
  assignedReports: number;
  expertise: string[];
  location: string;
  rating: number;
}

const mockWorkers: Worker[] = [
  {
    id: 'W001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@cityseva.gov',
    status: 'available',
    assignedReports: 2,
    expertise: ['sanitation', 'public-works'],
    location: 'Ranchi Central',
    rating: 4.8
  },
  {
    id: 'W002',
    name: 'Priya Singh',
    email: 'priya.singh@cityseva.gov',
    status: 'busy',
    assignedReports: 4,
    expertise: ['water-supply', 'lighting'],
    location: 'Dhurwa',
    rating: 4.6
  },
  {
    id: 'W003',
    name: 'Amit Sharma',
    email: 'amit.sharma@cityseva.gov',
    status: 'available',
    assignedReports: 1,
    expertise: ['traffic', 'public-works'],
    location: 'Hatia',
    rating: 4.9
  },
  {
    id: 'W004',
    name: 'Sunita Devi',
    email: 'sunita.devi@cityseva.gov',
    status: 'available',
    assignedReports: 3,
    expertise: ['sanitation', 'parks'],
    location: 'Kanke',
    rating: 4.7
  }
];

export function AssignmentsPage({ currentUser }: AssignmentsPageProps) {
  const [unassignedReports] = useState<Report[]>(
    mockReports.filter(report => !report.assignedTo && report.status === 'new')
  );
  const [workers] = useState<Worker[]>(mockWorkers);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchWorker, setSearchWorker] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getAISuggestion = (report: Report) => {
    const suggestions = workers
      .filter(worker => 
        worker.expertise.includes(report.category) && 
        worker.status === 'available'
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);

    return suggestions[0] || null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-[#138808] text-white';
      case 'busy': return 'bg-[#FF9933] text-white';
      case 'offline': return 'bg-[#6c757d] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-[#dc3545] text-white';
      case 'high': return 'bg-[#FF9933] text-white';
      case 'medium': return 'bg-[#000080] text-white';
      case 'low': return 'bg-[#138808] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchWorker.toLowerCase()) ||
                         worker.location.toLowerCase().includes(searchWorker.toLowerCase());
    const matchesStatus = filterStatus === 'all' || worker.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAssignReport = (report: Report, worker: Worker) => {
    // In a real app, this would make an API call
    console.log(`Assigning report ${report.id} to worker ${worker.name}`);
    // Update local state or refetch data
  };

  const canAssignReports = currentUser.role === 'department-admin';

  if (!canAssignReports) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ClipboardList className="w-16 h-16 text-[#6c757d] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#1E2A38] mb-2">Access Restricted</h2>
          <p className="text-[#6c757d]">Report assignments are managed by Department Administrators.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E2A38]">Assignments</h1>
        <p className="text-[#6c757d] mt-1">Assign unresolved reports to field workers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unassigned Reports */}
        <Card className="border-l-4 border-l-[#dc3545]">
          <CardHeader>
            <CardTitle className="flex items-center text-[#1E2A38]">
              <AlertCircle className="w-5 h-5 mr-2 text-[#dc3545]" />
              Unassigned Reports ({unassignedReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {unassignedReports.map((report) => {
                const aiSuggestion = getAISuggestion(report);
                return (
                  <Card 
                    key={report.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedReport?.id === report.id ? 'border-[#FF9933] bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-[#1E2A38]">{report.title}</h4>
                          <p className="text-sm text-[#6c757d] mt-1">{report.id}</p>
                        </div>
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-[#6c757d] mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {report.location.address}
                      </div>
                      
                      <div className="flex items-center text-sm text-[#6c757d] mb-3">
                        <Clock className="w-4 h-4 mr-1" />
                        {report.submittedAt.toLocaleDateString()}
                      </div>

                      {aiSuggestion && (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-2 mt-2">
                          <div className="flex items-center text-sm">
                            <Bot className="w-4 h-4 mr-1 text-[#000080]" />
                            <span className="font-medium text-[#000080]">AI Suggestion:</span>
                          </div>
                          <p className="text-sm text-[#1E2A38] mt-1">
                            Best match: <strong>{aiSuggestion.name}</strong> ({aiSuggestion.location})
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {unassignedReports.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#138808] mx-auto mb-3" />
                  <p className="text-[#6c757d]">All reports are assigned!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Workers */}
        <Card className="border-l-4 border-l-[#138808]">
          <CardHeader>
            <CardTitle className="flex items-center text-[#1E2A38]">
              <User className="w-5 h-5 mr-2 text-[#138808]" />
              Field Workers
            </CardTitle>
            
            {/* Worker Filters */}
            <div className="flex space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d] h-4 w-4" />
                <Input
                  placeholder="Search workers..."
                  value={searchWorker}
                  onChange={(e) => setSearchWorker(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="hover:bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-[#FF9933] text-white">
                            {worker.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-[#1E2A38]">{worker.name}</h4>
                          <p className="text-sm text-[#6c757d]">{worker.email}</p>
                          <div className="flex items-center text-sm text-[#6c757d] mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {worker.location}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(worker.status)}>
                        {worker.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-[#6c757d]">Active Reports:</span>
                        <span className="ml-2 font-medium text-[#1E2A38]">{worker.assignedReports}</span>
                      </div>
                      <div>
                        <span className="text-[#6c757d]">Rating:</span>
                        <span className="ml-2 font-medium text-[#1E2A38]">{worker.rating}⭐</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-[#6c757d] mb-1">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {worker.expertise.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedReport && (
                      <Button
                        size="sm"
                        className="w-full bg-[#138808] hover:bg-[#117507] text-white"
                        onClick={() => handleAssignReport(selectedReport, worker)}
                        disabled={worker.status !== 'available'}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Assign Report
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Instructions */}
      {!selectedReport && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center text-[#000080]">
              <Bot className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">How to assign reports:</p>
                <p className="text-sm mt-1">
                  1. Select an unassigned report from the left panel
                  2. Choose an appropriate worker from the right panel
                  3. Click "Assign Report" to complete the assignment
                  4. AI suggestions highlight the best worker matches based on expertise and availability
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}