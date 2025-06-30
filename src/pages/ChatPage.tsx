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
import MeetingDialog from '../components/videoCall/MeetingDialog';
import VideoCallModal from '../components/videoCall/VideoCallModal';
import { userName } from '../utils/constant';
import ChatMessages from '../components/chat/ChatMessages';
import { useChatPage, type newChatType } from '../hooks/useChatPage';
import { iconButtonStyles } from '../utils/chatStyles';
const ChatPage = () => {
  const {
    // State
    showNotification,
    activeIconIndex,
    setActiveIconIndex,
    isMobile,
    showSidebar,
    chats,
    showNewChat,
    showGroupNameField,
    groupName,
    setGroupName,
    recipient,
    message,
    setMessage,
    hoveredChatId,
    showChatOptions,
    selectedChatId,
    showSyncBanner,
    showMeetingDialog2,
    showVideoCall,
    showWelcomeModal,
    setShowWelcomeModal,
    setShowMeetingDialog2,
    users,
    setUsers,

    // Handlers
    handleTurnOn,
    handleDismiss,
    handleCreateNewChat,
    handleBackToChats,
    handleChatItemClick,
    toggleGroupNameField,
    handleChatHover,
    handleChatLeave,
    handleChatOptionsClick,
    handleDiscardChat,
    handleCloseSyncBanner,
    handleMeetNowClick,
    handleStartMeeting,
    closeMeetingDialog,
    handleEndVideoCall,
    onUserSearchChange,
    onUserSelect,
    addMessage,
    handleSendMessage
  } = useChatPage();

  return (
    <div className="flex flex-col h-full border-l border-[#e1e1e1]">
      {showNotification && (
        <div className="bg-[#f0f6ff] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center rounded-full w-5 h-5 mr-2 text-2xl pl10">
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
              ariaLabel="Close" styles={{
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

      <div className="flex flex-1 h-[calc(100vh-60px)] overflow-hidden bg-[#ebebeb]">
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
                } flex flex-col bg-white h-full`}
              >
                <div className="p-4 flex items-center justify-between bg-[#ebebeb] border-[#e1e1e1] relative">
                  <h2 className="text-xl font-semibold relative">Chat</h2>
                  <div className="flex space-x-1 relative">
                     
                      <MeetingDialog 
                      top={"120%"}
                      left={"50%"}
                      isOpen={showWelcomeModal && showMeetingDialog2}
                      onDismiss={closeMeetingDialog}
                      onStartMeeting={handleStartMeeting}
                      username={userName}
                    />
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
                      className='relative'
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
                      onClick={()=>handleCreateNewChat({name:'',email:''})}
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
                <div className="flex flex-col flex-grow overflow-y-auto bg-[#ebebeb]">
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
                <div className="p-2 bg-[#ebebeb]">
                  <button className="bg-[#5b5fc7] text-white py-2 font-bold px-4 w-full flex items-center justify-center gap-2 hover:bg-[#4b4fa7] transition-colors rounded-md">
                    <PersonAddRegular />
                    <span>Invite to Teams</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden rounded-xl m-2 shadow-2xs">
              {!showNewChat&&!selectedChatId && (!isMobile || (isMobile && !showSidebar)) && (
                <div className="flex-1 bg-white">
                  <WelcomeCard
                    userName={userName}
                    onNewChat={()=>handleCreateNewChat({name:'',email:''})}
                    handleStartMeeting={handleStartMeeting}
                    showWelcomeModal={showWelcomeModal}
                    showMeetingDialog2={showMeetingDialog2}
                    setShowMeetingDialog2={setShowMeetingDialog2}
                    setShowWelcomeModal={setShowWelcomeModal}
                  />
                </div>
              )}

              {!showNewChat&&selectedChatId&&(chats.find(chat => chat.id === selectedChatId) as newChatType)?.messages.length > 0 && 
              <ChatMessages 
    messages={chats.find(chat => chat.id === selectedChatId)?.messages || []}
    currentUser={userName}
    chatPartner={{
      name: chats.find(chat => chat.id === selectedChatId)?.name || "",
      email: chats.find(chat => chat.id === selectedChatId)?.email || ""
    }}
    onSendMessage={handleSendMessage}

  />}

              {/* New chat view */}
              {((showNewChat && (!isMobile || (isMobile && !showSidebar))) || (selectedChatId && (chats.find(chat => chat.id === selectedChatId) as newChatType)?.messages.length == 0))&& (
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
                        <span className="mr-2 font-medium relative">To:
                        </span>
                        
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
                                    onClick={()=>onUserSelect(user)}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-[#E9A52F] flex items-center justify-center text-white font-medium text-sm mr-3">
                                      {user.name.split(' ').map(part => part.charAt(0)).join('').toUpperCase().substring(0, 2)}
                                    </div>
                                    <div>
                                      <div className="font-medium">{user.name}</div>
                                      <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
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
                  <div className="px-12 pb-6">
                    <div className="flex items-end rounded-md border border-b-2 border-b-[#5b5fc7] border-[#e1e1e1] overflow-hidden">
                      <TextField
                        placeholder="Type a message"
                        value={message}
                        onChange={(_, newValue) => setMessage(newValue || "")}
                        multiline
                        autoAdjustHeight
                        resizable={false}
                        className='h-12'
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
                          disabled={!message.trim() || !recipient}
                          onClick={() => addMessage()}
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
    </div>
  );
};

export default ChatPage;