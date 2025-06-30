import React from 'react';
import { DocumentRegular, ArrowDownloadRegular, ShareRegular } from '@fluentui/react-icons';

interface FilesTabProps {
  chatPartner: {
    name: string;
    email: string;
  };
}

const FilesTab: React.FC<FilesTabProps> = ({ chatPartner }) => {
  // Mock files data - in real app this would come from props or API
  const files = [
    {
      id: 1,
      name: 'Project_Proposal.docx',
      size: '2.5 MB',
      type: 'document',
      date: '2024-01-15',
      sender: 'John Doe'
    },
    {
      id: 2,
      name: 'Budget_Analysis.xlsx',
      size: '1.8 MB',
      type: 'spreadsheet',
      date: '2024-01-14',
      sender: chatPartner.name
    },
    {
      id: 3,
      name: 'Meeting_Notes.pdf',
      size: '0.9 MB',
      type: 'pdf',
      date: '2024-01-13',
      sender: 'John Doe'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <DocumentRegular className="w-8 h-8 text-blue-600" />;
      case 'spreadsheet':
        return <DocumentRegular className="w-8 h-8 text-green-600" />;
      case 'pdf':
        return <DocumentRegular className="w-8 h-8 text-red-600" />;
      default:
        return <DocumentRegular className="w-8 h-8 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex-1 bg-[#f8f9fa] overflow-hidden">
      {/* Files header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Files</h3>
          <button className="px-4 py-2 bg-[#6264A7] text-white rounded-md hover:bg-[#5a5db8] transition-colors text-sm">
            Share a file
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Files shared in this conversation with {chatPartner.name}
        </p>
      </div>

      {/* Files list */}
      <div className="flex-1 overflow-y-auto p-4">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <DocumentRegular className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files shared yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Files shared in this conversation will appear here
            </p>
            <button className="px-4 py-2 bg-[#6264A7] text-white rounded-md hover:bg-[#5a5db8] transition-colors">
              Share a file
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  {/* File icon */}
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  
                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <ShareRegular className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <ArrowDownloadRegular className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{file.size}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">Shared by {file.sender}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{formatDate(file.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesTab;
