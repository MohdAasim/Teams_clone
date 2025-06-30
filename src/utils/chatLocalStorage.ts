/**
 * Utility functions for managing Teams chat localStorage
 */

// Constants for localStorage keys
export const NOTIFICATION_KEY = 'teams_desktop_notifications_enabled';
export const USER_STATUS_KEY = 'teams_user_status';
export const USER_STATUS_COLOR_KEY = 'teams_user_status_color';

// Chat storage key
export const CHATS_KEY = 'teams_chats';

// Chat types for localStorage
export interface StoredMessageType {
  message: string;
  sender: string;
  timestamp: string;
  reactions: string[];
}

export interface StoredChatType {
  id: number;
  name: string;
  email: string;
  image: null;
  recent: boolean;
  selected: boolean;
  messages: StoredMessageType[];
}

// Default status values
const DEFAULT_STATUS = 'Available';
const DEFAULT_STATUS_COLOR = '#6BB700';

/**
 * Check if desktop notifications should be shown
 * @returns boolean indicating if notification should be shown
 */
export const shouldShowNotification = (): boolean => {
  const savedState = localStorage.getItem(NOTIFICATION_KEY);
  return savedState === null || savedState === 'false';
};

/**
 * Enable desktop notifications
 */
export const enableNotifications = (): void => {
  localStorage.setItem(NOTIFICATION_KEY, 'true');
};

/**
 * Disable desktop notifications
 */
export const disableNotifications = (): void => {
  localStorage.setItem(NOTIFICATION_KEY, 'false');
};

/**
 * Get current user status
 */
export const getUserStatus = (): string => {
  return localStorage.getItem(USER_STATUS_KEY) || DEFAULT_STATUS;
};

/**
 * Get current user status color
 */
export const getUserStatusColor = (): string => {
  return localStorage.getItem(USER_STATUS_COLOR_KEY) || DEFAULT_STATUS_COLOR;
};

/**
 * Set user status and color
 */
export const setUserStatus = (status: string, color: string): void => {
  localStorage.setItem(USER_STATUS_KEY, status);
  localStorage.setItem(USER_STATUS_COLOR_KEY, color);
};

/**
 * Get chats from localStorage
 * @returns Array of chats from localStorage or empty array if none exist
 */
export const getChatsFromStorage = (): StoredChatType[] => {
  try {
    const savedChats = localStorage.getItem(CHATS_KEY);
    return savedChats ? JSON.parse(savedChats) : [];
  } catch (error) {
    console.error('Error parsing chats from localStorage:', error);
    return [];
  }
};

/**
 * Save chats to localStorage
 * @param chats Array of chats to save
 */
export const saveChatsToStorage = (chats: StoredChatType[]): void => {
  try {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error saving chats to localStorage:', error);
  }
};

/**
 * Clear all chats from localStorage
 */
export const clearChatsFromStorage = (): void => {
  localStorage.removeItem(CHATS_KEY);
};