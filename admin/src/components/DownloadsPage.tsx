import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  Download, 
  FileText, 
  File, 
  FileSpreadsheet,
  Calendar as CalendarIcon,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Database
} from "lucide-react";
import { User } from "../lib/auth";
import { format } from "date-fns";

interface DownloadsPageProps {
  currentUser: User;
}

interface ExportConfig {
  format: 'pdf' | 'excel' | 'csv';
  reportType: 'all-reports' | 'performance' | 'analytics' | 'alerts';
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  includeImages: boolean;
  includeResolved: boolean;
  includePending: boolean;
  includeInProgress: boolean;
  categories: string[];
  workers: string[];
}

interface ExportHistory {
  id: string;
  fileName: string;
  format: string;
  size: string;
  exportedAt: Date;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

const mockExportHistory: ExportHistory[] = [
  {
    id: 'EXP-001',
    fileName: 'reports_january_2024.pdf',
    format: 'PDF',
    size: '2.4 MB',
    exportedAt: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 'EXP-002',
    fileName: 'worker_performance_q4_2023.xlsx',
    format: 'Excel',
    size: '1.8 MB',
    exportedAt: new Date('2024-01-14T15:45:00'),
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 'EXP-003',
    fileName: 'alerts_export.csv',
    format: 'CSV',
    size: '456 KB',
    exportedAt: new Date('2024-01-14T09:20:00'),
    status: 'processing',
  },
  {
    id: 'EXP-004',
    fileName: 'analytics_report_december.pdf',
    format: 'PDF',
    size: '3.2 MB',
    exportedAt: new Date('2024-01-13T14:15:00'),
    status: 'failed',
  }
];

const categories = [
  'sanitation',
  'public-works',
  'water-supply',
  'traffic',
  'parks',
  'lighting'
];

const workers = [
  'Rajesh Kumar',
  'Priya Singh',
  'Amit Sharma',
  'Sunita Devi'
];

export function DownloadsPage({ currentUser }: DownloadsPageProps) {
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: 'pdf',
    reportType: 'all-reports',
    dateRange: {
      from: undefined,
      to: undefined
    },
    includeImages: true,
    includeResolved: true,
    includePending: true,
    includeInProgress: true,
    categories: [],
    workers: []
  });

  const [exportHistory] = useState<ExportHistory[]>(mockExportHistory);
  const [isExporting, setIsExporting] = useState(false);

  if (currentUser.role !== 'department-admin') {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Download className="w-16 h-16 text-[#6c757d] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#1E2A38] mb-2">Access Restricted</h2>
          <p className="text-[#6c757d]">Data export functionality is only available to Department Administrators.</p>
        </CardContent>
      </Card>
    );
  }

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger the actual export
      console.log('Export configuration:', exportConfig);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-[#138808]" />;
      case 'processing': return <Clock className="w-4 h-4 text-[#FF9933]" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-[#dc3545]" />;
      default: return null;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <FileText className="w-4 h-4 text-[#dc3545]" />;
      case 'excel': case 'xlsx': return <FileSpreadsheet className="w-4 h-4 text-[#138808]" />;
      case 'csv': return <File className="w-4 h-4 text-[#FF9933]" />;
      default: return <File className="w-4 h-4 text-[#6c757d]" />;
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setExportConfig({
        ...exportConfig,
        categories: [...exportConfig.categories, category]
      });
    } else {
      setExportConfig({
        ...exportConfig,
        categories: exportConfig.categories.filter(c => c !== category)
      });
    }
  };

  const handleWorkerChange = (worker: string, checked: boolean) => {
    if (checked) {
      setExportConfig({
        ...exportConfig,
        workers: [...exportConfig.workers, worker]
      });
    } else {
      setExportConfig({
        ...exportConfig,
        workers: exportConfig.workers.filter(w => w !== worker)
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E2A38]">Downloads</h1>
        <p className="text-[#6c757d] mt-1">Export reports and data in various formats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#1E2A38]">
                <Database className="w-5 h-5 mr-2" />
                Export Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Type and Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#1E2A38]">Report Type</Label>
                  <Select value={exportConfig.reportType} onValueChange={(value: any) => setExportConfig({...exportConfig, reportType: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-reports">All Reports</SelectItem>
                      <SelectItem value="performance">Worker Performance</SelectItem>
                      <SelectItem value="analytics">Analytics Data</SelectItem>
                      <SelectItem value="alerts">Alerts & Announcements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#1E2A38]">Export Format</Label>
                  <Select value={exportConfig.format} onValueChange={(value: any) => setExportConfig({...exportConfig, format: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label className="text-[#1E2A38] mb-2 block">Date Range</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-[#6c757d]">From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportConfig.dateRange.from ? format(exportConfig.dateRange.from, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exportConfig.dateRange.from}
                          onSelect={(date) => setExportConfig({
                            ...exportConfig,
                            dateRange: { ...exportConfig.dateRange, from: date }
                          })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm text-[#6c757d]">To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportConfig.dateRange.to ? format(exportConfig.dateRange.to, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exportConfig.dateRange.to}
                          onSelect={(date) => setExportConfig({
                            ...exportConfig,
                            dateRange: { ...exportConfig.dateRange, to: date }
                          })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Status Filters */}
              <div>
                <Label className="text-[#1E2A38] mb-3 block">Include Status</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-resolved"
                      checked={exportConfig.includeResolved}
                      onCheckedChange={(checked) => setExportConfig({...exportConfig, includeResolved: !!checked})}
                    />
                    <Label htmlFor="include-resolved" className="text-sm">Resolved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-pending"
                      checked={exportConfig.includePending}
                      onCheckedChange={(checked) => setExportConfig({...exportConfig, includePending: !!checked})}
                    />
                    <Label htmlFor="include-pending" className="text-sm">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-progress"
                      checked={exportConfig.includeInProgress}
                      onCheckedChange={(checked) => setExportConfig({...exportConfig, includeInProgress: !!checked})}
                    />
                    <Label htmlFor="include-progress" className="text-sm">In Progress</Label>
                  </div>
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <Label className="text-[#1E2A38] mb-3 block">Categories</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={exportConfig.categories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm capitalize">
                        {category.replace('-', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workers Filter */}
              {exportConfig.reportType === 'performance' && (
                <div>
                  <Label className="text-[#1E2A38] mb-3 block">Workers</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {workers.map((worker) => (
                      <div key={worker} className="flex items-center space-x-2">
                        <Checkbox
                          id={`worker-${worker}`}
                          checked={exportConfig.workers.includes(worker)}
                          onCheckedChange={(checked) => handleWorkerChange(worker, !!checked)}
                        />
                        <Label htmlFor={`worker-${worker}`} className="text-sm">
                          {worker}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Options */}
              <div>
                <Label className="text-[#1E2A38] mb-3 block">Additional Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-images"
                    checked={exportConfig.includeImages}
                    onCheckedChange={(checked) => setExportConfig({...exportConfig, includeImages: !!checked})}
                  />
                  <Label htmlFor="include-images" className="text-sm">Include report images</Label>
                </div>
              </div>

              {/* Export Button */}
              <Separator />
              <div className="flex justify-end">
                <Button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="bg-[#138808] hover:bg-[#117507] text-white"
                >
                  {isExporting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export History */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E2A38]">Export History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportHistory.map((export_) => (
                  <div key={export_.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getFormatIcon(export_.format)}
                        <div>
                          <p className="text-sm font-medium text-[#1E2A38] truncate">
                            {export_.fileName}
                          </p>
                          <p className="text-xs text-[#6c757d]">
                            {export_.size} • {export_.exportedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {getStatusIcon(export_.status)}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          export_.status === 'completed' ? 'border-[#138808] text-[#138808]' :
                          export_.status === 'processing' ? 'border-[#FF9933] text-[#FF9933]' :
                          'border-[#dc3545] text-[#dc3545]'
                        }
                      >
                        {export_.status}
                      </Badge>

                      {export_.status === 'completed' && export_.downloadUrl && (
                        <Button size="sm" variant="outline" className="text-[#000080] border-[#000080] hover:bg-[#000080] hover:text-white">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {exportHistory.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-[#6c757d] mx-auto mb-3" />
                    <p className="text-[#6c757d]">No exports yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}