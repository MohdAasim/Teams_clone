import React, { useRef, useEffect, useState } from "react";
import { 
  EmojiRegular, 
  SendRegular, 
  AttachRegular,
  VideoRegular,
  CallRegular,
  PersonAddRegular,
  MoreHorizontalRegular,
  GifRegular,
  StickerRegular,
  ChevronDown12Regular,
  Checkmark12Regular,
  ChevronLeft24Regular
} from '@fluentui/react-icons';
import { type messageType } from "../../hooks/useChatPage";
import FilesTab from "./FilesTab";
import PhotosTab from "./PhotosTab";
import { IconButton } from "@fluentui/react";

interface ChatMessagesProps {
  messages: messageType[];
  currentUser: string;
  chatPartner: {
    name: string;
    email: string;
  };
  onSendMessage: (message: string) => void;
  onBackToChats: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUser, chatPartner, onSendMessage,onBackToChats }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'files' | 'photos'>('chat');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showtabMenu, setShowTabMenu] = useState(false);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMoreMenu) {
        setShowMoreMenu(false);
      }
      if (showEmoji) {
        setShowEmoji(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMoreMenu, showEmoji]);

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [date: string]: messageType[] } = {};
    
    messages.forEach(message => {
      // Extract date part only from timestamp
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();
  
  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format time to display as "11:59 AM" format
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  // Format date for the center header (e.g., "Today" or "November 5, 2022")
  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    // If date is today, show "Today"
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    // Otherwise show full date
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Emoji options for the emoji picker
  const emojis = ["😀", "😂", "😊", "😍", "🥰", "😘", "🤗", "😎", "🙄", "😔", "😢", "❤️", "👍", "👎", "👏", "🙏", "🎉"];

  // Reaction options
  const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "✏️"];

  return (
    <div className="flex flex-col h-full bg-white rounded-md overflow-hidden">
      {/* Chat header with recipient name and action buttons */}
      <div className="bg-white px-4 h-16 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center h-full space-x-6">
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
          <div className="w-10 h-10 rounded-full bg-[#7b83eb] flex items-center justify-center text-white mr-3">
            {getUserInitials(chatPartner.name)}
          </div>
          <div className="flex flex-col ">
              <h3 className="font-bold capitalize md:text-xl text-gray-900">{chatPartner.name}</h3>
              <button className="inline-block lg:hidden relative w-full" onClick={()=>setShowTabMenu(!showtabMenu)}>{activeTab} <ChevronDown12Regular/>
             {showtabMenu&& <article className="absolute w-32 flex-col flex bg-white shadow-xl rounded-md border-[.25px] border-gray-300 text-gray-600">
                <div className="fixed top-0 left-0 right-0 bottom-0" onClick={()=>setShowTabMenu(false)}></div>
                
                <button className="text-left space-x-2 px-2 py-2 border-b border-gray-300 pb-3 items-center" onClick={() => {setActiveTab('chat');setShowTabMenu(false)}}><Checkmark12Regular className={`h-5 w-5 ${activeTab !== 'chat'&&"text-white"}`}/><span>Chat</span></button>
                <button className="text-left space-x-2 p-2 items-center" onClick={() => {setActiveTab('files');setShowTabMenu(false)}}><Checkmark12Regular className={`h-5 w-5 ${activeTab !== 'files'&&"text-white"}`}/><span>Files</span></button>
              <button className={"text-left space-x-2 p-2 items-center"} onClick={() => {setActiveTab('photos');setShowTabMenu(false)}}><Checkmark12Regular className={`h-5 w-5 ${activeTab !== 'photos'&&"text-white"}`}/><span>Photos</span></button>
                </article>}</button>
          </div>
          <div className="hidden space-x-4 lg:flex h-full">
                <button
                  className={`px-0 py-1  font-semibold border-b-4 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'chat'
                      ? 'border-primary text-black'
                      : 'text-gray-600 hover:border-gray-300 border-transparent'
                  }`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat
                </button>
                <button
                   className={`px-0 py-1 font-semibold border-b-4 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'files'
                      ? 'border-primary text-black'
                      : 'text-gray-600 hover:border-gray-300 border-transparent'
                  }`}
                  onClick={() => setActiveTab('files')}
                >
                  Files
                </button>
                <button
                   className={`px-0 py-1  font-semibold border-b-4 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'photos'
                      ? 'border-primary text-black'
                      : 'text-gray-600 hover:border-gray-300 border-transparent'
                  }`}
                  onClick={() => setActiveTab('photos')}
                >
                  Photos
                </button>
              </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
            <CallRegular className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
            <VideoRegular className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
            <PersonAddRegular className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
            >
              <MoreHorizontalRegular className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* More menu dropdown */}
            {showMoreMenu && (
              <div 
                className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 min-w-[150px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                  Pin conversation
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                  Mute
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                  View profile
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-red-600">
                  Delete conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'chat' && (
        <>
          {/* Message area */}
          <div 
            ref={messagesContainerRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse bg-[#f8f9fa]" 
          >
            {/* Reversed to make scrolling work naturally */}
            <div ref={messagesEndRef} />
            
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>No messages yet</p>
              </div>
            ) : (
              <div className="flex flex-col-reverse">
                {Object.entries(messageGroups).map(([date, dateMessages]) => (
                  <div key={date} className="space-y-4 mb-4">
                    {/* Date header */}
                    <div className="flex justify-center">
                      <div className="px-4 py-1 text-sm text-gray-500 bg-gray-100 rounded-full inline-block">
                        {formatDateHeader(date)}
                      </div>
                    </div>
                    
                    {/* Messages for this date */}
                    <div className="space-y-4">
                      {dateMessages.map((message, index) => {
                        const isCurrentUser = message.sender === currentUser;
                        const showAvatar =
                          index === 0 ||
                          dateMessages[index - 1]?.sender !== message.sender;
                        const showTimestamp =
                          index === dateMessages.length - 1 ||
                          dateMessages[index + 1]?.sender !== message.sender;
                        const messageId = `msg-${date}-${index}`;
                        const isActive = activeMessageId === messageId;

                        return (
                          <div
                            key={messageId}
                            className={`relative group ${
                              isCurrentUser ? "ml-auto" : ""
                            }`}
                            onMouseEnter={() => setActiveMessageId(messageId)}
                            onMouseLeave={() => setActiveMessageId(null)}
                          >
                            {/* Message container */}
                            <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                              {/* Left timestamp for current user messages */}
                              {isCurrentUser && showTimestamp && (
                                <div className="text-xs text-gray-500 self-end mb-1 mr-2">
                                  {formatTime(message.timestamp)}
                                </div>
                              )}
                              
                              <div className={`flex max-w-[70%] ${isCurrentUser ? "" : "flex-row"}`}>
                                {/* Avatar for other user */}
                                {!isCurrentUser && showAvatar && (
                                  <div className="mr-2 flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                                      {getUserInitials(chatPartner.name)}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Message content */}
                                <div>
                                  <div
                                    className={`py-2 px-3 rounded-md ${
                                      isCurrentUser
                                        ? "bg-[#6264A7] text-white rounded-tr-none"
                                        : "bg-white text-black rounded-tl-none border border-gray-200"
                                    }`}
                                  >
                                    {message.message}
                                  </div>

                                  {/* Reactions display */}
                                  {message.reactions && message.reactions.length > 0 && (
                                    <div className="flex mt-1 gap-1">
                                      {message.reactions.map((reaction, i) => (
                                        <div
                                          key={i}
                                          className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-sm"
                                        >
                                          {reaction}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Right timestamp for other user messages */}
                                {!isCurrentUser && showTimestamp && (
                                  <div className="text-xs text-gray-500 self-end mb-1 ml-2">
                                    {formatTime(message.timestamp)}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Reaction button that appears on hover */}
                            {isActive && (
                              <div className="absolute top-0 -mt-8 bg-white rounded-lg shadow-md border border-gray-200 px-2 py-1 flex space-x-2">
                                {reactionEmojis.map((emoji, idx) => (
                                  <button 
                                    key={idx} 
                                    className="text-lg hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full"
                                    onClick={() => console.log(`React with ${emoji} to message`)}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message input - Updated design to match Teams */}
          <div className="bg-white border-t border-gray-200">
            <div className="p-4">
              <div className="flex items-start space-x-3">
                {/* Message input container */}
                <div className="flex-1 relative">
                  <form onSubmit={(e)=>{e.preventDefault();handleSendMessage()}} className="bg-gray-50 rounded-lg border border-gray-300 focus-within:border-[#6264A7] focus-within:ring-1 focus-within:ring-[#6264A7]">
                    <textarea
                      className="w-full bg-transparent p-3 pr-12 resize-none focus:outline-none placeholder-gray-500 min-h-[48px] max-h-32"
                      placeholder="Type a message"
                      rows={1}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      style={{ minHeight: '48px' }}
                    />
                    
                    {/* Bottom toolbar */}
                    <div className="flex items-center justify-between px-3 pb-2">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowEmoji(!showEmoji);
                          }}
                        >
                          <EmojiRegular className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer">
                          <GifRegular className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer">
                          <StickerRegular className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer">
                          <AttachRegular className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        className={`p-1.5 rounded transition-colors  cursor-pointer ${
                          newMessage.trim() 
                            ? "bg-[#6264A7] text-white hover:bg-[#5a5db8]" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!newMessage.trim()}
                        // onClick={handleSendMessage}
                        type="submit"
                      >
                        <SendRegular className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  {/* Emoji picker */}
                  {showEmoji && (
                    <div 
                      className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-lg p-3 shadow-lg grid grid-cols-8 gap-2 w-80 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="text-xl hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewMessage((prev) => prev + emoji);
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Files Tab Content */}
      {activeTab === 'files' && (
        <FilesTab chatPartner={chatPartner} />
      )}

      {/* Photos Tab Content */}
      {activeTab === 'photos' && (
        <PhotosTab chatPartner={chatPartner} />
      )}
    </div>
  );
};

export default ChatMessages;