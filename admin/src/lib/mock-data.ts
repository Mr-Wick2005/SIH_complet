export interface Report {
  id: string;
  title: string;
  description: string;
  category: 'sanitation' | 'public-works' | 'water-supply' | 'traffic' | 'parks' | 'lighting';
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  submittedAt: Date;
  assignedTo?: string;
  departmentId: string;
  imageUrl?: string;
  timeline: {
    status: string;
    timestamp: Date;
    note?: string;
  }[];
}

export const categoryColors = {
  sanitation: '#ef4444', // red
  'public-works': '#3b82f6', // blue  
  'water-supply': '#06b6d4', // cyan
  traffic: '#f59e0b', // amber
  parks: '#10b981', // emerald
  lighting: '#8b5cf6', // violet
};

export const categoryIcons = {
  sanitation: 'Trash2',
  'public-works': 'Construction',
  'water-supply': 'Droplets',
  traffic: 'Car',
  parks: 'Trees',
  lighting: 'Lightbulb',
};

export const departments = {
  'main-department': 'Municipal Services Department',
};

// Mock report data
export const mockReports: Report[] = [
  {
    id: 'RPT-001',
    title: 'Overflowing garbage bin',
    description: 'Large garbage bin on Main Street is overflowing, attracting pests and creating unsanitary conditions.',
    category: 'sanitation',
    location: {
      address: '123 Main Street, Downtown',
      lat: 40.7128,
      lng: -74.0060,
    },
    status: 'new',
    priority: 'high',
    submittedAt: new Date('2024-01-15T09:30:00'),
    departmentId: 'main-department',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    timeline: [
      { status: 'new', timestamp: new Date('2024-01-15T09:30:00') }
    ],
  },
  {
    id: 'RPT-002',
    title: 'Pothole on Oak Avenue',
    description: 'Large pothole causing vehicle damage near the intersection of Oak Avenue and 5th Street.',
    category: 'public-works',
    location: {
      address: 'Oak Avenue & 5th Street',
      lat: 40.7589,
      lng: -73.9851,
    },
    status: 'in-progress',
    priority: 'critical',
    submittedAt: new Date('2024-01-14T14:20:00'),
    assignedTo: 'John Smith',
    departmentId: 'main-department',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    timeline: [
      { status: 'new', timestamp: new Date('2024-01-14T14:20:00') },
      { status: 'acknowledged', timestamp: new Date('2024-01-14T15:10:00'), note: 'Assigned to road crew' },
      { status: 'in-progress', timestamp: new Date('2024-01-15T08:00:00'), note: 'Crew dispatched to location' }
    ],
  },
  {
    id: 'RPT-003',
    title: 'Water main leak',
    description: 'Water bubbling up from street, possible main line break affecting water pressure.',
    category: 'water-supply',
    location: {
      address: '456 Park Boulevard',
      lat: 40.7505,
      lng: -73.9934,
    },
    status: 'resolved',
    priority: 'critical',
    submittedAt: new Date('2024-01-13T11:45:00'),
    assignedTo: 'Maria Garcia',
    departmentId: 'main-department',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop',
    timeline: [
      { status: 'new', timestamp: new Date('2024-01-13T11:45:00') },
      { status: 'acknowledged', timestamp: new Date('2024-01-13T12:00:00') },
      { status: 'in-progress', timestamp: new Date('2024-01-13T13:30:00') },
      { status: 'resolved', timestamp: new Date('2024-01-14T16:20:00'), note: 'Main line repaired, water service restored' }
    ],
  },
  {
    id: 'RPT-004',
    title: 'Broken streetlight',
    description: 'Streetlight pole damaged, light not working creating unsafe conditions at night.',
    category: 'lighting',
    location: {
      address: '789 Elm Street',
      lat: 40.7410,
      lng: -74.0012,
    },
    status: 'acknowledged',
    priority: 'medium',
    submittedAt: new Date('2024-01-15T07:15:00'),
    departmentId: 'main-department',
    timeline: [
      { status: 'new', timestamp: new Date('2024-01-15T07:15:00') },
      { status: 'acknowledged', timestamp: new Date('2024-01-15T09:45:00'), note: 'Work order created' }
    ],
  },
  {
    id: 'RPT-005',
    title: 'Traffic light malfunction',
    description: 'Traffic light stuck on red in all directions, causing traffic backup.',
    category: 'traffic',
    location: {
      address: 'Broadway & 42nd Street',
      lat: 40.7580,
      lng: -73.9855,
    },
    status: 'new',
    priority: 'critical',
    submittedAt: new Date('2024-01-15T10:20:00'),
    departmentId: 'main-department',
    timeline: [
      { status: 'new', timestamp: new Date('2024-01-15T10:20:00') }
    ],
  },
];

export const getTodaysStats = () => {
  const today = new Date();
  const todayReports = mockReports.filter(report => 
    report.submittedAt.toDateString() === today.toDateString()
  );
  
  return {
    totalReports: mockReports.length,
    todayReports: todayReports.length,
    inProgress: mockReports.filter(r => r.status === 'in-progress').length,
    resolved: mockReports.filter(r => r.status === 'resolved').length,
    avgResponseTime: '2.4 hours',
  };
};

export const getCategoryStats = () => {
  const stats = mockReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(stats).map(([category, count]) => ({
    category,
    count,
    color: categoryColors[category as keyof typeof categoryColors],
  }));
};