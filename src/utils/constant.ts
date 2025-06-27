import type { IDropdownOption } from '@fluentui/react';

export const userName = "Mohd Aasim";
export const userEmail = "mfsi.aasim.m@gmail.com";

// Status message dialog constants
export const MAX_STATUS_MESSAGE_LENGTH = 280;

export const STATUS_CLEAR_OPTIONS: IDropdownOption[] = [
  { key: 'never', text: 'Never' },
  { key: 'today', text: 'Today' },
  { key: '1hour', text: '1 hour' },
  { key: '4hours', text: '4 hours' },
  { key: 'thisweek', text: 'This week' }
];

// User status options
export const STATUS_OPTIONS = [
  { 
    name: 'Available', 
    color: '#6BB700',
    iconName: 'checkmarkCircle'
  },
  { 
    name: 'Busy', 
    color: '#D92C2C',
    iconName: 'circle'
  },
  { 
    name: 'Do not disturb', 
    color: '#D92C2C',
    iconName: 'dismissCircle'
  },
  { 
    name: 'Be right back', 
    color: '#F8C73E',
    iconName: 'clock'
  },
  { 
    name: 'Appear away', 
    color: '#F8C73E',
    iconName: 'clock'
  },
  { 
    name: 'Appear offline', 
    color: '#8A8886',
    iconName: 'presenceOffline'
  },
];