import { DefaultButton } from '@fluentui/react';
import { useState, useEffect } from 'react';

interface WelcomeCardProps {
  userName: string;
  onNewChat?: () => void;
  onMeetNow?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ 
  userName,
  onNewChat,
  onMeetNow
}) => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isSmallScreen: false
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 480,
        isTablet: width >= 480 && width < 768,
        isSmallScreen: width < 397
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { isMobile, isSmallScreen } = screenSize;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className={`${isSmallScreen ? 'text-lg' : 'text-xl sm:text-2xl'} font-semibold mb-2`}>
        Welcome, {userName}
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-8">
        Here are some things to get you going.
      </p>

      <div className={`flex ${isMobile ? 'flex-col space-y-6' : 'flex-row sm:space-x-16 lg:space-x-32'} mb-8`}>
        <div className="flex flex-col items-center">
          <div className={`${isSmallScreen ? 'w-20 h-20' : 'w-24 h-24 sm:w-32 sm:h-32'} mb-4 sm:mb-6`}>
            <img
              src="https://statics.teams.cdn.live.net/evergreen-assets/illustrations/webp/256/chat-l-standard-256x256.webp"
              alt="Chat"
              className="w-full h-full"
            />
          </div>
          <p className="max-w-[250px] text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Send instant messages, share files, and more over chat.
          </p>
          <DefaultButton
            text="New chat"
            onClick={onNewChat}
            styles={{
              root: {
                borderRadius: "4px",
                padding: isSmallScreen ? "4px 12px" : "6px 16px",
                minWidth: isSmallScreen ? "80px" : "100px",
                borderColor: "#d1d1d1",
              },
              label: {
                fontSize: isSmallScreen ? "12px" : "14px"
              }
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <div className={`${isSmallScreen ? 'w-20 h-20' : 'w-24 h-24 sm:w-32 sm:h-32'} mb-4 sm:mb-6`}>
            <img
              src="https://statics.teams.cdn.live.net/evergreen-assets/illustrations/webp/256/meet-l-standard-256x256.webp"
              alt="Meet"
              className="w-full h-full"
            />
          </div>
          <p className="max-w-[250px] text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Skip the calendar and create an instant meeting with just a click.
          </p>
          <DefaultButton
            text="Meet now"
            onClick={onMeetNow}
            styles={{
              root: {
                borderRadius: "4px",
                padding: isSmallScreen ? "4px 12px" : "6px 16px",
                minWidth: isSmallScreen ? "80px" : "100px",
                borderColor: "#d1d1d1",
              },
              label: {
                fontSize: isSmallScreen ? "12px" : "14px"
              }
            }}
          />
        </div>
      </div>

      <p className={`text-gray-600 mt-4 sm:mt-8 ${isSmallScreen ? 'text-xs' : 'text-sm sm:text-base'}`}>
        Stay connected across all your devices by downloading the{" "}
        <a href="#" className="text-[#5b5fc7]">Teams mobile app</a>.
      </p>
    </div>
  );
};

export default WelcomeCard;