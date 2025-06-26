// This file contains shared types and constants for video call functionality

// Replace enum with constant object
export const VideoCallStage = {
  CONNECTING: 'connecting',
  ACTIVE_CALL: 'activeCall',
  CALL_RATING: 'callRating'
} as const;

// Add a type for using these values in type annotations
export type VideoCallStageType = typeof VideoCallStage[keyof typeof VideoCallStage];