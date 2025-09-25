import { ArrowLeft, AlertTriangle, Cloud, Car } from 'lucide-react';
import { Button } from './ui/button';

interface AlertsScreenProps {
  onBack: () => void;
}

export function AlertsScreen({ onBack }: AlertsScreenProps) {
  const alerts = [
    {
      id: 1,
      title: 'Dengue Alert - Ranchi District',
      priority: 'HIGH',
      priorityColor: 'bg-red-500',
      icon: AlertTriangle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      timeAgo: '2 hours ago',
      description: 'Increased cases of dengue fever reported in the area. Take preventive measures.',
      precautions: [
        'Remove standing water from containers',
        'Use mosquito repellent',
        'Wear long-sleeved clothing',
        'Keep surroundings clean'
      ],
      issuedBy: 'Health Department, Jharkhand'
    },
    {
      id: 2,
      title: 'Heavy Rainfall Warning',
      priority: 'MEDIUM',
      priorityColor: 'bg-yellow-500',
      icon: Cloud,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      timeAgo: '4 hours ago',
      description: 'Heavy to very heavy rainfall expected in the next 48 hours.',
      precautions: [
        'Avoid unnecessary travel',
        'Keep emergency supplies ready',
        'Stay away from waterlogged areas',
        'Check weather updates regularly'
      ],
      issuedBy: 'Meteorological Department'
    },
    {
      id: 3,
      title: 'Road Safety Advisory',
      priority: 'MEDIUM',
      priorityColor: 'bg-yellow-500',
      icon: Car,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      timeAgo: '1 day ago',
      description: 'Increased traffic accidents reported on major highways.',
      precautions: [
        'Follow traffic rules strictly',
        'Maintain safe driving distance',
        'Avoid speeding',
        'Use seat belts and helmets'
      ],
      issuedBy: 'Traffic Police Department'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 pt-12">
        <div className="flex items-center mb-3">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl">Alerts & Warnings</h1>
            <p className="text-red-100 text-sm">Stay informed, stay safe</p>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* Alert Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${alert.iconBg}`}>
                      <Icon size={20} className={alert.iconColor} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#1E2A38] text-sm mb-1">{alert.title}</h3>
                      <p className="text-xs text-[#6c757d]">{alert.timeAgo}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs text-white ${alert.priorityColor}`}>
                    {alert.priority}
                  </span>
                </div>
                <p className="text-sm text-[#6c757d] leading-relaxed">{alert.description}</p>
              </div>

              {/* Precautions */}
              <div className="p-4">
                <h4 className="text-sm text-[#1E2A38] mb-3">Precautions to take:</h4>
                <ul className="space-y-2">
                  {alert.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-[#6c757d] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-sm text-[#6c757d]">{precaution}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-[#6c757d]">
                    Issued by: <span className="text-[#1E2A38]">{alert.issuedBy}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}