import { useState, useEffect } from 'react';
import { 
  IconButton,
} from '@fluentui/react';
import { 
  FilterRegular,
  SettingsRegular,
  ServiceBell20Filled,
} from '@fluentui/react-icons';
import NoActivity from '../components/activity/NoActivity';

const ActivityPage = () => {
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(false);
      if (!mobile) {
        setShowSidebar(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Header icon styles to match Teams UI
  const iconButtonStyles = {
    root: {
      width: '32px',
      height: '32px',
      color: '#616161',
      backgroundColor: 'transparent',
      border: '1px solid #e1e1e1',
      borderRadius: '4px',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 4px',
      selectors: {
        ':hover': {
          backgroundColor: '#f5f5f5'
        }
      }
    },
    icon: {
      fontSize: '20px',
      transition: 'color 0.2s ease'
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 h-[calc(100vh-60px)]">
        {/* Activity sidebar - conditionally shown on mobile */}
        {(!isMobile || (isMobile && showSidebar)) && (
          <div className={`${isMobile ? 'w-full' : 'w-[320px]'} border-r border-[#e1e1e1] flex flex-col bg-white ${isMobile ? 'absolute inset-0 z-10' : 'relative'}`}>
            <div className="p-4 flex items-center justify-between border-b border-[#e1e1e1]">
              <h2 className="text-xl font-semibold">Activity</h2>
              <div className="flex space-x-1">
                <IconButton 
                  ariaLabel="Filter" 
                  styles={iconButtonStyles}
                  onMouseOver={() => setActiveIconIndex(0)}
                  onMouseOut={() => setActiveIconIndex(null)}
                >
                  <FilterRegular 
                    style={{ 
                      fontSize: '20px',
                      color: activeIconIndex === 0 ? '#5b5fc7' : '#616161' 
                    }} 
                  />
                </IconButton>
                <IconButton 
                  ariaLabel="Settings" 
                  styles={iconButtonStyles}
                  onMouseOver={() => setActiveIconIndex(1)}
                  onMouseOut={() => setActiveIconIndex(null)}
                >
                  <SettingsRegular
                    style={{ 
                      fontSize: '20px',
                      color: activeIconIndex === 1 ? '#5b5fc7' : '#616161' 
                    }} 
                  />
                </IconButton>
              </div>
            </div>
            
            {/* Activity tabs */}
            <div className="flex px-4 pt-2 border-b border-[#e1e1e1]">
              <button 
                className={`pb-2 px-2 mr-4 text-sm font-medium ${selectedTab === 'all' ? 'text-[#5b5fc7] border-b-2 border-[#5b5fc7]' : 'text-gray-600'}`}
                onClick={() => setSelectedTab('all')}
              >
                All
              </button>
              <button 
                className={`pb-2 px-2 mr-4 text-sm font-medium ${selectedTab === 'mentions' ? 'text-[#5b5fc7] border-b-2 border-[#5b5fc7]' : 'text-gray-600'}`}
                onClick={() => setSelectedTab('mentions')}
              >
                @Mentions
              </button>
            </div>
            
            {/* Activity feed empty state */}
            <div className="p-4 flex-grow flex flex-col items-center justify-center text-center px-8">
              <div className="mb-4">
                <ServiceBell20Filled style={{ fontSize: '24px', color: '#5b5fc7' }} />
              </div>
              <p className="text-gray-600 mb-1">
                You will see @mentions, reactions and other notifications here.
              </p>
            </div>

            {/* Mobile only: Back button */}
            {isMobile && (
              <div className="p-4 border-t border-[#e1e1e1]">
                <button 
                  className="w-full py-2 px-4 bg-[#f3f2f1] hover:bg-[#edebe9] text-gray-800 rounded-md"
                  onClick={() => setShowSidebar(false)}
                >
                  Back
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Main content area - Empty state - Hidden when sidebar is shown on mobile */}
        {!isMobile || (isMobile && !showSidebar) ? (
          <NoActivity />
        ) : null}
      </div>
    </div>
  );
};

export default ActivityPage;