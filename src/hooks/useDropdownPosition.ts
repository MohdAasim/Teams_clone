import { useCallback } from 'react';

export const useDropdownPosition = () => {
  const calculatePosition = useCallback((chatElement: HTMLElement | null) => {
    if (!chatElement) {
      return { top: '100%', marginTop: '4px' };
    }

    // Get the bounding rect of the chat item
    const chatRect = chatElement.getBoundingClientRect();
    
    // Find the scrollable parent (chat list container)
    const scrollableParent = chatElement.closest('.overflow-y-auto');
    if (!scrollableParent) {
      return { top: '100%', marginTop: '4px' };
    }
    
    // Get the bounding rect of the scrollable parent
    const parentRect = scrollableParent.getBoundingClientRect();
    
    // Calculate distances
    const distanceFromTop = chatRect.top - parentRect.top;
    const distanceFromBottom = parentRect.bottom - chatRect.bottom;
    
    // Estimate dropdown menu height (based on number of menu items)
    const menuItemHeight = 36; // Each menu item is approximately 36px
    const maxMenuItems = 8; // Maximum number of menu items in full menu
    const estimatedMenuHeight = menuItemHeight * maxMenuItems + 16; // Adding padding
    
    // Calculate available space
    const spaceBelow = distanceFromBottom;
    const spaceAbove = distanceFromTop;
    
    // Decision logic for positioning
    if (spaceBelow >= estimatedMenuHeight) {
      // Enough space below - show dropdown below
      return {
        top: '100%',
        marginTop: '4px'
      };
    } else if (spaceAbove >= estimatedMenuHeight) {
      // Not enough space below but enough above - show dropdown above
      return {
        bottom: '100%',
        marginBottom: '4px'
      };
    } else {
      // Not enough space above or below - show in middle with max height
      return {
        top: '50%',
        transform: 'translateY(-50%)',
      };
    }
  }, []);

  return { calculatePosition };
};
