import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight20Regular,
  EditRegular,
} from '@fluentui/react-icons';
import StatusDropdown from './StatusDropdown';
import StatusMessageDialog from './StatusMessageDialog';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  userName = "Mohd Aasim", 
  userEmail = "mfsi.aasim.m@gmail.com" 
}) => {
  const [currentStatus, setCurrentStatus] = useState<string>("Available");
  const [statusColor, setStatusColor] = useState<string>("#6BB700");
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);
  const [showStatusMessageDialog, setShowStatusMessageDialog] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user's initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Handle clicking outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle status change
  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    
    // Update status color
    switch (status) {
      case 'Available':
        setStatusColor('#6BB700');
        break;
      case 'Busy':
      case 'Do not disturb':
        setStatusColor('#D92C2C');
        break;
      case 'Be right back':
      case 'Appear away':
        setStatusColor('#F8C73E');
        break;
      case 'Appear offline':
        setStatusColor('#8A8886');
        break;
      default:
        setStatusColor('#6BB700');
    }
    
    setShowStatusDropdown(false);
  };

  // Reset status to Available
  const resetStatus = () => {
    setCurrentStatus('Available');
    setStatusColor('#6BB700');
    setShowStatusDropdown(false);
  };

  // Open status message dialog
  const openStatusMessageDialog = () => {
    setShowStatusMessageDialog(true);
  };

  // Set status message
  const setNewStatusMessage = (message: string) => {
    setStatusMessage(message);
    setShowStatusMessageDialog(false);
  };

  const teamsFont = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div 
        ref={dropdownRef}
        className="absolute right-4 top-12 bg-white rounded-md shadow-lg border border-gray-200 w-72 py-2 overflow-visible"
        style={teamsFont}
      >
        {/* Header with Personal and Sign out */}
        <div className="flex justify-between items-center px-4 py-2">
          <span className="font-semibold text-sm">Personal</span>
          <button 
            className="text-sm text-gray-600 hover:underline"
            onClick={onClose}
          >
            Sign out
          </button>
        </div>
        
        {/* User profile section */}
        <div className="px-4 py-2 flex items-start">
          {/* Avatar with initials */}
          <div className="w-12 h-12 rounded-full bg-[#E9A52F] flex items-center justify-center text-white font-medium text-lg mr-3 relative">
            {getInitials(userName)}
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColor }}></div>
            </div>
          </div>
          
          {/* User info */}
          <div className="flex-1">
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-gray-600">{userEmail}</div>
            <div className="text-sm text-gray-600 flex items-center">
              My Microsoft account
              <ArrowRight20Regular className="ml-1" fontSize={12} />
            </div>
          </div>
        </div>
        
        {/* Status section */}
        <div className="mt-2">
          {/* Current status - clickable to show status dropdown */}
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <div className="flex items-center">
              <div className="w-5 h-5 mr-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColor }}></div>
              </div>
              <span>{currentStatus}</span>
            </div>
            <ArrowRight20Regular fontSize={16} className="text-gray-500" />
          </div>
          
          {/* Status dropdown when expanded */}
          {showStatusDropdown && (
            <StatusDropdown 
              onSelectStatus={handleStatusChange} 
              currentStatus={currentStatus}
              onResetStatus={resetStatus}
            />
          )}
          
          {/* Set status message option */}
          <div 
            className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            onClick={openStatusMessageDialog}
          >
            <div className="flex items-center">
              <EditRegular className="w-5 h-5 mr-2 text-gray-600" />
              <span>Set status message</span>
            </div>
            <ArrowRight20Regular fontSize={16} className="text-gray-500" />
          </div>
        </div>

        {/* Status Message Dialog */}
        {showStatusMessageDialog && (
          <StatusMessageDialog
            isOpen={showStatusMessageDialog}
            onDismiss={() => setShowStatusMessageDialog(false)}
            onSetStatusMessage={setNewStatusMessage}
            userEmail={userEmail}
            initialMessage={statusMessage}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfileDropdown;