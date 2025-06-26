import React, { useState, useEffect } from 'react';
import {
  SettingsRegular,
  SettingsFilled,
  ChatHelpRegular,
  ChatHelpFilled,
  ArrowRightRegular,
  PhoneRegular,
  PhoneFilled,
  PersonHeartRegular,
  PersonHeartFilled,
  KeyboardRegular,
  KeyboardFilled,
  PersonFeedbackRegular,
  PersonFeedbackFilled,
  DiamondRegular,
  DiamondFilled,
  ShieldErrorRegular,
  HeartPulseRegular,
  LightbulbRegular
} from '@fluentui/react-icons';

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ isOpen, onClose }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showHelpSubmenu, setShowHelpSubmenu] = useState(false);
  const [showFeedbackSubmenu, setShowFeedbackSubmenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update mobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isOpen) return null;

  // Close dropdown when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to get item styles
  const getItemStyles = (index: number) => {
    return {
      backgroundColor: hoveredItem === index ? '#f5f5f5' : 'transparent',
    };
  };

  // Teams font family style
  const teamsFont = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif'
  };

  return (
    <div 
      className="fixed inset-0 z-50" 
      onClick={handleBackdropClick}
    >
      <div 
        className="absolute right-4 top-12 bg-white rounded-md shadow-lg border border-gray-200 py-1 overflow-visible"
        style={teamsFont}
      >
        {/* Upgrade */}
        <div 
          className="flex items-center px-2 py-[6px] cursor-pointer hover:bg-gray-100"
          style={getItemStyles(0)}
          onMouseEnter={() => {
            setHoveredItem(0);
            setShowHelpSubmenu(false);
            setShowFeedbackSubmenu(false);
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 0 ? 
            <DiamondFilled className="text-primary mr-3" fontSize={20} /> : 
            <DiamondRegular className="text-gray-600 mr-3" fontSize={20} />
          }
          <span className="text-[15px]">Upgrade</span>
        </div>
        
        {/* First separator */}
        <div className="h-[1px] bg-gray-200 my-1 mx-4"></div>
        
        {/* Settings */}
        <div 
          className="flex items-center px-2 py-[6px] cursor-pointer hover:bg-gray-100"
          style={getItemStyles(1)}
          onMouseEnter={() => {
            setHoveredItem(1);
            setShowHelpSubmenu(false);
            setShowFeedbackSubmenu(false);
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 1 ? 
            <SettingsFilled className="text-primary mr-3" fontSize={20} /> : 
            <SettingsRegular className="text-gray-600 mr-3" fontSize={20} />
          }
          <span className="text-[15px]">Settings</span>
        </div>
        
        {/* Second separator */}
        <div className="h-[1px] bg-gray-200 my-1 mx-4"></div>
        
        {/* Help - with submenu */}
        <div 
          className="flex items-center justify-between px-2 py-[6px] cursor-pointer hover:bg-gray-100 relative"
          style={getItemStyles(2)}
          onMouseEnter={() => {
            setHoveredItem(2);
            setShowHelpSubmenu(true);
            setShowFeedbackSubmenu(false);
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setHoveredItem(null);
              // Slight delay before closing to allow cursor movement to submenu
              setTimeout(() => {
                const helpSubmenu = document.getElementById('help-submenu');
                if (helpSubmenu && !helpSubmenu.matches(':hover')) {
                  setShowHelpSubmenu(false);
                }
              }, 100);
            }
          }}
          onClick={() => {
            if (isMobile) {
              setShowHelpSubmenu(!showHelpSubmenu);
              setShowFeedbackSubmenu(false);
            }
          }}
        >
          <div className="flex items-center">
            {hoveredItem === 2 ? 
              <ChatHelpFilled className="text-primary mr-3" fontSize={20} /> : 
              <ChatHelpRegular className="text-gray-600 mr-3" fontSize={20} />
            }
            <span className="text-[15px]">Help</span>
          </div>
          <ArrowRightRegular className="text-gray-500" fontSize={16} />
          
          {/* Help Submenu */}
          {showHelpSubmenu && (
            <div 
              id="help-submenu"
              className={`absolute bg-white rounded-md shadow-lg border border-gray-200 py-1 w-64 z-10 ${
                isMobile ? "left-0 top-full mt-1" : "-left-64 top-0"
              }`}
              style={teamsFont}
              onMouseEnter={() => setHoveredItem(2)}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredItem(null);
                  setShowHelpSubmenu(false);
                }
              }}
            >
              <div className="px-3 py-[6px] hover:bg-gray-100 cursor-pointer">
                <span className="text-[15px]">Get help</span>
              </div>
              <div className="px-3 py-[6px] hover:bg-gray-100 cursor-pointer">
                <span className="text-[15px]">Video training</span>
              </div>
              <div className="px-3 py-[6px] hover:bg-gray-100 cursor-pointer">
                <span className="text-[15px]">What's new</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Feedback - with submenu */}
        <div 
          className="flex items-center justify-between px-2 py-[6px] cursor-pointer hover:bg-gray-100 relative"
          style={getItemStyles(3)}
          onMouseEnter={() => {
            setHoveredItem(3);
            setShowFeedbackSubmenu(true);
            setShowHelpSubmenu(false);
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setHoveredItem(null);
              // Slight delay before closing to allow cursor movement to submenu
              setTimeout(() => {
                const feedbackSubmenu = document.getElementById('feedback-submenu');
                if (feedbackSubmenu && !feedbackSubmenu.matches(':hover')) {
                  setShowFeedbackSubmenu(false);
                }
              }, 100);
            }
          }}
          onClick={() => {
            if (isMobile) {
              setShowFeedbackSubmenu(!showFeedbackSubmenu);
              setShowHelpSubmenu(false);
            }
          }}
        >
          <div className="flex items-center">
            {hoveredItem === 3 ? 
              <PersonFeedbackFilled className="text-primary mr-3" fontSize={20} /> : 
              <PersonFeedbackRegular className="text-gray-600 mr-3" fontSize={20} />
            }
            <span className="text-[15px]">Feedback</span>
          </div>
          <ArrowRightRegular className="text-gray-500" fontSize={16} />
          
          {/* Feedback Submenu */}
          {showFeedbackSubmenu && (
            <div 
              id="feedback-submenu"
              className={`absolute bg-white rounded-md shadow-lg border border-gray-200 py-1 w-64 z-10 ${
                isMobile ? "left-0 top-full mt-1" : "-left-64 top-0"
              }`}
              style={teamsFont}
              onMouseEnter={() => setHoveredItem(3)}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredItem(null);
                  setShowFeedbackSubmenu(false);
                }
              }}
            >
              <div className="flex items-center px-3 py-[6px] hover:bg-gray-100 cursor-pointer">
                <ShieldErrorRegular className="text-gray-600 mr-3" fontSize={18} />
                <span className="text-[15px]">Report a problem</span>
              </div>
              <div className="flex items-center px-3 py-[6px] hover:bg-gray-100 cursor-pointer">
                <HeartPulseRegular className="text-gray-600 mr-3" fontSize={18} />
                <span className="text-[15px]">Give a compliment</span>
              </div>
              <div className="flex items-center px-3 py-[6px] hover:bg-gray-100 cursor-pointer">
                <LightbulbRegular className="text-gray-600 mr-3" fontSize={18} />
                <span className="text-[15px]">Suggest a feature</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Keyboard shortcuts */}
        <div 
          className="flex items-center px-2 py-[6px] cursor-pointer hover:bg-gray-100"
          style={getItemStyles(4)}
          onMouseEnter={() => {
            setHoveredItem(4);
            setShowHelpSubmenu(false);
            setShowFeedbackSubmenu(false);
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 4 ? 
            <KeyboardFilled className="text-primary mr-3" fontSize={20} /> : 
            <KeyboardRegular className="text-gray-600 mr-3" fontSize={20} />
          }
          <span className="text-[15px]">Keyboard shortcuts</span>
        </div>
        
        {/* Third separator */}
        <div className="h-[1px] bg-gray-200 my-1 mx-4"></div>
        
        {/* Get the mobile app */}
        <div 
          className="flex items-center justify-between px-2 py-[6px] cursor-pointer hover:bg-gray-100"
          style={getItemStyles(5)}
          onMouseEnter={() => {
            setHoveredItem(5);
            setShowHelpSubmenu(false);
            setShowFeedbackSubmenu(false);
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center">
            {hoveredItem === 5 ? 
              <PhoneFilled className="text-primary mr-3" fontSize={20} /> : 
              <PhoneRegular className="text-gray-600 mr-3" fontSize={20} />
            }
            <span className="text-[15px]">Get the mobile app</span>
          </div>
          <span className="text-xs font-medium bg-[#6264A7] text-white px-2 py-0.5 rounded">New</span>
        </div>
        
        {/* Teams Insider program */}
        <div 
          className="flex items-center justify-between px-2 py-[6px] cursor-pointer hover:bg-gray-100"
          style={getItemStyles(6)}
          onMouseEnter={() => {
            setHoveredItem(6);
            setShowHelpSubmenu(false);
            setShowFeedbackSubmenu(false);
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center">
            {hoveredItem === 6 ? 
              <PersonHeartFilled className="text-primary mr-3" fontSize={20} /> : 
              <PersonHeartRegular className="text-gray-600 mr-3" fontSize={20} />
            }
            <span className="text-[15px]">Teams Insider program</span>
          </div>
          <span className="text-xs font-medium bg-[#6264A7] text-white px-2 py-0.5 rounded">New</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;