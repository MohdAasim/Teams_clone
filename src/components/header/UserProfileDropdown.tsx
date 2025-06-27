import React, { useState, useRef } from 'react';
import {
  ArrowRight20Regular,
  EditRegular,
  CheckmarkCircleFilled
} from '@fluentui/react-icons';
import StatusDropdown from './StatusDropdown';
import StatusMessageDialog from './StatusMessageDialog';
import { getUserStatus, getUserStatusColor, setUserStatus } from '../../utils/chatLocalStorage';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  userName,
  userEmail 
}) => {
  // Initialize from localStorage
  const [currentStatus, setCurrentStatus] = useState<string>(getUserStatus());
  const [statusColor, setStatusColor] = useState<string>(getUserStatusColor());
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
 
  // Handle status change
  const handleStatusChange = (status: string) => {
    let newColor = '#6BB700';
    
    // Update status color
    switch (status) {
      case 'Available':
        newColor = '#6BB700';
        break;
      case 'Busy':
      case 'Do not disturb':
        newColor = '#D92C2C';
        break;
      case 'Be right back':
      case 'Appear away':
        newColor = '#F8C73E';
        break;
      case 'Appear offline':
        newColor = '#8A8886';
        break;
      default:
        newColor = '#6BB700';
    }
    
    // Update state
    setCurrentStatus(status);
    setStatusColor(newColor);
    
    // Save to localStorage
    setUserStatus(status, newColor);
    
    // Close the dropdown
    setShowStatusDropdown(false);
  };

  // Reset status to Available
  const resetStatus = () => {
    const defaultStatus = 'Available';
    const defaultColor = '#6BB700';
    
    setCurrentStatus(defaultStatus);
    setStatusColor(defaultColor);
    setUserStatus(defaultStatus, defaultColor);
    setShowStatusDropdown(false);
  };

  // Open status message dialog
  const openStatusMessageDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling
    setShowStatusMessageDialog(true);
  };

  // Set status message
  const setNewStatusMessage = (message: string) => {
    setStatusMessage(message);
    setShowStatusMessageDialog(false);
  };

  const setStatusDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling
    console.log('Toggling status dropdown');
    setShowStatusDropdown(!showStatusDropdown);
  };

  const teamsFont = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif'
  };

  if (!isOpen) return null;

  return (
      <div
        ref={dropdownRef}
        className="user-profile-dropdown absolute right-4 bg-white rounded-md shadow-lg border border-gray-200 w-80 py-2 overflow-visible z-50"
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
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            onClick={(e) => setStatusDropdown(e)}
            data-status-trigger="true"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                {/* Use the same icon as in the status dropdown */}
                <CheckmarkCircleFilled style={{ color: statusColor }} />
              </div>
              <span className="text-sm">{currentStatus}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            onClick={(e) => openStatusMessageDialog(e)}
            data-status-trigger="true"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <EditRegular className="text-gray-600" style={{ fontSize: 16 }} />
              </div>
              <span className="text-sm">Set status message</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
  );
};

export default UserProfileDropdown;