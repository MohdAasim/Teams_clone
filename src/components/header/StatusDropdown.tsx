import React from 'react';
import {
  CheckmarkCircleFilled,
  CircleFilled,
  DismissCircleFilled,
  ClockRegular,
  PresenceOfflineRegular,
  HistoryRegular,
} from '@fluentui/react-icons';

interface StatusDropdownProps {
  onSelectStatus: (status: string) => void;
  currentStatus: string;
  onResetStatus: () => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ 
  onSelectStatus, 
  currentStatus,
  onResetStatus 
}) => {
  const statusOptions = [
    { 
      name: 'Available', 
      color: '#6BB700',
      icon: <CheckmarkCircleFilled style={{ color: '#6BB700' }} />
    },
    { 
      name: 'Busy', 
      color: '#D92C2C',
      icon: <CircleFilled style={{ color: '#D92C2C' }} />
    },
    { 
      name: 'Do not disturb', 
      color: '#D92C2C',
      icon: <DismissCircleFilled style={{ color: '#D92C2C' }} />
    },
    { 
      name: 'Be right back', 
      color: '#F8C73E',
      icon: <ClockRegular style={{ color: '#F8C73E' }} />
    },
    { 
      name: 'Appear away', 
      color: '#F8C73E',
      icon: <ClockRegular style={{ color: '#F8C73E' }} />
    },
    { 
      name: 'Appear offline', 
      color: '#8A8886',
      icon: <PresenceOfflineRegular style={{ color: '#8A8886' }} />
    },
  ];

  return (
    <div className="absolute left-0 right-0 bg-white shadow-md z-10 border border-gray-200">
      {statusOptions.map((status) => (
        <div 
          key={status.name} 
          className={`px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
            currentStatus === status.name ? 'bg-gray-50' : ''
          }`}
          onClick={() => onSelectStatus(status.name)}
        >
          <div className="w-5 h-5 mr-3 flex items-center justify-center">
            {status.icon}
          </div>
          <span>{status.name}</span>
        </div>
      ))}
      
      {/* Separator */}
      <div className="h-px bg-gray-200 mx-4 my-2"></div>
      
      {/* Reset status option */}
      <div 
        className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
        onClick={onResetStatus}
      >
        <div className="w-5 h-5 mr-3 flex items-center justify-center">
          <HistoryRegular style={{ color: '#616161' }} />
        </div>
        <span>Reset status</span>
      </div>
    </div>
  );
};

export default StatusDropdown;