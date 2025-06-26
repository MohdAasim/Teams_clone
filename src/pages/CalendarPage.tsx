import { useState, useEffect, useRef } from 'react';
import { 
  IconButton, 
  Calendar as FluentCalendar,
  Icon
} from '@fluentui/react';
import { 
  CalendarToday16Regular, 
  VideoFilled,
  AddFilled,
  CalendarMonth24Filled
} from '@fluentui/react-icons';
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import MobileCalendarView from '../components/calendar/MobileCalendarView';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMonthCalendar, setShowMonthCalendar] = useState<boolean>(false);
  const [viewType, setViewType] = useState<string>('work week');
  const [viewDropdownVisible, setViewDropdownVisible] = useState<boolean>(false);
  const [showingSyncMessage, setShowingSyncMessage] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const monthRef = useRef<HTMLDivElement>(null);
  const viewButtonRef = useRef<HTMLDivElement>(null);

  // Responsive layout handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setShowMonthCalendar(false);
      }
      if (viewButtonRef.current && !viewButtonRef.current.contains(event.target as Node)) {
        setViewDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate week days based on selected date and view type
  const getDaysToShow = () => {
    const days = [];
    let startDay;
    
    if (viewType === 'work week') {
      // Work week (Monday to Friday)
      startDay = startOfWeek(selectedDate, { weekStartsOn: 1 });
      for (let i = 0; i < 5; i++) {
        days.push(addDays(startDay, i));
      }
    } else if (viewType === 'week') {
      // Full week (Sunday to Saturday)
      startDay = startOfWeek(selectedDate, { weekStartsOn: 0 });
      for (let i = 0; i < 7; i++) {
        days.push(addDays(startDay, i));
      }
    } else {
      // Day view - just the selected date
      days.push(selectedDate);
    }
    
    return days;
  };

  const days = getDaysToShow();

  // Handle navigating to today
  const goToToday = () => {
    setSelectedDate(new Date());
    showSyncMessage();
  };

  // Handle next/previous navigation
  const navigatePrevious = () => {
    if (viewType === 'day') {
      setSelectedDate(subDays(selectedDate, 1));
    } else {
      setSelectedDate(subWeeks(selectedDate, 1));
    }
    showSyncMessage();
  };

  const navigateNext = () => {
    if (viewType === 'day') {
      setSelectedDate(addDays(selectedDate, 1));
    } else {
      setSelectedDate(addWeeks(selectedDate, 1));
    }
    showSyncMessage();
  };

  // Show "You're up to date" message briefly
  const showSyncMessage = () => {
    setShowingSyncMessage(true);
    setTimeout(() => {
      setShowingSyncMessage(false);
    }, 3000);
  };

  // Handle date selection from calendar
  const onSelectDate = (date: Date | null | undefined) => {
    if (date) {
      setSelectedDate(date);
      setShowMonthCalendar(false);
      showSyncMessage();
    }
  };

  // Handle view type change
  const onViewChange = (view: string) => {
    setViewType(view);
    setViewDropdownVisible(false);
  };

  // Generate time slots
  const timeSlots = [];
  for (let i = 9; i <= 15; i++) {
    const hour = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? 'PM' : 'AM';
    timeSlots.push(`${hour} ${ampm}`);
  }
  
  // Check if current day has meeting (just for demo)
  const hasMeeting = (day: Date) => {
    // Simulating a meeting at 10 AM on Thursday for demo
    const dayOfWeek = day.getDay();
    return dayOfWeek === 4; // Thursday
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#6264A7] rounded mr-3 flex items-center justify-center">
            <CalendarMonth24Filled className="text-white" />
          </div>
          <h1 className="text-xl font-semibold">Calendar</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="hidden md:flex items-center justify-center h-9 px-3 border border-gray-300 rounded text-sm hover:bg-gray-100"
          >
            {/* <HashtagFilled className="mr-2" fontSize={16} /> */}
            Join with an ID
          </button>
          
          <button 
            className="hidden md:flex items-center justify-center h-9 px-3 border border-gray-300 rounded text-sm hover:bg-gray-100"
          >
            <VideoFilled className="mr-2" fontSize={16} />
            Meet now
          </button>
          
          <button 
            className="flex items-center justify-center h-9 px-3 bg-[#6264A7] text-white rounded text-sm hover:bg-[#585AC0]"
          >
            <AddFilled className="mr-2" fontSize={16} />
            <span className={isMobile ? 'sr-only' : ''}>New meeting</span>
          </button>
        </div>
      </div>
      
      {/* Calendar Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-wrap gap-2">
        <div className="flex items-center flex-wrap gap-2">
          {/* Today button */}
          <button 
            className="flex items-center justify-center h-8 px-3 border border-gray-300 rounded text-sm hover:bg-gray-100"
            onClick={goToToday}
          >
            <CalendarToday16Regular className="mr-1" />
            Today
          </button>
          
          {/* Previous/Next navigation */}
          <div className="flex items-center">
            <IconButton 
              iconProps={{ iconName: 'ChevronLeft' }} 
              onClick={navigatePrevious}
              className="h-8 w-8 border border-gray-300 rounded"
            />
            <IconButton 
              iconProps={{ iconName: 'ChevronRight' }} 
              onClick={navigateNext}
              className="h-8 w-8 border border-gray-300 rounded ml-1"
            />
          </div>
          
          {/* Month selector */}
          <div 
            ref={monthRef}
            className="relative flex items-center cursor-pointer"
            onClick={() => setShowMonthCalendar(!showMonthCalendar)}
          >
            <span className="text-sm font-semibold mr-1">
              {format(selectedDate, 'MMMM yyyy')}
            </span>
            <Icon iconName="ChevronDown" className="text-xs" />
            
            {showMonthCalendar && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                <FluentCalendar
                  onSelectDate={onSelectDate}
                  value={selectedDate}
                  highlightSelectedMonth
                  showGoToToday={false}
                  showMonthPickerAsOverlay={false}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sync message */}
          <div className="text-sm">
            {showingSyncMessage && "You're up to date!"}
          </div>
          
          {/* View selector */}
          <div 
            ref={viewButtonRef}
            className="relative flex items-center cursor-pointer"
            onClick={() => setViewDropdownVisible(!viewDropdownVisible)}
          >
            <Icon iconName={
              viewType === 'day' ? 'CalendarDay' : 
              viewType === 'work week' ? 'CalendarWorkWeek' : 'Calendar'
            } className="mr-2" />
            <span className="text-sm mr-1">
              {viewType === 'work week' ? 'Work week' : 
               viewType === 'week' ? 'Week' : 'Day'}
            </span>
            <Icon iconName="ChevronDown" className="text-xs" />
            
            {viewDropdownVisible && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 w-40">
                <div className="p-2">
                  <div 
                    className={`p-2 rounded flex items-center ${viewType === 'day' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={() => onViewChange('day')}
                  >
                    <Icon iconName="CalendarDay" className="mr-2" />
                    <span>Day</span>
                    {viewType === 'day' && <Icon iconName="CheckMark" className="ml-auto" />}
                  </div>
                  
                  <div 
                    className={`p-2 rounded flex items-center ${viewType === 'work week' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={() => onViewChange('work week')}
                  >
                    <Icon iconName="CalendarWorkWeek" className="mr-2" />
                    <span>Work week</span>
                    {viewType === 'work week' && <Icon iconName="CheckMark" className="ml-auto" />}
                  </div>
                  
                  <div 
                    className={`p-2 rounded flex items-center ${viewType === 'week' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={() => onViewChange('week')}
                  >
                    <Icon iconName="Calendar" className="mr-2" />
                    <span>Week</span>
                    {viewType === 'week' && <Icon iconName="CheckMark" className="ml-auto" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Calendar Grid - Switch between mobile and desktop view */}
      {isMobile ? (
        <MobileCalendarView 
          days={days}
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          onSelectDay={(day) => setSelectedDate(day)}
          viewType={viewType}
        />
      ) : (
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Day headers */}
          <div className="flex border-b border-gray-200">
            <div className="w-16 shrink-0"></div>
            {days.map((day, index) => {
              //const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              return (
                <div 
                  key={index} 
                  className={`flex-1 p-2 text-center border-l border-gray-200 ${
                    isSelected ? 'border-b-2 border-b-[#6264A7]' : ''
                  }`}
                >
                  <div className={`text-2xl font-light ${isSelected ? 'text-[#6264A7]' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className={`text-sm ${isSelected ? 'text-[#6264A7]' : 'text-gray-500'}`}>
                    {format(day, 'EEEE')}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Time slots */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <div key={timeSlot} className="flex border-b border-gray-200 h-20">
              <div className="w-16 shrink-0 text-right pr-3 pt-1 text-sm text-gray-500">
                {timeSlot}
              </div>
              {days.map((day, dayIndex) => {
                const hasMeetingToday = hasMeeting(day) && timeSlot === '10 AM';
                return (
                  <div 
                    key={`${timeIndex}-${dayIndex}`} 
                    className="flex-1 border-l border-gray-200 relative"
                  >
                    {timeSlot === '10 AM' && timeIndex === 0 && (
                      <div className="absolute left-0 right-0 top-0 border-t border-dashed border-red-400"></div>
                    )}
                    
                    {hasMeetingToday && (
                      <div className="absolute left-1 right-1 top-1 h-16 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer">
                        <div className="border-l-4 border-[#6264A7] h-full p-2">
                          <div className="text-sm font-medium truncate">Daily Standup</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;