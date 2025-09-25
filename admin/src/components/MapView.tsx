import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { mockReports, categoryColors, Report } from "../lib/mock-data";

export function MapView() {
  const [isHeatmapMode, setIsHeatmapMode] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string, // use .env
  });

  // Fetch issues (replace mockReports with real API later)
  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/issues"); // ✅ replace with your backend endpoint
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        } else {
          setReports(mockReports); // fallback demo
        }
      } catch {
        setReports(mockReports);
      }
    }
    fetchReports();
  }, []);

  const containerStyle = { width: "100%", height: "500px" };
  const defaultCenter = { lat: 19.0760, lng: 72.8777 }; // Mumbai

  if (!isLoaded) {
    return <div className="p-4 text-gray-500">Loading Map...</div>;
  }

  return (
    <Card className="h-[600px]">
      {/* 🔹 Keep your CardHeader as-is (Pin vs Heatmap toggle, Layers button) */}
      <CardContent className="p-0 h-[500px] relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
        >
          {!isHeatmapMode &&
            reports.map((report) => (
              <Marker
                key={report.id}
                position={{
                  lat: report.location.lat,
                  lng: report.location.lng,
                }}
                icon={{
                  url: categoryColors[report.category],
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={() => setSelectedReport(report)}
              />
            ))}
        </GoogleMap>

        {/* 🔹 Legend (keep same as your code) */}
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-1">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="capitalize">{category.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Popup when marker clicked */}
        {selectedReport && (
          <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl max-w-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{selectedReport.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedReport(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {selectedReport.description}
            </p>
            <div className="flex gap-2 mb-2">
              <Badge
                variant="outline"
                style={{ color: categoryColors[selectedReport.category] }}
              >
                {selectedReport.category}
              </Badge>
              <Badge
                variant={
                  selectedReport.priority === "critical"
                    ? "destructive"
                    : "secondary"
                }
              >
                {selectedReport.priority}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              {selectedReport.location.address}
            </p>
            <p className="text-xs text-gray-500">
              Status: {selectedReport.status}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
