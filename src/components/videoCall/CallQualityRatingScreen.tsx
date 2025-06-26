import React, { useState } from 'react';
import { DefaultButton } from '@fluentui/react';

interface CallQualityRatingScreenProps {
  onDismiss: () => void;
}

const CallQualityRatingScreen: React.FC<CallQualityRatingScreenProps> = ({ onDismiss }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white px-4">
      <h1 className="text-2xl font-semibold mb-8">How was the call quality?</h1>
      
      <div className="flex items-center justify-center space-x-4 mb-12">
        {[1, 2, 3, 4, 5].map(rating => (
          <button 
            key={rating} 
            className={`text-3xl ${selectedRating === rating ? 'text-[#6264A7]' : 'text-[#6264A7] text-opacity-50'}`}
            onClick={() => setSelectedRating(rating)}
            aria-label={`Rate ${rating} stars`}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill={selectedRating === rating ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="#" className="text-[#6264A7] underline">Privacy statement</a>
        <DefaultButton
          text="Dismiss"
          onClick={onDismiss}
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default CallQualityRatingScreen;