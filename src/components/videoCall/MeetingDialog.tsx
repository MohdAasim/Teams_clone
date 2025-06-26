import React, { useState, useEffect } from 'react';
import { Dialog, DialogType, TextField, PrimaryButton, DefaultButton, Spinner, SpinnerSize, IconButton } from '@fluentui/react';
import { CopyRegular } from '@fluentui/react-icons';

interface MeetingDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  onStartMeeting: () => void;
  username: string;
}

const MeetingDialog: React.FC<MeetingDialogProps> = ({
  isOpen,
  onDismiss,
  onStartMeeting,
  username
}) => {
  const [meetingName, setMeetingName] = useState(`Meeting with ${username}`);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  // Reset the link state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setGeneratedLink('');
    }
  }, [isOpen]);

  const handleGenerateLink = () => {
    setIsGeneratingLink(true);
    
    // Simulate API call to generate link
    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 90000000) + 10000000;
      setGeneratedLink(`https://teams.live.com/meet/${randomId}`);
      setIsGeneratingLink(false);
    }, 1500);
  };

  const handleStartMeeting = () => {
    onStartMeeting();
  };

  // Styling to match Microsoft Teams dialog
  const dialogStyles = {
    main: {
      maxWidth: 420,
      borderRadius: 4,
      padding: 0,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      padding: '16px 24px'
    }
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Start a meeting now',
        styles: {
          title: { fontSize: 16, fontWeight: 600, padding: 0 },
          subText: { display: 'none' },
        },
      }}
      modalProps={{
        isBlocking: false,
        styles: dialogStyles,
      }}
    >
      <div className="p-6">
        <div className="mb-4">
          <label className="text-sm mb-2 block">Meeting name</label>
          <TextField 
            value={meetingName} 
            onChange={(_, newValue) => setMeetingName(newValue || '')}
            styles={{
              root: { marginBottom: 16 },
              fieldGroup: { borderRadius: 4 }
            }}
          />
        </div>

        {generatedLink ? (
          <div className="mb-4 flex items-center">
            <TextField 
              value={generatedLink} 
              readOnly 
              styles={{ 
                root: { flex: 1 },
                fieldGroup: { borderRadius: 4, color: '#0078d4' }
              }}
            />
            <IconButton 
              iconProps={{ iconName: 'Copy' }}
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              styles={{
                root: {
                  marginLeft: 8,
                  color: '#0078d4'
                }
              }}
              title="Copy link"
              ariaLabel="Copy link"
            >
              <CopyRegular />
            </IconButton>
          </div>
        ) : (
          <DefaultButton 
            text="Get a link to share"
            onClick={handleGenerateLink}
            disabled={isGeneratingLink}
            className="mb-4 w-full"
            styles={{
              root: {
                borderRadius: 4,
                borderColor: '#e0e0e0',
                height: 36
              }
            }}
          >
            {isGeneratingLink && <Spinner size={SpinnerSize.small} className="mr-2" />}
          </DefaultButton>
        )}

        <PrimaryButton
          text="Start meeting"
          onClick={handleStartMeeting}
          styles={{
            root: {
              borderRadius: 4,
              backgroundColor: '#0078d4',
              width: '100%',
              height: 36
            },
            rootHovered: {
              backgroundColor: '#106EBE'
            }
          }}
        />
      </div>
    </Dialog>
  );
};

export default MeetingDialog;