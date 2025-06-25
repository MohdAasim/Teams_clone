import { useState } from 'react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { 
  PersonCircle24Regular, 
  MoreHorizontal24Regular,
  CheckmarkCircle12Filled,
  Search16Regular
} from '@fluentui/react-icons';

const Header = () => {
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);

  // Header icon styles
  const iconStyle = (index: number) => ({
    color: activeIconIndex === index ? '#5b5fc7' : '#616161',
    transition: 'color 0.15s ease',
  });

  return (
    <header className="h-[48px] border-b border-[#e1e1e1] flex items-center px-4 bg-white">
      {/* Center the search bar */}
      <div className="flex-grow flex justify-center">
        <div className="w-[400px] relative">
          <SearchBox 
            placeholder="Search" 
            styles={{ 
              root: { 
                width: '100%',
                borderRadius: '8px',
                height: '32px',
                border: '1px solid #E1E1E1',
              },
              field: {
                fontSize: '14px',
                paddingLeft: '32px', // Space for the search icon
              },
              icon: {
                display: 'none', // Hide default icon since we're adding our own
              }
            }} 
          />
          {/* Custom search icon */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Search16Regular style={{ color: '#616161' }} />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <button 
          className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors"
          onMouseOver={() => setActiveIconIndex(0)}
          onMouseOut={() => setActiveIconIndex(null)}
        >
          <MoreHorizontal24Regular style={iconStyle(0)} />
        </button>
        <div className="relative">
          <button 
            className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors"
            onMouseOver={() => setActiveIconIndex(1)}
            onMouseOut={() => setActiveIconIndex(null)}
          >
            <PersonCircle24Regular style={iconStyle(1)} />
          </button>
          {/* Overlapping green check indicator */}
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-[1px]">
            <CheckmarkCircle12Filled style={{ color: '#6BB700' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;