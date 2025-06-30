import { useState, useRef } from 'react';
import type React from 'react';
import { 
  DefaultButton, 
  IconButton
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
  MoreHorizontal20Regular,
  DismissRegular,
  MailUnreadRegular,
  PinRegular,
  SpeakerMuteRegular,
  PersonProhibitedRegular,
  EyeOffRegular,
  AppsRegular,
  DeleteRegular
} from '@fluentui/react-icons';
import WelcomeCard from '../components/chat/WelcomeCard';
import MeetingDialog from '../components/videoCall/MeetingDialog';
import VideoCallModal from '../components/videoCall/VideoCallModal';
import { userName } from '../utils/constant';
import ChatMessages from '../components/chat/ChatMessages';
import NewChatInterface from '../components/chat/NewChatInterface';
import { useChatPage, type newChatType } from '../hooks/useChatPage';
import { iconButtonStyles } from '../utils/chatStyles';
import { useDropdownPosition } from '../hooks/useDropdownPosition';
const ChatPage = () => {
  // Dropdown positioning
  const { calculatePosition } = useDropdownPosition();
  const chatRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [dropdownPositions, setDropdownPositions] = useState<{ [key: number]: React.CSSProperties }>({});

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

  // Custom handler for chat options that calculates dropdown position
  const handleChatOptionsClickWithPosition = (chatId: number, e: unknown) => {
    (e as { stopPropagation: () => void }).stopPropagation();
    
    // First trigger the original handler
    handleChatOptionsClick(chatId, e);
    
    // Then calculate position
    const chatElement = chatRefs.current[chatId];
    if (chatElement) {
      const position = calculatePosition(chatElement);
      setDropdownPositions(prev => ({
        ...prev,
        [chatId]: position
      }));
    }
  };

  return (
    <div className="flex flex-col h-full border-l border-[#e1e1e1]">
      {showNotification && (
        <div className="bg-[#f0f6ff] px-4 py-1 flex items-center justify-between">
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
                  height: "20px",
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
                className={`relative ${
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
                      className="relative"
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
                      onClick={() =>
                        handleCreateNewChat({ name: "", email: "" })
                      }
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

                      {chats.map((chat, index) => (
                        <div
                          key={chat.id}
                          ref={(el) => {
                            chatRefs.current[chat.id] = el;
                          }}
                          className={`flex items-center pl-3 py-3 rounded-md hover:bg-gray-100 cursor-pointer relative ${
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
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={(e) =>
                                handleChatOptionsClickWithPosition(chat.id, e)
                              }
                              styles={{
                                root: {
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "4px",
                                  color: "#616161",
                                  selectors: {
                                    ":hover": {
                                      backgroundColor: "#f5f5f5",
                                    },
                                  },
                                },
                              }}
                            >
                              <MoreHorizontal20Regular />
                            </IconButton>
                          )}

                          {showChatOptions === chat.id && (
                            <div
                              className="absolute right-8 bg-white shadow-lg rounded-lg z-20 border border-gray-200 py-2 min-w-[160px]"
                              style={
                                dropdownPositions[chat.id] ||
                                (index < chats.length / 2
                                  ? { top: "100%", marginTop: "4px" }
                                  : { bottom: "100%", marginBottom: "4px" })
                              }
                            >
                              {/* Check if this is a new chat (no messages) or existing chat */}
                              {chat.messages.length === 0 ? (
                                // New chat options - only show Discard
                                <button
                                  className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700"
                                  onClick={(e) => handleDiscardChat(chat.id, e)}
                                >
                                  <DismissRegular className="mr-3 w-4 h-4" />
                                  <span>Discard</span>
                                </button>
                              ) : (
                                // Existing chat options - show full menu
                                <>
                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Mark as unread");
                                    }}
                                  >
                                    <MailUnreadRegular className="mr-3 w-4 h-4" />
                                    <span>Mark as unread</span>
                                  </button>

                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Pin");
                                    }}
                                  >
                                    <PinRegular className="mr-3 w-4 h-4" />
                                    <span>Pin</span>
                                  </button>

                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Mute");
                                    }}
                                  >
                                    <SpeakerMuteRegular className="mr-3 w-4 h-4" />
                                    <span>Mute</span>
                                  </button>

                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Block");
                                    }}
                                  >
                                    <PersonProhibitedRegular className="mr-3 w-4 h-4" />
                                    <span>Block</span>
                                  </button>

                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Hide");
                                    }}
                                  >
                                    <EyeOffRegular className="mr-3 w-4 h-4" />
                                    <span>Hide</span>
                                  </button>

                                  <div className="border-t border-gray-100 my-1"></div>

                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 w-full text-left text-sm text-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Manage apps");
                                    }}
                                  >
                                    <AppsRegular className="mr-3 w-4 h-4" />
                                    <span>Manage apps</span>
                                  </button>

                                  <div className="border-t border-gray-100 my-1"></div>

                                  <button
                                    className="flex items-center px-3 py-2 hover:bg-red-50 w-full text-left text-sm text-red-600 cursor-pointer"
                                    onClick={(e) =>
                                      handleDiscardChat(chat.id, e)
                                    }
                                  >
                                    <DeleteRegular className="mr-3 w-4 h-4" />
                                    <span>Delete</span>
                                  </button>
                                </>
                              )}
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
                  <div className="p-2 border-t border-[#e1e1e1] bg-gray-50 absolute bottom-0 left-0 right-0">
                    <div className="flex items-center justify-between text-sm ">
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
              {!showNewChat &&
                !selectedChatId &&
                (!isMobile || (isMobile && !showSidebar)) && (
                  <div className="flex-1 bg-white">
                    <WelcomeCard
                      userName={userName}
                      onNewChat={() =>
                        handleCreateNewChat({ name: "", email: "" })
                      }
                      handleStartMeeting={handleStartMeeting}
                      showWelcomeModal={showWelcomeModal}
                      showMeetingDialog2={showMeetingDialog2}
                      setShowMeetingDialog2={setShowMeetingDialog2}
                      setShowWelcomeModal={setShowWelcomeModal}
                    />
                  </div>
                )}

              {!showNewChat &&
                selectedChatId &&
                (
                  chats.find(
                    (chat) => chat.id === selectedChatId
                  ) as newChatType
                )?.messages.length > 0 && (
                  <ChatMessages
                    messages={
                      chats.find((chat) => chat.id === selectedChatId)
                        ?.messages || []
                    }
                    currentUser={userName}
                    chatPartner={{
                      name:
                        chats.find((chat) => chat.id === selectedChatId)
                          ?.name || "",
                      email:
                        chats.find((chat) => chat.id === selectedChatId)
                          ?.email || "",
                    }}
                    onSendMessage={handleSendMessage}
                    onBackToChats={handleBackToChats}
                  />
                )}

              {/* New chat view */}
              {((showNewChat && (!isMobile || (isMobile && !showSidebar))) ||
                (selectedChatId &&
                  (
                    chats.find(
                      (chat) => chat.id === selectedChatId
                    ) as newChatType
                  )?.messages.length == 0)) && (
                <NewChatInterface
                  isMobile={isMobile}
                  showGroupNameField={showGroupNameField}
                  groupName={groupName}
                  setGroupName={setGroupName}
                  recipient={recipient}
                  message={message}
                  setMessage={setMessage}
                  users={users}
                  onBackToChats={handleBackToChats}
                  onToggleGroupNameField={toggleGroupNameField}
                  onUserSearchChange={onUserSearchChange}
                  onUserSelect={onUserSelect}
                  onAddMessage={addMessage}
                  setUsers={setUsers}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;