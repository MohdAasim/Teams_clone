import React, { useState, useEffect } from 'react';
import { TextField, PrimaryButton, DefaultButton, Spinner, SpinnerSize, IconButton } from '@fluentui/react';
import { CopyRegular, VideoRegular } from '@fluentui/react-icons';

interface MeetingDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  onStartMeeting: () => void;
  username: string;
  top?: number|string;
  left?: number|string;
  bottom?: number|string;
  right?: number|string;
}

const MeetingDialog: React.FC<MeetingDialogProps> = ({
  isOpen,
  onDismiss,
  onStartMeeting,
  username,
  top,
  left,
  bottom,
  right,
}) => {
  const [meetingName, setMeetingName] = useState(`Meeting with ${username}`);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setGeneratedLink('');
      setMeetingName(`Meeting with ${username}`);
    }
  }, [isOpen, username]);

  const handleGenerateLink = () => {
    setIsGeneratingLink(true);
    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 90000000) + 10000000;
      setGeneratedLink(`https://teams.live.com/meet/${randomId}`);
      setIsGeneratingLink(false);
    }, 1500);
  };
    useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
  };

  const handleShareEmail = () => {
    window.open(`mailto:?subject=Meeting Invitation&body=Join the meeting: ${generatedLink}`);
  };

  const handleStartMeeting = () => {
    onStartMeeting();
  };

  if (!isOpen) return null;

  // Compose absolute positioning style
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 50,
    top,
    left,
    bottom,
    right,
    minWidth: 340,
    maxWidth: 420,
    background: 'white',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    padding: 0,
  };
  if (generatedLink) {
    return (
      <div style={positionStyle}className='rounded-sm translate-x-[-50%]'>
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onDismiss}
          aria-label="Close"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          &times;
        </button>
        <div className="p-6 pt-5">
          <div className="flex items-center mb-2 text-left">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-3">
              {/* Video icon SVG */}
              <VideoRegular
                  />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg leading-tight mb-2">
                Meeting with {username}
              </div>
              <a
              href="#"
              className="text-xs text-indigo-500 hover:underline"
              style={{ fontWeight: 500 }}
              tabIndex={0}
            >   Configure meeting options
            </a>
            </div>
          </div>
        
          <div className="flex items-center mb-4">
            <input
              className="flex-1 px-3 py-2 rounded border border-gray-200 bg-gray-100 text-gray-800 text-sm font-medium"
              value={generatedLink}
              readOnly
              style={{ outline: 'none' }}
            />
            <IconButton
              iconProps={{ iconName: 'Copy' }}
              onClick={handleCopy}
              styles={{
                root: {
                  marginLeft: 8,
                  color: '#6366f1',
                  background: 'transparent',
                  borderRadius: 4,
                }
              }}
              title="Copy link"
              ariaLabel="Copy link"
            >
              <CopyRegular />
            </IconButton>
            {copied && (
              <span className="ml-2 text-xs text-green-600 font-medium">Copied!</span>
            )}
          </div>
          <DefaultButton
            text="Share via email"
            onClick={handleShareEmail}
             className="mb-2 w-full"
            styles={{
              root: {
                borderRadius: 4,
                borderColor: '#e0e0e0',
                height: 36
              }
            }}
          />
          <PrimaryButton
          text="Start meeting"
          onClick={handleStartMeeting}
          styles={{
            root: {
              borderRadius: 4,
              backgroundColor: '#5b5fc7',
              width: '100%',
              height: 36
            },
            rootHovered: {
              backgroundColor: '#106EBE'
            }
          }}
        />
        </div>
      </div>
    );
  }

  return (
    <div style={positionStyle} className='rounded-sm translate-x-[-50%]'>
      {/* Close button */}
      <button
        className="absolute rounded-md top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        onClick={onDismiss}
        aria-label="Close"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
         &times;
      </button>
      <div className="p-4 pt-3">
        <div className="font-semibold mb-3">Start a meeting now</div>
        <div className="mb-2">
          <label className="text-sm mb-2 block">Meeting name</label>
          <TextField
            value={meetingName}
            onChange={(_, newValue) => setMeetingName(newValue || '')}
            styles={{
              root: { marginBottom: 16 },
              fieldGroup: { borderRadius: 4 }
            }}
          />
        </div><DefaultButton
            text="Get a link to share"
            onClick={handleGenerateLink}
            disabled={isGeneratingLink}
            className="mb-2 w-full"
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
        <PrimaryButton
          text="Start meeting"
          onClick={handleStartMeeting}
          styles={{
            root: {
              borderRadius: 4,
              backgroundColor: '#5b5fc7',
              width: '100%',
              height: 36
            },
            rootHovered: {
              backgroundColor: '#106EBE'
            }
          }}
        />
      </div>
    </div>
  );
};

export default MeetingDialog;