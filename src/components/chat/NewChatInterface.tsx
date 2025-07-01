import React from 'react';
import { 
  IconButton,
  TextField,
  Icon
} from '@fluentui/react';
import { 
  ChevronLeft24Regular,
  ChevronDown24Regular,
  ChevronUp24Regular,
  EmojiRegular,
  AttachRegular,
  Send24Regular
} from '@fluentui/react-icons';
import { dummyUsers } from '../../utils/constant';

interface NewChatInterfaceProps {
  isMobile: boolean;
  showGroupNameField: boolean;
  groupName: string;
  setGroupName: (value: string) => void;
  recipient: string;
  message: string;
  setMessage: (value: string) => void;
  users: typeof dummyUsers;
  onBackToChats: () => void;
  onToggleGroupNameField: () => void;
  onUserSearchChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUserSelect: (user: { name: string; email: string }) => void;
  onAddMessage: () => void;
  setUsers: (users: typeof dummyUsers) => void;
}

const NewChatInterface: React.FC<NewChatInterfaceProps> = ({
  isMobile,
  showGroupNameField,
  groupName,
  setGroupName,
  recipient,
  message,
  setMessage,
  users,
  onBackToChats,
  onToggleGroupNameField,
  onUserSearchChange,
  onUserSelect,
  onAddMessage,
  setUsers
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* New Chat Header */}
      <div className="flex items-center p-3 border-b border-[#e1e1e1]">
        {/* Only show back button on mobile */}
        {isMobile && (
          <IconButton
            ariaLabel="Back"
            onClick={onBackToChats}
            styles={{
              root: {
                color: "#616161",
                marginRight: "8px",
              },
            }}
          >
            <ChevronLeft24Regular />
          </IconButton>
        )}

        <div className="flex flex-col flex-1">
          {/* Group name field - only shown when toggle is clicked */}
          {showGroupNameField && (
            <div className="mb-2 border-b border-[#e1e1e1] pb-2">
              <TextField
                placeholder="Group name:"
                value={groupName}
                onChange={(_, newValue) => setGroupName(newValue || "")}
                borderless
                styles={{
                  root: { margin: "0" },
                  fieldGroup: { background: "transparent" },
                }}
              />
            </div>
          )}

          <div className="flex items-center">
            <span className="mr-2 font-medium relative">To:</span>

            <div className="flex-1 relative">
              <TextField
                placeholder="Enter name, email or phone number"
                value={recipient}
                onChange={onUserSearchChange}
                onFocus={onUserSearchChange}
                onBlur={() => setTimeout(() => setUsers([]), 300)}
                borderless
                className="flex-1"
                styles={{
                  root: { margin: "0", width: "100%" },
                  fieldGroup: { background: "transparent" },
                }}
              />

              {users.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md z-10 mt-1 border border-gray-200">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => onUserSelect(user)}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E9A52F] flex items-center justify-center text-white font-medium text-sm mr-3">
                        {user.name
                          .split(" ")
                          .map((part) => part.charAt(0))
                          .join("")
                          .toUpperCase()
                          .substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <IconButton
              ariaLabel={
                showGroupNameField ? "Hide group name" : "Show group name"
              }
              onClick={onToggleGroupNameField}
            >
              {showGroupNameField ? (
                <ChevronUp24Regular />
              ) : (
                <ChevronDown24Regular />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      {/* New Chat Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-32 h-32 mb-4">
          <img
            src="https://statics.teams.cdn.live.net/evergreen-assets/illustrations/webp/256/chat-l-standard-256x256.webp"
            alt="New chat bubble"
            className="w-full h-full"
          />
        </div>
        <h2 className="text-xl font-semibold mb-1">
          You're starting a new conversation
        </h2>
        <p className="text-gray-600 mb-4">Type your first message below.</p>
      </div>

      {/* Message input - Updated to match reference images */}
      <div className="px-4 lg:px-12 pb-6">
        <div className="flex items-end rounded-md border border-b-2 border-b-[#5b5fc7] border-[#e1e1e1] overflow-hidden">
          <TextField
            placeholder="Type a message"
            value={message}
            onChange={(_, newValue) => setMessage(newValue || "")}
            multiline
            autoAdjustHeight
            resizable={false}
            className="h-12"
            borderless
            styles={{
              root: { margin: "0", width: "100%" },
              fieldGroup: {
                background: "transparent",
                padding: "8px 8px 0 8px",
              },
            }}
          />

          {/* Icon toolbar at bottom */}
          <div className="flex items-center border-none p-2 ml-auto">
            <div className="flex items-center">
              <EmojiRegular className="cursor-pointer w-8 h-5" />
              <AttachRegular className="cursor-pointer w-8 h-5" />

              <Icon iconName="TextBox" className="cursor-pointer w-8 h-5" />

              <Icon iconName="More" className="cursor-pointer w-8 h-5" />
            </div>

            <IconButton
              ariaLabel="Send"
              disabled={!message.trim() || !recipient}
              onClick={onAddMessage}
              styles={{
                root: {
                  color: message.trim() ? "#5b5fc7" : "#c8c8c8",
                  height: "32px",
                  width: "32px",
                  marginLeft: "8px",
                },
              }}
            >
              <Send24Regular />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatInterface;
