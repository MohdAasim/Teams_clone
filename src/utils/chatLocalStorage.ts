/**
 * Utility functions for managing Teams chat localStorage
 */

// Constants for localStorage keys
export const NOTIFICATION_KEY = 'teams_desktop_notifications_enabled';

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