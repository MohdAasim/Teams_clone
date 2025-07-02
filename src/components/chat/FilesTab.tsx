import React from 'react';
import {
  ArrowUpload16Regular
} from "@fluentui/react-icons";

interface FilesTabProps {
  chatPartner: {
    name: string;
    email: string;
  };
}

const FilesTab: React.FC<FilesTabProps> = ({ chatPartner }) => {

  return (
    <div className="flex-1 bg-[#f8f9fa] overflow-hidden">
      {/* Files header */}
      <button className="flex items-center justify-between px-4 py-2 border text-black border-gray-400 ml-10 mt-10 rounded-lg cursor-pointer">
        <ArrowUpload16Regular className="w-5 h-5 text-black mr-2" />
        Upload
      </button>

      {/* Files list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="" data-testid="captioned-image">
          <img data-tid="cdn-image" src="https://statics.teams.cdn.live.net/evergreen-assets/illustrations/v2/folder-files-l-standard.svg" aria-hidden="true" className="" alt='folder name' height="128" />
          <span dir="auto" className="">Share files in this chat for {chatPartner.name}</span>
          <span dir="auto" className="">When you upload files to this files tab, they will show up in chat.</span>
        </div>
      </div>
    </div>
  );
};

export default FilesTab;
