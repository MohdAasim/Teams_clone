import { useEffect, useState } from 'react';
import { 
  DefaultButton, 
  IconButton,
  TextField,
  Icon
} from '@fluentui/react';
import { 
  Dismiss16Regular,
  InfoFilled,
  ComposeFilled,
  VideoRegular,
  VideoFilled,
  FilterRegular,
  PersonAddRegular,
  ChevronDown24Regular,
  ChevronUp24Regular,
  MoreHorizontal20Regular,
  ChevronLeft24Regular,
  DismissRegular,
  Send24Regular,
  EmojiRegular,
  AttachRegular
} from '@fluentui/react-icons';
import WelcomeCard from '../components/chat/WelcomeCard';
import { 
  shouldShowNotification, 
  enableNotifications, 
  disableNotifications 
} from '../utils/chatLocalStorage';
import MeetingDialog from '../components/videoCall/MeetingDialog';
import VideoCallModal from '../components/videoCall/VideoCallModal';

const ChatPage = () => {
  const [showNotification, setShowNotification] = useState(shouldShowNotification);
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [chats, setChats] = useState<any[]>([]);
  
  // New chat states
  const [showNewChat, setShowNewChat] = useState(false);
  const [showGroupNameField, setShowGroupNameField] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null);
  const [showChatOptions, setShowChatOptions] = useState<number | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [showSyncBanner, setShowSyncBanner] = useState(true);

  // Video call states
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [userName, setUserName] = useState("Mohd Aasim");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTurnOn = () => {
    enableNotifications();
    setShowNotification(false);
  };

  const handleDismiss = () => {
    disableNotifications();
    setShowNotification(false);
  };

  const handleCreateNewChat = () => {
    // Add a new chat to the list
    const newChatId = Date.now();
    setChats([
      { id: newChatId, name: 'New chat', image: null, recent: true, selected: true },
      ...chats
    ]);
    setSelectedChatId(newChatId);
    setShowNewChat(true);
    
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToChats = () => {
    if (isMobile) {
      setShowSidebar(true);
    } else {
      setShowNewChat(false);
    }
  };

  const handleChatItemClick = (id: number) => {
    setChats(chats.map(chat => ({
      ...chat,
      selected: chat.id === id
    })));
    setSelectedChatId(id);
    setShowNewChat(true);
    
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const toggleGroupNameField = () => {
    setShowGroupNameField(!showGroupNameField);
  };

  const handleChatHover = (id: number) => {
    setHoveredChatId(id);
  };

  const handleChatLeave = () => {
    setHoveredChatId(null);
  };

  const handleChatOptionsClick = (id: number, e: unknown) => {
    // Cast to any event-like object with stopPropagation()
    (e as { stopPropagation: () => void }).stopPropagation();
    setShowChatOptions(id);
  };

  const handleDiscardChat = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowChatOptions(null);
    setChats(chats.filter(chat => chat.id !== id));
    setShowNewChat(false);
    
    // If this was the selected chat, reset selectedChatId
    if (selectedChatId === id) {
      setSelectedChatId(null);
    }
  };

  const handleClickOutside = () => {
    setShowChatOptions(null);
  };

  const handleCloseSyncBanner = () => {
    setShowSyncBanner(false);
  };

  const handleMeetNowClick = () => {
    setShowMeetingDialog(true);
  };

  const handleStartMeeting = () => {
    setShowMeetingDialog(false);
    setShowVideoCall(true);
  };

  const handleEndVideoCall = () => {
    setShowVideoCall(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Header icon styles to match Teams UI
  const iconButtonStyles = {
    root: {
      width: '32px',
      height: '32px',
      color: '#616161',
      backgroundColor: 'transparent',
      border: '1px solid #e1e1e1',
      borderRadius: '4px',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 4px',
      selectors: {
        ':hover': {
          backgroundColor: '#f5f5f5'
        }
      }
    },
    icon: {
      fontSize: '20px',
      transition: 'color 0.2s ease'
    }
  };

  return (
    <div className="flex flex-col h-full">
      {showNotification && (
        <div className="bg-[#f0f6ff] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center rounded-full w-5 h-5 mr-2 text-2xl">
              <InfoFilled />
            </div>
            <span>Stay in the know. Turn on desktop notifications.</span>
          </div>

          <div className="flex items-center gap-2">
            <DefaultButton
              text="Turn on"
              onClick={handleTurnOn}
              styles={{
                root: {
                  backgroundColor: "white",
                  borderColor: "#d1d1d1",
                  minWidth: "80px",
                  height: "28px",
                  borderRadius: "4px",
                },
                label: {
                  fontWeight: "normal",
                },
              }}
            />
            <IconButton
              onClick={handleDismiss}
              ariaLabel="Close"
              styles={{
                root: {
                  color: "#616161",
                },
              }}
            >
              <Dismiss16Regular />
            </IconButton>
          </div>
        </div>
      )}

      <div className="flex flex-1 h-[calc(100vh-60px)] overflow-hidden">
        {/* Chat sidebar */}
        {showVideoCall ? (
          <VideoCallModal
            isOpen={showVideoCall}
            onDismiss={handleEndVideoCall}
            username={userName}
          />
        ) : (
          <>
            {(!isMobile || (isMobile && showSidebar)) && (
              <div
                className={`${
                  isMobile ? "w-full" : "w-[320px]"
                } border-r border-[#e1e1e1] flex flex-col bg-white h-full`}
              >
                <div className="p-4 flex items-center justify-between border-b border-[#e1e1e1]">
                  <h2 className="text-xl font-semibold">Chat</h2>
                  <div className="flex space-x-1">
                    <IconButton
                      ariaLabel="Filter"
                      styles={iconButtonStyles}
                      onMouseOver={() => setActiveIconIndex(0)}
                      onMouseOut={() => setActiveIconIndex(null)}
                    >
                      <FilterRegular
                        style={{
                          fontSize: "20px",
                          color: activeIconIndex === 0 ? "#5b5fc7" : "#616161",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      ariaLabel="Video call"
                      styles={iconButtonStyles}
                      onMouseOver={() => setActiveIconIndex(1)}
                      onMouseOut={() => setActiveIconIndex(null)}
                      onClick={handleMeetNowClick}
                    >
                      {activeIconIndex === 1 ? (
                        <VideoFilled
                          style={{
                            fontSize: "20px",
                            color: "#5b5fc7",
                          }}
                        />
                      ) : (
                        <VideoRegular
                          style={{
                            fontSize: "20px",
                            color: "#616161",
                          }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      ariaLabel="New message"
                      styles={iconButtonStyles}
                      onMouseOver={() => setActiveIconIndex(2)}
                      onMouseOut={() => setActiveIconIndex(null)}
                      onClick={handleCreateNewChat}
                    >
                      <ComposeFilled
                        style={{
                          fontSize: "20px",
                          color: activeIconIndex === 2 ? "#5b5fc7" : "#616161",
                        }}
                      />
                    </IconButton>
                  </div>
                </div>

                {/* Chat list */}
                <div className="flex flex-col flex-grow overflow-y-auto">
                  {chats.length > 0 && (
                    <div className="p-2">
                      <div className="flex items-center px-2 py-1">
                        <div className="flex items-center text-gray-600 text-sm font-medium">
                          <span>Recent</span>
                          <ChevronDown24Regular
                            className="ml-1"
                            fontSize={16}
                          />
                        </div>
                      </div>

                      {chats.map((chat) => (
                        <div
                          key={chat.id}
                          className={`flex items-center px-3 py-3 rounded-md hover:bg-gray-100 cursor-pointer relative ${
                            chat.selected ? "bg-gray-100" : ""
                          }`}
                          onMouseEnter={() => handleChatHover(chat.id)}
                          onMouseLeave={handleChatLeave}
                          onClick={() => handleChatItemClick(chat.id)}
                        >
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            {/* User icon */}
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 12.5C6.6625 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.3375 12.5 10 12.5Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{chat.name}</div>
                          </div>

                          {hoveredChatId === chat.id && (
                            <IconButton
                              ariaLabel="More options"
                              className="absolute right-2 top-2"
                              onClick={(e) =>
                                handleChatOptionsClick(chat.id, e)
                              }
                            >
                              <MoreHorizontal20Regular />
                            </IconButton>
                          )}

                          {showChatOptions === chat.id && (
                            <div className="absolute right-8 top-2 bg-white shadow-md rounded-md z-10">
                              <button
                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                                onClick={(e) => handleDiscardChat(chat.id, e)}
                              >
                                <DismissRegular className="mr-2" />
                                <span>Discard</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message for empty list */}
                  {chats.length === 0 && (
                    <div className="p-4 text-gray-500 text-center">
                      <p>Start a new private conversation here.</p>
                    </div>
                  )}
                </div>

                {/* Sync banner at bottom - only shown when there are chats */}
                {chats.length > 0 && showSyncBanner && (
                  <div className="p-3 border-t border-[#e1e1e1] bg-gray-50">
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <div>
                        Find more people by syncing from your phone or other
                        sources.
                      </div>
                      <div className="flex">
                        <button className="px-3 py-1 text-[#5b5fc7] border border-[#5b5fc7] rounded mr-2">
                          Sync
                        </button>
                        <IconButton
                          ariaLabel="Dismiss"
                          onClick={handleCloseSyncBanner}
                        >
                          <DismissRegular />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                )}

                {/* Invite to Teams button */}
                <div className="p-3 border-t border-[#e1e1e1]">
                  <button className="bg-[#5b5fc7] text-white py-2 px-4 w-full flex items-center justify-center gap-2 hover:bg-[#4b4fa7] transition-colors rounded-md">
                    <PersonAddRegular />
                    <span>Invite to Teams</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {!showNewChat && (!isMobile || (isMobile && !showSidebar)) && (
                <div className="flex-1 bg-white">
                  <WelcomeCard
                    userName={userName}
                    onNewChat={handleCreateNewChat}
                    onMeetNow={handleMeetNowClick}
                  />
                </div>
              )}

              {showNewChat && (!isMobile || (isMobile && !showSidebar)) && (
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  {/* New Chat Header */}
                  <div className="flex items-center p-3 border-b border-[#e1e1e1]">
                    {/* Only show back button on mobile */}
                    {isMobile && (
                      <IconButton
                        ariaLabel="Back"
                        onClick={handleBackToChats}
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
                            onChange={(_, newValue) =>
                              setGroupName(newValue || "")
                            }
                            borderless
                            styles={{
                              root: { margin: "0" },
                              fieldGroup: { background: "transparent" },
                            }}
                          />
                        </div>
                      )}

                      <div className="flex items-center">
                        <span className="mr-2 font-medium">To:</span>
                        <TextField
                          placeholder="Enter name, email or phone number"
                          value={recipient}
                          onChange={(_, newValue) =>
                            setRecipient(newValue || "")
                          }
                          borderless
                          className="flex-1"
                          styles={{
                            root: { margin: "0", width: "100%" },
                            fieldGroup: { background: "transparent" },
                          }}
                        />
                        <IconButton
                          ariaLabel={
                            showGroupNameField
                              ? "Hide group name"
                              : "Show group name"
                          }
                          onClick={toggleGroupNameField}
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
                    <p className="text-gray-600 mb-4">
                      Type your first message below.
                    </p>
                  </div>

                  {/* Message input - Updated to match reference images */}
                  <div className="border-t border-[#e1e1e1] p-3">
                    <div className="flex items-end rounded-md border border-[#e1e1e1] overflow-hidden">
                      <TextField
                        placeholder="Type a message"
                        value={message}
                        onChange={(_, newValue) => setMessage(newValue || "")}
                        multiline
                        autoAdjustHeight
                        resizable={false}
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
                        <div className="flex items-center mr-2">
                          <IconButton
                            ariaLabel="Emoji"
                            styles={{
                              root: {
                                color: "#616161",
                                height: "32px",
                                width: "32px",
                              },
                            }}
                          >
                            <EmojiRegular />
                          </IconButton>

                          <IconButton
                            ariaLabel="Attach file"
                            styles={{
                              root: {
                                color: "#616161",
                                height: "32px",
                                width: "32px",
                              },
                            }}
                          >
                            <AttachRegular />
                          </IconButton>

                          <IconButton
                            ariaLabel="Format"
                            styles={{
                              root: {
                                color: "#616161",
                                height: "32px",
                                width: "32px",
                              },
                            }}
                          >
                            <Icon iconName="TextBox" />
                          </IconButton>

                          <IconButton
                            ariaLabel="More options"
                            styles={{
                              root: {
                                color: "#616161",
                                height: "32px",
                                width: "32px",
                              },
                            }}
                          >
                            <Icon iconName="More" />
                          </IconButton>
                        </div>

                        <IconButton
                          ariaLabel="Send"
                          disabled={!message.trim()}
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
              )}
            </div>
          </>
        )}
      </div>

      {/* Add the MeetingDialog and VideoCallModal components here */}
      <MeetingDialog
        isOpen={showMeetingDialog}
        onDismiss={() => setShowMeetingDialog(false)}
        onStartMeeting={handleStartMeeting}
        username={userName}
      />
    </div>
  );
};

export default ChatPage;