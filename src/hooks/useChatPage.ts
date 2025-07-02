import { useState, useEffect, type FormEvent } from 'react';
import { 
  shouldShowNotification, 
  enableNotifications, 
  disableNotifications,
  getChatsFromStorage,
  saveChatsToStorage
} from '../utils/chatLocalStorage';
import { dummyUsers, userName } from '../utils/constant';

export interface messageType {
  message: string;
  sender: string;
  timestamp: string;
  reactions: string[];
}

export interface newChatType {
  id: number;
  name: string;
  email: string;
  image: null;
  recent: boolean;
  selected: boolean;
  messages: messageType[];
}

export const useChatPage = () => {
  // State declarations
  const [showNotification, setShowNotification] = useState(shouldShowNotification);
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [chats, setChats] = useState<newChatType[]>(() => getChatsFromStorage());
  
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
  const [showMeetingDialog2, setShowMeetingDialog2] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [users, setUsers] = useState<typeof dummyUsers>([]);

  // Resize effect
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

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    saveChatsToStorage(chats);
  }, [chats]);

  // Click outside effect
  useEffect(() => {
    const handleClickOutside = () => {
      setShowChatOptions(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Notification handlers
  const handleTurnOn = () => {
    enableNotifications();
    setShowNotification(false);
  };

  const handleDismiss = () => {
    disableNotifications();
    setShowNotification(false);
  };

  // Chat handlers
  const handleCreateNewChat = (user: { name: string; email: string } | undefined) => {
    const existingChat = chats.find(chat => chat.email === user?.email);
    if (existingChat) {
      return;
    }
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      name: user?.name || "New chat",
      email: user?.email || "",
      image: null,
      recent: true,
      selected: true,
      messages: []
    };
    const newChats = chats.filter(chat => chat.name !== "New chat");

    setChats([newChat, ...newChats]);
    setSelectedChatId(newChatId);
    setShowNewChat(true);
    
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToChats = () => {
    if (isMobile) {
      setShowSidebar(true);
      setSelectedChatId(null)      
    } else {
      setShowNewChat(false);
    }
  };

  const handleChatItemClick = (id: number) => {
    const selectedChat = chats.find((chat) => chat.id === id);
    setRecipient("");
    
    if (selectedChat && selectedChat.name !== "New chat") {
     setRecipient(selectedChat.name);
    }

    setChats((oldchats) =>
      oldchats.map((chat) => ({
        ...chat,
        selected: chat.id === id,
      }))
    );
    setChats((oldchats) =>
      oldchats.filter((chat) => chat.name !== "New chat" || chat.selected)
    );

    setSelectedChatId(id);
    setShowNewChat(false);

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
    (e as { stopPropagation: () => void }).stopPropagation();
    setShowChatOptions(id);
  };

  const handleDiscardChat = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowChatOptions(null);
    setChats(chats.filter(chat => chat.id !== id));
    setShowNewChat(false);
    setRecipient('');
    
    if (selectedChatId === id) {
      setSelectedChatId(null);
    }
  };

  const handleCloseSyncBanner = () => {
    setShowSyncBanner(false);
  };

  // Meeting handlers
  const handleMeetNowClick = () => {
    setShowMeetingDialog2(true);
    setShowWelcomeModal(!showWelcomeModal);
  };

  const handleStartMeeting = () => {
    setShowMeetingDialog2(false);
    setShowVideoCall(true);
  };

  const closeMeetingDialog = () => {
    setShowMeetingDialog2(false);
    setShowWelcomeModal(false);
  };

  const handleEndVideoCall = () => {
    setShowVideoCall(false);
  };

  // User search handlers
  const onUserSearchChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setRecipient(newValue);
    
    const filteredUser = newValue.trim().length < 3 ? [] : dummyUsers.filter(user => 
      user.email.toLowerCase().includes(newValue.toLowerCase())
    );
    setUsers(filteredUser);
  };

  const onUserSelect = (user: { name: string; email: string }) => {
    setRecipient(user.name);
    
    setUsers([]);
    handleCreateNewChat(user);
  };

  // Message handlers
  const addMessage = () => {
    const newMessage: messageType = {
      message: message,
      sender: userName,
      timestamp: new Date().toISOString(),
      reactions: []
    };
    setChats(oldChats =>
      oldChats.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      })
    );
    
    setShowNewChat(false);
    setMessage('');
    setRecipient('');
  };

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim() || !selectedChatId) return;
    
    const newMessage: messageType = {
      message: messageText,
      sender: userName,
      timestamp: new Date().toISOString(),
      reactions: []
    };
    
    setChats(oldChats =>
      oldChats.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      })
    );
  };
  
  const closeChat=()=>{
    setSelectedChatId(null)
  }

  return {
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
    closeChat,

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
  };
};
