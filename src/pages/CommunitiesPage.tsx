import { useState, useEffect } from 'react';

const CommunitiesPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f2f9] overflow-y-auto">
      <div className="p-4 sm:p-6 md:p-8 flex-grow max-w-[1200px] mx-auto w-full">
        <div
          className={`flex flex-col ${
            !isMobile ? "md:flex-row" : ""
          } h-full items-center`}
        >
          {/* Left Content Column */}
          <div
            className={`${
              isMobile ? "w-full" : "md:w-1/3"
            } pr-0 md:pr-8 mb-10 md:mb-0`}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Build your community
            </h1>

            <p className="text-gray-700 mb-8 text-base md:text-lg max-w-md">
              Bring your community together in one place to plan events, stay
              organized, and get more done.
            </p>

            <button className="bg-[#6264A7] hover:bg-[#585AC0] text-white py-3 px-6 rounded-md font-medium mb-12 transition-colors">
              Create your own
            </button>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              Create with a template
            </h2>

            <div className="flex flex-wrap gap-3">
              <TemplateButton icon="🎓" label="School" />
              <TemplateButton icon="🏢" label="Business" />
              <TemplateButton icon="🏅" label="Life" />
            </div>
          </div>

          {/* Right Video Column - Different styling for mobile vs desktop */}
          <div
            className={`${
              isMobile ? "w-full h-[400px]" : "md:w-2/3 h-[600px]"
            } relative flex items-center justify-center`}
          >
            <div
              className={`${
                isMobile ? "w-full h-[350px] overflow-hidden`" : "w-full h-full"
              } max-w-[600px] relative z-10`}
            >
              {/* Overlay elements to match the original design style */}
              <div className="absolute top-4 right-4 z-20 bg-white bg-opacity-20 rounded-lg px-4 py-2 shadow-lg">
                <span className="text-white">Posts</span>
                <span className="ml-4 text-white border-b-2 border-white">
                  Polls
                </span>
                <span className="ml-4 text-white">Results</span>
              </div>

              {/* Top pink card on desktop view */}
              {!isMobile && (
                <div className="absolute top-8 left-8 z-20 bg-[#FFC0CB] rounded-xl p-4 shadow-lg max-w-[350px]">
                  <div className="text-[#9C0059] text-lg font-medium">
                    Customer engagement, networking
                  </div>
                  <p className="text-2xl text-[#9C0059] font-medium mt-2">
                    It takes a village, bring yours together
                  </p>
                </div>
              )}

              {/* Bottom notification card */}
              <div
                className={`absolute ${
                  isMobile
                    ? "bottom-12 left-1/2 transform -translate-x-1/2"
                    : "right-8 top-1/3"
                } z-20 bg-[#FFC0CB] rounded-xl shadow-lg ${
                  isMobile ? "w-[250px]" : "max-w-[350px]"
                }`}
              >
                <div className="p-4">
                  <p className="text-lg text-[#9C0059] font-medium">
                    It takes a village, bring yours together
                  </p>
                </div>
                <div className="bg-[#FF9AAA] px-4 py-2 rounded-b-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-[#9C0059] mr-2">🏠</span>
                      <span className="text-sm font-medium text-[#9C0059]">
                        PTA meeting
                      </span>
                    </div>
                    <div className="text-xs text-[#9C0059]">
                      Tuesday 6:00 PM
                    </div>
                  </div>
                  <button className="bg-white text-[#9C0059] text-xs font-medium rounded-full px-4 py-1">
                    Join
                  </button>
                </div>
              </div>

              {/* Bottom volunteer section */}
              {!isMobile && (
                <div className="absolute bottom-8 right-8 z-20 bg-black bg-opacity-20 rounded-lg p-4 shadow-lg">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center mr-3 ">
                      <img
                        src="https://statics.teams.cdn.live.net/hashedpngassets/people/volunteer-aatrd9763e4e4cbe.png"
                        alt="Volunteer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-white">
                      <p className="font-medium">Volunteer times</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="flex items-center">
                          <span className="w-3 h-3 rounded-full border border-white mr-2"></span>{" "}
                          Days
                        </p>
                        <p className="flex items-center">
                          <span className="w-3 h-3 rounded-full border border-white mr-2"></span>{" "}
                          Evenings
                        </p>
                        <p className="flex items-center">
                          <span className="w-3 h-3 rounded-full border border-white mr-2"></span>{" "}
                          Weekends
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Element with proper container sizing to prevent cutting */}
              <div
                className={`relative w-full h-full ${
                  !videoLoaded ? "bg-[#2D0E58]" : ""
                } transition-opacity duration-500`}
              >
                <video
                  className="w-full h-full object-contain sm:object-cover overflow-visible"
                  autoPlay
                  loop
                  muted
                  preload="auto"
                  poster="https://statics.teams.cdn.live.net/evergreen-assets/communities/communities-emptystate-animation.png"
                  onLoadedData={handleVideoLoaded}
                  data-testid="communities-empty-state-video"
                >
                  <source
                    src="https://statics.teams.cdn.live.net/evergreen-assets/communities/communities-empty-state-animation-new.webm"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Loading state or fallback */}
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#6264A7] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile-specific illustration below the video */}
            {/* {isMobile && (
              <div className="mt-4 w-full">
                <div className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://statics.teams.cdn.live.net/hashedpngassets/communities/map-activity-2a27af7b75d8cbea.png"
                    alt="Community map activities"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  {!isMobile && (<div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-semibold">
                      Grab your cheer section, it's gameday
                    </p>
                    <div className="flex mt-2">
                      <span className="bg-[#FFC0CB] rounded-full p-1.5 mr-2">
                        🏅
                      </span>
                    </div>
                  </div>)}
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TemplateButtonProps {
  icon: string;
  label: string;
}

const TemplateButton: React.FC<TemplateButtonProps> = ({ icon, label }) => (
  <button className="flex items-center bg-white border border-gray-200 rounded-full py-2 px-3 hover:bg-gray-50 shadow-sm">
    <span className="text-lg mr-2" role="img" aria-label={label}>{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export default CommunitiesPage;