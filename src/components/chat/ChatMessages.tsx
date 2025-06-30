import React, { useRef, useEffect, useState } from "react";
import type { messageType } from "../../pages/ChatPage";
import { EmojiRegular, SendRegular, AttachRegular, AddRegular } from '@fluentui/react-icons';

interface ChatMessagesProps {
  messages: messageType[];
  currentUser: string;
  chatPartner: {
    name: string;
    email: string;
  };
  onSendMessage: (message: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUser, chatPartner, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div className="flex flex-col h-full bg-[#f5f5f5] rounded-md overflow-hidden">
      {/* Chat header with recipient name */}
      <div className="bg-white px-4 py-2 border-b flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#7b83eb] flex items-center justify-center text-white mr-3">
            {getUserInitials(chatPartner.name)}
          </div>
          <span className="font-medium text-gray-900">{chatPartner.name}</span>
        </div>
      </div>
      
      {/* Message area */}
      <div 
        ref={messagesContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse" 
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

      {/* Message input */}
      <div className="bg-white p-3 border-t">
        <div className="relative">
          <textarea
            className="w-full rounded-md border border-gray-300 p-3 pr-24 resize-none focus:outline-none focus:border-[#6264A7] placeholder-gray-500 min-h-[40px]"
            placeholder="Type a message"
            rows={1}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <div className="absolute right-3 bottom-3 flex items-center space-x-2 text-gray-500">
            <button
              className="hover:text-gray-700 relative cursor-pointer"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <EmojiRegular fontSize={20} />

              {/* Emoji picker */}
              {showEmoji && (
                <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-300 rounded-md p-2 shadow-lg grid grid-cols-6 gap-2 w-64 z-10">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="text-lg hover:bg-gray-100 p-1 rounded cursor-pointer"
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
            </button>

            <button className="hover:text-gray-700 cursor-pointer">
              <AttachRegular fontSize={20} />
            </button>
            
            <button className="hover:text-gray-700 cursor-pointer">
              <AddRegular fontSize={20} />
            </button>

            <button
              className={`${
                newMessage.trim() ? "text-[#6264A7]" : "text-gray-300"
              } hover:text-[#7b83eb] transition-colors cursor-pointer`}
              disabled={!newMessage.trim()}
              onClick={handleSendMessage}
            >
              <SendRegular fontSize={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;