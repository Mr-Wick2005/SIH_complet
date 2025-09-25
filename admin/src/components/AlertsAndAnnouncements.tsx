import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Send, AlertTriangle, Info, Megaphone, Clock, MapPin } from "lucide-react";
import { User } from "../lib/auth";

interface AlertsAndAnnouncementsProps {
  currentUser: User;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'announcement';
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'draft' | 'expired';
  createdAt: Date;
  location?: string;
  issuer: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    title: 'Dengue Alert - Ranchi District',
    description: 'Increased cases of dengue fever reported in the area. Take preventive measures including removing standing water from containers, using mosquito repellent, wearing long-sleeved clothing, and keeping surroundings clean.',
    type: 'alert',
    priority: 'high',
    status: 'active',
    createdAt: new Date('2024-01-15T07:30:00'),
    location: 'Ranchi District',
    issuer: 'Health Department, Jharkhand'
  },
  {
    id: 'ALT-002',
    title: 'Heavy Rainfall Warning',
    description: 'Heavy to very heavy rainfall expected in the next 48 hours. Citizens are advised to avoid waterlogged areas and stay indoors during severe weather.',
    type: 'alert',
    priority: 'medium',
    status: 'active',
    createdAt: new Date('2024-01-15T03:45:00'),
    issuer: 'Meteorological Department'
  },
  {
    id: 'ANN-001',
    title: 'Swachh Bharat Mission 2024',
    description: 'Join us in making Jharkhand cleaner. Report garbage issues through CitySeva mobile app and contribute to our cleanliness drive.',
    type: 'announcement',
    priority: 'medium',
    status: 'active',
    createdAt: new Date('2024-01-14T10:00:00'),
    issuer: 'Municipal Corporation'
  },
  {
    id: 'ANN-002',
    title: 'New Waste Collection Schedule',
    description: 'Updated timings for garbage collection in urban areas. Check your local schedule on the CitySeva app for exact timings in your area.',
    type: 'announcement',
    priority: 'low',
    status: 'active',
    createdAt: new Date('2024-01-13T15:20:00'),
    issuer: 'Sanitation Department'
  }
];

export function AlertsAndAnnouncements({ currentUser }: AlertsAndAnnouncementsProps) {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'announcement' as 'alert' | 'announcement',
    priority: 'medium' as 'high' | 'medium' | 'low',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAlert: Alert = {
      id: `${formData.type.toUpperCase().substring(0, 3)}-${Date.now().toString().substring(-3)}`,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      priority: formData.priority,
      status: 'active',
      createdAt: new Date(),
      location: formData.location || undefined,
      issuer: currentUser.name
    };

    setAlerts([newAlert, ...alerts]);
    setFormData({
      title: '',
      description: '',
      type: 'announcement',
      priority: 'medium',
      location: ''
    });
    setShowForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-[#dc3545] text-white';
      case 'medium': return 'bg-[#FF9933] text-white';
      case 'low': return 'bg-[#138808] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'alert' ? AlertTriangle : Megaphone;
  };

  const canCreateAlerts = currentUser.role === 'department-admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E2A38]">Alerts & Announcements</h1>
          <p className="text-[#6c757d] mt-1">Manage public alerts and government announcements</p>
        </div>
        {canCreateAlerts && (
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-[#FF9933] hover:bg-[#e6873d] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
        )}
      </div>

      {/* Create Form */}
      {showForm && canCreateAlerts && (
        <Card className="border-l-4 border-l-[#FF9933]">
          <CardHeader>
            <CardTitle className="text-[#1E2A38]">Create New Alert/Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Type</label>
                  <Select value={formData.type} onValueChange={(value: 'alert' | 'announcement') => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Priority</label>
                  <Select value={formData.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter title..."
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter detailed description..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1E2A38] mb-2 block">Location (Optional)</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Specify location if applicable..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#138808] hover:bg-[#117507] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {alerts.map((alert) => {
          const IconComponent = getTypeIcon(alert.type);
          return (
            <Card key={alert.id} className={`${alert.type === 'alert' ? 'border-l-4 border-l-[#dc3545]' : 'border-l-4 border-l-[#000080]'}`}>
              <CardHeader className={`${alert.type === 'alert' ? 'bg-[#dc3545]' : 'bg-[#000080]'} text-white rounded-t-md`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5" />
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                  </div>
                  <Badge className={getPriorityColor(alert.priority)}>
                    {alert.priority.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-[#1E2A38] mb-4">{alert.description}</p>
                
                {alert.location && (
                  <div className="flex items-center text-[#6c757d] text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {alert.location}
                  </div>
                )}

                <Separator className="my-3" />
                
                <div className="flex items-center justify-between text-sm text-[#6c757d]">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {alert.createdAt.toLocaleDateString()} {alert.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Issued by:</p>
                    <p className="text-[#1E2A38]">{alert.issuer}</p>
                  </div>
                </div>

                {canCreateAlerts && (
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button size="sm" variant="outline" className="text-[#FF9933] border-[#FF9933] hover:bg-[#FF9933] hover:text-white">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-[#dc3545] border-[#dc3545] hover:bg-[#dc3545] hover:text-white">
                      Deactivate
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Info className="w-12 h-12 text-[#6c757d] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#1E2A38] mb-2">No Alerts or Announcements</h3>
            <p className="text-[#6c757d]">
              {canCreateAlerts 
                ? "Create your first alert or announcement to notify citizens."
                : "No active alerts or announcements at this time."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}