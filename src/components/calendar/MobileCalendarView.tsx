import {  useRef } from 'react';
import { format, isSameDay } from 'date-fns';

interface MobileCalendarViewProps {
  days: Date[];
  selectedDate: Date;
  timeSlots: string[];
  onSelectDay: (day: Date) => void;
  viewType: string;
}

const MobileCalendarView: React.FC<MobileCalendarViewProps> = ({
  days,
  selectedDate,
  timeSlots,
  onSelectDay,
  viewType
}) => {
  // Ref for the main content container
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Check if the day has a meeting
  const hasMeeting = (day: Date) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 4; // Thursday
  };
  
//   // Get meeting details
//   const getMeetingDetails = (day: Date) => {
//     return {
//       title: "Daily Standup",
//       startTime: "10:00 AM",
//       endTime: "10:30 AM",
//       color: "#6264A7"
//     };
//   };

  if (viewType === 'day') {
    // Day view for mobile
    return (
      <div className="flex-1 flex flex-col h-full">
        {/* Single day header - sticky */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-2 text-center">
          <div className="text-xl font-medium text-[#6264A7]">
            {format(selectedDate, 'd')}
          </div>
          <div className="text-sm text-[#6264A7]">
            {format(selectedDate, 'EEEE')}
          </div>
        </div>

        {/* Time slots for day view */}
        <div className="flex-1 overflow-y-auto">
          {timeSlots.map((timeSlot) => {
            const hasMeetingToday = hasMeeting(selectedDate) && timeSlot === '10 AM';
            return (
              <div key={timeSlot} className="flex border-b border-gray-200 h-20 min-h-[80px]">
                <div className="w-16 shrink-0 text-right pr-3 pt-1 text-sm text-gray-500">
                  {timeSlot}
                </div>
                <div className="flex-1 relative">
                  {timeSlot === '10 AM' && (
                    <div className="absolute left-0 right-0 top-0 border-t border-dashed border-red-400"></div>
                  )}
                  
                  {hasMeetingToday && (
                    <div className="absolute left-1 right-1 top-1 h-16 border border-gray-300 rounded bg-white">
                      <div className="border-l-4 border-[#6264A7] h-full p-2 flex flex-col">
                        <div className="text-sm font-medium">Daily Standup</div>
                        <div className="text-xs text-gray-500">10:00 AM - 10:30 AM</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Week or Work week view for mobile
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Fixed date header row */}
      <div className="bg-white border-b border-gray-200 w-full sticky top-0 z-10">
        <div className="flex">
          <div className="w-16 shrink-0"></div>
          <div className="flex-1 flex">
            {days.map((day, index) => {
              const isSelected = isSameDay(day, selectedDate);
              return (
                <div
                  key={index}
                  onClick={() => onSelectDay(day)}
                  className={`flex-1 p-2 text-center ${
                    isSelected ? 'border-b-2 border-b-[#6264A7]' : ''
                  }`}
                >
                  <div className={`text-xl font-medium ${isSelected ? 'text-[#6264A7]' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-[#6264A7]' : 'text-gray-500'}`}>
                    {format(day, 'EEE')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollable calendar content area */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="flex h-auto min-h-full">
          {/* Fixed time column */}
          <div className="w-16 shrink-0 bg-white">
            {timeSlots.map(timeSlot => (
              <div key={timeSlot} className="h-20 min-h-[80px] border-b border-gray-200 text-right pr-3 pt-1 text-sm text-gray-500">
                {timeSlot}
              </div>
            ))}
          </div>
          
          {/* Day columns with content */}
          <div className="flex-1 flex">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="flex-1 h-auto min-h-full border-l border-gray-200">
                {timeSlots.map((timeSlot, timeIndex) => {
                  const hasMeetingToday = hasMeeting(day) && timeSlot === '10 AM';
                  return (
                    <div
                      key={`${dayIndex}-${timeIndex}`}
                      className="h-20 min-h-[80px] border-b border-gray-200 relative"
                    >
                      {timeSlot === '10 AM' && (
                        <div className="absolute left-0 right-0 top-0 border-t border-dashed border-red-400"></div>
                      )}
                      
                      {hasMeetingToday && (
                        <div className="absolute inset-x-1 top-1 h-16 border border-gray-300 rounded bg-white">
                          <div className="border-l-4 border-[#6264A7] h-full p-2 flex flex-col overflow-hidden">
                            <div className="text-xs font-medium truncate">Daily Standup</div>
                            <div className="text-xs text-gray-500 truncate">10:00 - 10:30</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCalendarView;