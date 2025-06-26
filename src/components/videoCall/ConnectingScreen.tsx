import React from 'react';

interface ConnectingScreenProps {
  username: string;
}

const ConnectingScreen: React.FC<ConnectingScreenProps> = ({ username }) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#F5F5F5] dark:bg-[#1F1F1F]">
      <div className="mb-6">
        <div className="h-32 w-32 rounded-full bg-[#404040] flex items-center justify-center text-6xl text-white">
          {getInitials(username)}
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-1 text-white">Connecting...</h1>
    </div>
  );
};

export default ConnectingScreen;