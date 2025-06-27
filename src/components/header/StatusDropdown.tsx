import React from 'react';
import {
  CheckmarkCircleFilled,
  CircleFilled,
  DismissCircleFilled,
  ClockRegular,
  PresenceOfflineRegular,
  HistoryRegular,
} from '@fluentui/react-icons';
import { STATUS_OPTIONS } from '../../utils/constant';

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
  // Generate icon components from the status options
  const getStatusIcon = (iconName: string, color: string) => {
    switch(iconName) {
      case 'checkmarkCircle':
        return <CheckmarkCircleFilled style={{ color }} />;
      case 'circle':
        return <CircleFilled style={{ color }} />;
      case 'dismissCircle':
        return <DismissCircleFilled style={{ color }} />;
      case 'clock':
        return <ClockRegular style={{ color }} />;
      case 'presenceOffline':
        return <PresenceOfflineRegular style={{ color }} />;
      default:
        return <CheckmarkCircleFilled style={{ color }} />;
    }
  };

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md z-10 border border-gray-200 rounded-md w-60">
      {STATUS_OPTIONS.map((status) => (
        <div 
          key={status.name} 
          className={`px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer ${
            currentStatus === status.name ? 'bg-gray-50' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent bubbling
            onSelectStatus(status.name);
          }}
        >
          <div className="w-6 h-6 mr-3 flex items-center justify-center">
            {getStatusIcon(status.iconName, status.color)}
          </div>
          <span className="text-sm">{status.name}</span>
        </div>
      ))}
      
      {/* Separator */}
      <div className="h-px bg-gray-200 my-1"></div>
      
      {/* Reset status option */}
      <div 
        className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // Prevent bubbling
          onResetStatus();
        }}
      >
        <div className="w-6 h-6 mr-3 flex items-center justify-center">
          <HistoryRegular style={{ color: '#616161' }} />
        </div>
        <span className="text-sm">Reset status</span>
      </div>
    </div>
  );
};

export default StatusDropdown;