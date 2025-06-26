import React, { useState, useEffect } from 'react';
import { 
  MicRegular, 
  MicOffRegular, 
  VideoRegular, 
  VideoOffRegular, 
  ChatRegular,
  PeopleRegular,
  HandWaveRegular,
  EmojiRegular,
  ScreenSearchRegular,
  MoreHorizontalRegular
} from '@fluentui/react-icons';

interface VideoCallScreenProps {
  onLeave: () => void;
}

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ onLeave }) => {
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRaiseHand, setIsRaiseHand] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1F2022] relative">
      {/* Top controls similar to reference image */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1F2022] z-10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full flex items-center justify-center border border-white bg-[#292929] text-white">
            <span className="text-xs">{formatTime(time)}</span>
          </div>
        </div>

        {/* Top right controls */}
        <div className="flex items-center">
          <ChatRegular className="text-white mx-2 cursor-pointer" />
          <PeopleRegular className="text-white mx-2 cursor-pointer" />
          <HandWaveRegular 
            className={`text-white mx-2 cursor-pointer ${isRaiseHand ? 'text-[#6264A7]' : ''}`} 
            onClick={() => setIsRaiseHand(!isRaiseHand)} 
          />
          <EmojiRegular className="text-white mx-2 cursor-pointer" />
          <span className="text-white mx-2 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h12v2H2v-2z" />
            </svg>
          </span>
          <MoreHorizontalRegular className="text-white mx-2 cursor-pointer" />
        </div>
      </div>

      {/* Main video area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center bg-[#1F2022]">
          <div className="rounded-full h-28 w-28 bg-[#404040] flex items-center justify-center text-white text-5xl font-semibold">
            MA
          </div>
        </div>
      </div>

      {/* Bottom controls similar to reference image */}
      <div className="flex items-center justify-between p-3 bg-[#292929]">
        <div></div> {/* Empty div for spacing */}
        <div className="flex items-center space-x-3">
          <button 
            className={`rounded-full w-10 h-10 flex items-center justify-center ${isVideoOff ? "bg-red-600" : "bg-[#3a3a3a]"} text-white`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOffRegular /> : <VideoRegular />}
          </button>
          <button 
            className={`rounded-full w-10 h-10 flex items-center justify-center ${isMuted ? "bg-red-600" : "bg-[#3a3a3a]"} text-white`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOffRegular /> : <MicRegular />}
          </button>
          <button 
            className="bg-red-600 text-white rounded-md px-6 py-1.5 hover:bg-red-700"
            onClick={onLeave}
          >
            Leave
          </button>
        </div>
        <div>
          <button className="bg-[#3a3a3a] text-white rounded-md p-2 hover:bg-[#4a4a4a]">
            <ScreenSearchRegular />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;