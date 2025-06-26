import React, { useState, useEffect } from 'react';
import ConnectingScreen from './ConnectingScreen';
import VideoCallScreen from './VideoCallScreen';
import CallQualityRatingScreen from './CallQualityRatingScreen';
import { VideoCallStage } from './videoCallTypes';
import type { VideoCallStageType } from './videoCallTypes';

interface VideoCallModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  username: string;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ 
  isOpen, 
  onDismiss,
  username 
}) => {
  const [stage, setStage] = useState<VideoCallStageType>(VideoCallStage.CONNECTING);
  
  // When opened, start with connecting screen, then move to active call
  useEffect(() => {
    if (isOpen) {
      // Reset stage if opening a new call
      setStage(VideoCallStage.CONNECTING);
      
      const timer = setTimeout(() => {
        setStage(VideoCallStage.ACTIVE_CALL);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleLeaveCall = () => {
    setStage(VideoCallStage.CALL_RATING);
  };
  
  const handleDismissRating = () => {
    onDismiss();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="absolute inset-0 z-50">
      {stage === VideoCallStage.CONNECTING && (
        <ConnectingScreen username={username} />
      )}
      
      {stage === VideoCallStage.ACTIVE_CALL && (
        <VideoCallScreen onLeave={handleLeaveCall} />
      )}
      
      {stage === VideoCallStage.CALL_RATING && (
        <CallQualityRatingScreen onDismiss={handleDismissRating} />
      )}
    </div>
  );
};

export default VideoCallModal;