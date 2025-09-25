import { ClipboardList, Clock, CheckCircle, User } from 'lucide-react';

interface FieldWorkerBottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FieldWorkerBottomNavigation({ activeTab, onTabChange }: FieldWorkerBottomNavigationProps) {
  const tabs = [
    { id: 'assigned', label: 'Assigned', icon: ClipboardList },
    { id: 'progress', label: 'Progress', icon: Clock },
    { id: 'resolved', label: 'Resolved', icon: CheckCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e9ecef] safe-area-pb">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 px-1 ${
                isActive 
                  ? 'text-[#000080]' 
                  : 'text-[#6c757d]'
              }`}
            >
              <div className={`p-1 rounded-lg ${
                isActive ? 'bg-[#000080]/10' : ''
              }`}>
                <Icon 
                  size={20} 
                  className={isActive ? 'text-[#000080]' : ''}
                />
              </div>
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}