import React, { useState } from 'react';
import { 
  TextField, 
  PrimaryButton,
  Dropdown,
  IconButton
} from '@fluentui/react';
import { ChevronLeft16Regular } from '@fluentui/react-icons';
import type { IDropdownOption } from '@fluentui/react';
import { STATUS_CLEAR_OPTIONS, MAX_STATUS_MESSAGE_LENGTH } from '../../utils/constant';

interface StatusMessageDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSetStatusMessage: (message: string) => void;
  userEmail: string;
  initialMessage: string;
}

const StatusMessageDialog: React.FC<StatusMessageDialogProps> = ({
  isOpen,
  onDismiss,
  onSetStatusMessage,
  userEmail,
  initialMessage = ''
}) => {
  const [statusMessage, setStatusMessage] = useState(initialMessage);
  const [clearAfter, setClearAfter] = useState<string>('Never');
  const maxLength = MAX_STATUS_MESSAGE_LENGTH;
  
  const handleMessageChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (newValue !== undefined && newValue.length <= maxLength) {
      setStatusMessage(newValue); 
    }
  };

  const handleClearAfterChange = (option?: IDropdownOption) => {
    if (option) {
      setClearAfter(option.text);
    }
  };
  
  const handleSubmit = () => {
    onSetStatusMessage(statusMessage);
    onDismiss();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-10 right-0 w-[360px] bg-white shadow-lg border-l border-gray-200 z-50 flex flex-col rounded-lg">
      {/* Header with back button */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <IconButton
          onClick={onDismiss}
          className="mr-2"
          styles={{
            root: {
              color: '#616161',
              padding: 0,
              marginRight: 12
            },
            icon: {
              fontSize: 16
            }
          }}
        >
          <ChevronLeft16Regular />
        </IconButton>
        <div>
          <h2 className="font-medium text-base">Set status message</h2>
          <div className="text-sm text-gray-500">{userEmail}</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow overflow-y-auto">
        <TextField
          placeholder="Type your status message here"
          value={statusMessage}
          onChange={handleMessageChange}
          multiline
          rows={3}
          resizable={false}
          styles={{
            field: {
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: 4,
              height:'240px'
            },
            fieldGroup: {
              border: '1px solid #e1e1e1',
              borderRadius: 4
            }
          }}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {statusMessage.length} / {maxLength}
        </div>
        
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Clear status message after</div>
          <Dropdown
            selectedKey={clearAfter.toLowerCase().replace(' ', '')}
            options={STATUS_CLEAR_OPTIONS}
            onChange={(_, option) => handleClearAfterChange(option)}
            styles={{
              dropdown: { width: '100%' },
              title: { 
                border: '1px solid #e1e1e1', 
                borderRadius: 4,
                fontSize: 14,
                height: 36
              }
            }}
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
        <PrimaryButton 
          onClick={handleSubmit} 
          text="Done" 
          styles={{ 
            root: { 
              backgroundColor: '#f5f5f5', 
              border: '1px solid #e1e1e1',
              color: '#252525',
              fontSize: 14,
              padding: '0 16px',
              height: 32,
              borderRadius: 4
            },
            rootHovered: {
              backgroundColor: '#e9e9e9',
              color: '#252525'
            }
          }} 
        />
      </div>
    </div>
  );
};

export default StatusMessageDialog;