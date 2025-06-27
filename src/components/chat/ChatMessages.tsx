import React from "react";
import type { messageType } from "../../pages/ChatPage";

interface ChatMessagesProps {
  messages: messageType[];
  currentUser: string;
  chatPartner: {
    name: string;
    email: string;
  };
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUser, chatPartner }) => {

    console.log("ChatMessages component rendered with messages:", messages);
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

  // Format time to display as "8:07 PM" format
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4">
      {/* Date headers and message groups */}
      {Object.entries(messageGroups).map(([date, dateMessages]) => (
        <div key={date} className="mb-4">
          {/* Date header */}
          <div className="flex justify-center mb-4">
            <div className="text-xs text-gray-500 bg-white px-2">
              {date === new Date().toLocaleDateString() ? "Today" : date}
              Hello
            </div>
          </div>
          
          {/* Messages for this date */}
          {dateMessages.map((message, index) => {
            const isCurrentUser = message.sender === currentUser;
            const showAvatar = index === 0 || 
              dateMessages[index - 1]?.sender !== message.sender;
              
            return (
              <div 
                key={index}
                className={`flex mb-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Avatar for other user */}
                {!isCurrentUser && showAvatar && (
                  <div className="self-start mr-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-[#E9A52F] flex items-center justify-center text-white font-medium text-sm">
                      {getUserInitials(chatPartner.name)}
                    </div>
                  </div>
                )}
                
                <div className={`flex flex-col max-w-[60%] ${!isCurrentUser && !showAvatar ? 'ml-10' : ''}`}>
                  {/* Sender name - only show for first message in a group */}
                  {showAvatar && !isCurrentUser && (
                    <span className="text-xs text-gray-600 mb-1">
                      {chatPartner.name}
                    </span>
                  )}
                  
                  <div className="flex items-end gap-2">
                    {/* Message bubble */}
                    <div 
                      className={`py-2 px-3 rounded-md ${
                        isCurrentUser 
                          ? 'bg-[#5b5fc7] text-white rounded-tr-none' 
                          : 'bg-gray-100 rounded-tl-none'
                      }`}
                    >
                      {message.message}
                    </div>
                    
                    {/* Time */}
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
                
                {/* Avatar for current user */}
                {isCurrentUser && showAvatar && (
                  <div className="self-start ml-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-[#6264A7] flex items-center justify-center text-white font-medium text-sm">
                      {getUserInitials(currentUser)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p>No messages yet</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;