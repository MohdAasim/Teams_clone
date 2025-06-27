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

export const dummyUsers = [
  {
    name: "Arslaan",
    email: "arslaan@company.com"
  },
  {
    name: "asd",
    email: "asd@company.com"
  },
  {
    name: "Aisha Patel",
    email: "a.patel@company.com"
  },
  {
    name: "David Rodriguez",
    email: "d.rodriguez@company.com"
  },
  {
    name: "Emma David",
    email: "emma.d@company.com"
  },
  {
    name: "James Lee",
    email: "jameslee@company.com"
  },
  {
    name: "Priya Sharma",
    email: "p.sharma@company.com"
  },
  {
    name: "Thomas Brown",
    email: "t.brown@company.com"
  },
  {
    name: "Olivia Garcia",
    email: "olivia.g@company.com"
  },
  {
    name: "Alex Kim",
    email: "alex.kim@company.com"
  },
  {
    name: "Sophia Martinez",
    email: "s.martinez@company.com"
  },
  {
    name: "Daniel Thompson",
    email: "dthompson@company.com"
  },
  {
    name: "Zoe Williams",
    email: "zoe.w@company.com"
  },
  {
    name: "Ryan Nguyen",
    email: "r.nguyen@company.com"
  },
  {
    name: "Isabella Clark",
    email: "i.clark@company.com"
  }
]