import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Report, categoryColors, departments } from "../lib/mock-data";
import { User, hasPermission } from "../lib/auth";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  MapPin, 
  Clock, 
  User as UserIcon, 
  FileText, 
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Calendar
} from "lucide-react";

interface ReportDetailsModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdateReport: (reportId: string, updates: Partial<Report>) => void;
}

export function ReportDetailsModal({ 
  report, 
  isOpen, 
  onClose, 
  currentUser,
  onUpdateReport 
}: ReportDetailsModalProps) {
  const [newStatus, setNewStatus] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [internalNote, setInternalNote] = useState("");

  if (!report) return null;

  const handleStatusUpdate = () => {
    if (newStatus) {
      const newTimeline = [...report.timeline, {
        status: newStatus,
        timestamp: new Date(),
        note: internalNote || undefined
      }];
      
      onUpdateReport(report.id, { 
        status: newStatus as any,
        timeline: newTimeline,
        ...(newAssignee && { assignedTo: newAssignee })
      });
      
      setNewStatus("");
      setNewAssignee("");
      setInternalNote("");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'acknowledged': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'closed': return <CheckCircle2 className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const canUpdateStatus = hasPermission(currentUser, 'update-report-status');
  const canAssignReports = hasPermission(currentUser, 'assign-reports');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Report Details - {report.id}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Summary */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{report.title}</h3>
                  <p className="text-gray-600 mt-1">{report.description}</p>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    style={{ 
                      color: categoryColors[report.category],
                      borderColor: categoryColors[report.category] + '40',
                      backgroundColor: categoryColors[report.category] + '10'
                    }}
                  >
                    {report.category.replace('-', ' ')}
                  </Badge>
                  <Badge variant={report.priority === 'critical' ? 'destructive' : 'secondary'}>
                    {report.priority}
                  </Badge>
                </div>
              </div>

              {/* Image */}
              {report.imageUrl && (
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Location & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{report.location.address}</p>
                    <p className="text-xs text-gray-500">
                      {report.location.lat}, {report.location.lng}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Submitted</p>
                    <p className="text-sm text-gray-600">{formatDateTime(report.submittedAt)}</p>
                    <p className="text-xs text-gray-500">
                      {departments[report.departmentId as keyof typeof departments]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-medium mb-3">Status Timeline</h4>
              <div className="space-y-3">
                {report.timeline.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getStatusIcon(entry.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium capitalize">{entry.status.replace('-', ' ')}</p>
                        <p className="text-sm text-gray-500">{formatDateTime(entry.timestamp)}</p>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">Current Status</h4>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(report.status)}
                <span className="capitalize font-medium">{report.status.replace('-', ' ')}</span>
              </div>
              {report.assignedTo && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserIcon className="w-4 h-4" />
                  Assigned to: {report.assignedTo}
                </div>
              )}
            </div>

            {/* Update Status */}
            {canUpdateStatus && (
              <div className="p-4 border rounded-lg space-y-4">
                <h4 className="font-medium">Update Status</h4>
                
                <div className="space-y-3">
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  {canAssignReports && (
                    <Select value={newAssignee} onValueChange={setNewAssignee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign to officer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith</SelectItem>
                        <SelectItem value="Maria Garcia">Maria Garcia</SelectItem>
                        <SelectItem value="David Wilson">David Wilson</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  <Textarea
                    placeholder="Add internal note (optional)"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    rows={3}
                  />

                  <Button 
                    onClick={handleStatusUpdate}
                    disabled={!newStatus}
                    className="w-full"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="p-4 border rounded-lg space-y-3">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request More Info
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Contact Reporter
                </Button>
              </div>
            </div>

            {/* Reporter Info */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">Reporter Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Submission ID:</span>
                  <span className="font-mono">{report.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Source:</span>
                  <span>Mobile App</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Citizen ID:</span>
                  <span>Anonymous</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}