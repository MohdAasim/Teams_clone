import React, { useState } from 'react';
import { ImageRegular, ShareRegular, ArrowDownloadRegular, ZoomInRegular } from '@fluentui/react-icons';

interface PhotosTabProps {
  chatPartner: {
    name: string;
    email: string;
  };
}

const PhotosTab: React.FC<PhotosTabProps> = ({ chatPartner }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Mock photos data - in real app this would come from props or API
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=300&h=200&fit=crop',
      name: 'team_meeting.jpg',
      size: '2.1 MB',
      date: '2024-01-15',
      sender: 'John Doe'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
      name: 'project_mockup.png',
      size: '3.2 MB',
      date: '2024-01-14',
      sender: chatPartner.name
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
      name: 'office_space.jpg',
      size: '1.8 MB',
      date: '2024-01-13',
      sender: 'John Doe'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=200&fit=crop',
      name: 'presentation.jpg',
      size: '2.5 MB',
      date: '2024-01-12',
      sender: chatPartner.name
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
      name: 'whiteboard_notes.jpg',
      size: '1.9 MB',
      date: '2024-01-11',
      sender: 'John Doe'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=200&fit=crop',
      name: 'team_lunch.jpg',
      size: '2.7 MB',
      date: '2024-01-10',
      sender: chatPartner.name
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex-1 bg-[#f8f9fa] overflow-hidden">
      {/* Photos header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Photos</h3>
          <button className="px-4 py-2 bg-[#6264A7] text-white rounded-md hover:bg-[#5a5db8] transition-colors text-sm">
            Share a photo
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Photos and images shared in this conversation with {chatPartner.name}
        </p>
      </div>

      {/* Photos grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <ImageRegular className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos shared yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Photos and images shared in this conversation will appear here
            </p>
            <button className="px-4 py-2 bg-[#6264A7] text-white rounded-md hover:bg-[#5a5db8] transition-colors">
              Share a photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                {/* Photo preview */}
                <div className="relative aspect-square group cursor-pointer" onClick={() => setSelectedPhoto(photo.url)}>
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <ZoomInRegular className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                {/* Photo info */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{photo.name}</h4>
                    <div className="flex items-center space-x-1 ml-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <ShareRegular className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <ArrowDownloadRegular className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{photo.size}</span>
                      <span>{formatDate(photo.date)}</span>
                    </div>
                    <p className="text-xs text-gray-500">Shared by {photo.sender}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo modal for full view */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosTab;
