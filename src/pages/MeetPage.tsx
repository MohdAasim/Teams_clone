import { useState, useEffect } from 'react';
import { 
  Link20Regular, 
  Calendar16Regular, 
  Calendar16Filled
} from '@fluentui/react-icons';
import { Label } from '@fluentui/react';

const MeetPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-8 flex-grow max-w-[1200px] mx-auto w-full">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Meet</h1>

        {/* Meeting Options - improved responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 bg-[#6264A7] text-white py-3 px-4 rounded-md hover:bg-[#585AC0] transition-colors">
            <Link20Regular />
            <span className="font-medium">Create a meeting link</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-white border border-[#E1E1E1] py-3 px-4 rounded-md hover:bg-gray-50 transition-colors">
            <Calendar16Regular className="text-[#E46FBC]" />
            <span className="font-medium text-gray-800">
              Schedule a meeting
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-white border border-[#E1E1E1] py-3 px-4 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto">
            {/* <HashtagRegular className="text-[#2D87F3]" /> */}
            <Label
              styles={{
                root: {
                  background: "#",
                  borderRadius: 8,
                  border: "1px solid #E1E1E1",
                  padding: "4px 8px",
                  margin: "2px",
                  display: "inline-block",
                },
              }}
            >
              #
            </Label>

            <span className="font-medium text-gray-800">
              Join with a meeting ID
            </span>
          </button>
        </div>

        {/* Meeting Links Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Meeting links
          </h2>

          <div className="bg-white border border-[#E1E1E1] rounded-lg p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 5C11.729 5 5 11.729 5 20C5 28.271 11.729 35 20 35C28.271 35 35 28.271 35 20C35 11.729 28.271 5 20 5Z"
                    fill="#DBB3F9"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M18 16C15.8 16 14 17.8 14 20C14 22.2 15.8 24 18 24H22C24.2 24 26 22.2 26 20C26 17.8 24.2 16 22 16"
                    stroke="#A992FA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 16C19.8 16 18 17.8 18 20C18 22.2 19.8 24 22 24H26C28.2 24 30 22.2 30 20C30 17.8 28.2 16 26 16"
                    stroke="#F7B93E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex-grow">
                <p className="text-gray-900 font-semibold mb-2">
                  Quickly create, save, and share links with anyone.
                </p>
                <button className="text-[#6264A7] hover:underline font-medium">
                  Learn more about meeting links
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Meetings Section */}
        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Scheduled meetings
            </h2>
            <button className="flex items-center text-[#6264A7] hover:underline">
              <Calendar16Filled className="mr-1" />
              <span>View in calendar</span>
            </button>
          </div>

          <div className="border border-[#E1E1E1] rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 flex-1">
              <p className="text-gray-700">
                You don't have anything scheduled.
              </p>
            </div>

            {!isMobile && 
            (<div
              className={`md:w-1/2 bg-[#EAE1F9] relative overflow-hidden ${
                isTablet ? "hidden" : ""
              }`}
            >
              <img
                src="https://statics.teams.cdn.live.net/evergreen-assets/communities/banners/v2/assets/DefaultBanner2.png"
                alt="No scheduled meetings"
                className="w-full h-[190px] object-cover"
              />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetPage;