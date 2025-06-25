import { useState } from 'react';
import { 
  DefaultButton, 
  IconButton
} from '@fluentui/react';
import { 
  Dismiss16Regular,
  InfoFilled,
  ComposeFilled,
  VideoRegular,
  VideoFilled,
  FilterRegular,
  PersonAddRegular
} from '@fluentui/react-icons';
import WelcomeCard from '../components/chat/WelcomeCard';
import { 
  shouldShowNotification, 
  enableNotifications, 
  disableNotifications 
} from '../utils/chatLocalStorage';

const ChatPage = () => {
  const [showNotification, setShowNotification] = useState(shouldShowNotification);
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);

  const handleTurnOn = () => {
    enableNotifications();
    setShowNotification(false);
  };

  const handleDismiss = () => {
    disableNotifications();
    setShowNotification(false);
  };

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
      {showNotification && (
        <div className="bg-[#f0f6ff] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center rounded-full w-5 h-5 mr-2 text-2xl">
              <InfoFilled />
            </div>
            <span>Stay in the know. Turn on desktop notifications.</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DefaultButton 
              text="Turn on"
              onClick={handleTurnOn}
              styles={{
                root: {
                  backgroundColor: 'white',
                  borderColor: '#d1d1d1',
                  minWidth: '80px',
                  height: '28px',
                  borderRadius: '4px',
                },
                label: {
                  fontWeight: 'normal'
                }
              }}
            />
            <IconButton
              onClick={handleDismiss}
              ariaLabel="Close"
              styles={{
                root: {
                  color: '#616161',
                }
              }}
            >
              <Dismiss16Regular />
            </IconButton>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 h-[calc(100vh-60px)]">
        {/* Chat sidebar */}
        <div className="w-[320px] border-r border-[#e1e1e1] flex flex-col bg-white">
          <div className="p-4 flex items-center justify-between border-b border-[#e1e1e1]">
            <h2 className="text-xl font-semibold">Chat</h2>
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
                ariaLabel="Video call" 
                styles={iconButtonStyles}
                onMouseOver={() => setActiveIconIndex(1)}
                onMouseOut={() => setActiveIconIndex(null)}
              >
                {activeIconIndex === 1 ? (
                  <VideoFilled 
                    style={{ 
                      fontSize: '20px',
                      color: '#5b5fc7' 
                    }} 
                  />
                ) : (
                  <VideoRegular 
                    style={{ 
                      fontSize: '20px',
                      color: '#616161' 
                    }} 
                  />
                )}
              </IconButton>
              <IconButton 
                ariaLabel="New message" 
                styles={iconButtonStyles}
                onMouseOver={() => setActiveIconIndex(2)}
                onMouseOut={() => setActiveIconIndex(null)}
              >
                <ComposeFilled 
                  style={{ 
                    fontSize: '20px',
                    color: activeIconIndex === 2 ? '#5b5fc7' : '#616161' 
                  }} 
                />
              </IconButton>
            </div>
          </div>
          
          <div className="p-4 text-sm text-gray-600 flex-grow">
            Start a new private conversation here.
          </div>
          
          {/* Invite to Teams banner */}
          <button className="bg-[#5b5fc7] text-white py-2 px-4 w-full flex items-center justify-center gap-2 hover:bg-[#4b4fa7] transition-colors rounded-xl mb-2">
            <PersonAddRegular />
            <span>Invite to Teams</span>
          </button>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 bg-white">
          <WelcomeCard userName="Mohd Aasim" />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;