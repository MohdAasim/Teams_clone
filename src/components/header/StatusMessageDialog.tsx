import React, { useState } from 'react';
import { 
  Dialog, 
  DialogFooter, 
  TextField, 
  PrimaryButton,
  DefaultButton,
  Dropdown,
} from '@fluentui/react';
import type { IDropdownOption } from '@fluentui/react';

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
  const [showOptions, setShowOptions] = useState(false);
  const maxLength = 280;

  const clearOptions: IDropdownOption[] = [
    { key: 'never', text: 'Never' },
    { key: 'today', text: 'Today' },
    { key: '1hour', text: '1 hour' },
    { key: '4hours', text: '4 hours' },
    { key: 'thisweek', text: 'This week' }
  ];
  
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
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={{
        title: 'Set status message',
        subText: userEmail,
      }}
      modalProps={{
        isBlocking: false,
        styles: { main: { maxWidth: 450 } }
      }}
    >
      <div className="mt-4">
        <TextField
          placeholder="Type your status message here"
          value={statusMessage}
          onChange={handleMessageChange}
          multiline
          rows={6}
          resizable={false}
          styles={{
            field: {
              backgroundColor: '#f5f5f5',
              padding: '12px'
            }
          }}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {statusMessage.length} / {maxLength}
        </div>
      </div>
      
      <div className="my-4">
        <div className="text-sm font-medium mb-2">Clear status message after</div>
        <Dropdown
          selectedKey={clearAfter.toLowerCase().replace(' ', '')}
          options={clearOptions}
          onChange={(_, option) => handleClearAfterChange(option)}
          styles={{
            dropdown: { width: '100%' }
          }}
        />
        
        {showOptions && (
          <div className="absolute left-0 right-0 bg-white border border-gray-200 mt-1 z-10">
            {clearOptions.map(option => (
              <div 
                key={option.key} 
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setClearAfter(option.text);
                  setShowOptions(false);
                }}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <DialogFooter>
        <DefaultButton onClick={onDismiss} text="Cancel" />
        <PrimaryButton 
          onClick={handleSubmit} 
          text="Done" 
          styles={{ 
            root: { 
              backgroundColor: '#F5F5F5', 
              border: '1px solid #E1E1E1',
              color: '#252525'
            } 
          }} 
        />
      </DialogFooter>
    </Dialog>
  );
};

export default StatusMessageDialog;