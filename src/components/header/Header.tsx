import { useState, useEffect, useRef } from 'react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Icon } from '@fluentui/react';
import { 
  PersonCircle24Regular, 
  MoreHorizontal24Regular,
  CheckmarkCircle12Filled,
  Search16Regular,
  Navigation24Regular,ArrowLeft24Regular
} from '@fluentui/react-icons';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Enhanced responsiveness check
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsSmallScreen(width < 397);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iconStyle = (index: number) => ({
    color: activeIconIndex === index ? '#5b5fc7' : '#616161',
    transition: 'color 0.15s ease',
  });

  return (
    <header className="h-[48px] bg-[#ebebeb] flex items-center px-2 sm:px-4">
      {/* Hamburger icon for mobile */}
      {isMobile ? (
        <button 
          className="p-1.5 hover:bg-[#f5f5f5] rounded-md transition-colors mr-2"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar menu"
        >
          <Navigation24Regular style={{ color: '#616161' }} />
        </button>
      ) : (
        /* Teams logo for desktop */
        <div className="mr-4 flex items-center">
          <Icon 
            iconName="TeamsLogo" 
            className="text-[#5b5fc7]" 
            style={{ fontSize: '24px' }} 
          />
        </div>
      )}
      
      {/* Center search bar - responsive */}
      
        {(!isMobile&&!isSmallScreen)?(<div className="flex-grow flex justify-center"><div className="flex-grow flex justify-center">
        <div className={`${isSmallScreen ? 'w-[100px] min-w-[100px]' : isMobile ? 'w-full' : 'w-[400px]'} relative`}>
          <SearchBox 
            placeholder={isSmallScreen ? "Search" : "Search Microsoft Teams"}
            styles={{ 
              root: { 
                width: '100%',
                borderRadius: '8px',
                height: '32px',
                border: '1px solid #E1E1E1',
              },
              field: {
                fontSize: isSmallScreen ? '12px' : '14px',
                paddingLeft: '32px',
                
              },
              icon: {
                display: 'none',
              }
            }} 
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Search16Regular style={{ color: '#616161' }} />
          </div>
        </div></div>
      </div>):
        <div className={`flex-grow`}>
          <div className="relative flex items-center">
              {!showMobileSearch ? (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                  onClick={() => {
                    setShowMobileSearch(true);
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }}
                  aria-label="Show search"
                  type="button"
                >
                  <Search16Regular style={{ color: '#616161' }} />
                </button>
              ):
              <div className="fixed z-20 w-screen h-[48px] bg-[#ebebeb] left-0 pr-2 flex items-center">
                <button className='h-full aspect-square' onClick={() => setShowMobileSearch(false)}><ArrowLeft24Regular /></button>
             <div className='relative flex-grow'> <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                className={`w-full
                  transition-all duration-300 ease-in-out
                  h-8 rounded-lg border border-[#E1E1E1] pl-8 text-xs bg-white`}
              />
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Search16Regular style={{ color: '#616161' }} />
          </div></div>
              </div>}
            </div>
        </div>}
      
      {/* Right side icons with responsive spacing */}
      <div className={`flex items-center ${isSmallScreen ? 'space-x-1' : 'space-x-2 sm:space-x-4'} ml-1 sm:ml-4`}>
        <button 
          className={`${isSmallScreen ? 'p-0.5' : 'p-1 sm:p-2'} hover:bg-[#f5f5f5] rounded-full transition-colors`}
          onMouseOver={() => setActiveIconIndex(0)}
          onMouseOut={() => setActiveIconIndex(null)}
          aria-label="More options"
        >
          <MoreHorizontal24Regular style={iconStyle(0)} />
        </button>
        <button 
          className={`p-0.5 hover:bg-[#f5f5f5] rounded-full transition-colors relative`}
          onMouseOver={() => setActiveIconIndex(1)}
          onMouseOut={() => setActiveIconIndex(null)}
          aria-label="User profile"
        >
          <PersonCircle24Regular style={iconStyle(1)} />
          <CheckmarkCircle12Filled style={{ color: '#6BB700' }} className='border rounded-full bg-[#ebebeb] p-0 border-[#ebebeb] absolute bottom-0 right-0' />
        </button>
        <span className='absolute bottom-0 right-0 h-4 aspect-square bg-white rounded-full'></span>
      </div>
    </header>
  );
};

export default Header;