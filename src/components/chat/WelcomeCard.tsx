import { DefaultButton } from '@fluentui/react';

interface WelcomeCardProps {
  userName: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-2xl font-semibold mb-2">Welcome, {userName}</h2>
      <p className="text-gray-600 mb-8">
        Here are some things to get you going.
      </p>

      <div className="flex space-x-32 mb-12">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-6">
            <img
              src="https://statics.teams.cdn.live.net/evergreen-assets/illustrations/webp/256/chat-l-standard-256x256.webp"
              alt="Chat"
              className="w-full h-full"
            />
          </div>
          <p className="max-w-[250px] text-gray-600 mb-6">
            Send instant messages, share files, and more over chat.
          </p>
          <DefaultButton
            text="New chat"
            styles={{
              root: {
                borderRadius: "4px",
                padding: "6px 16px",
                minWidth: "100px",
                borderColor: "#d1d1d1",
              },
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-6">
            <img
              src="https://statics.teams.cdn.live.net/evergreen-assets/illustrations/webp/256/meet-l-standard-256x256.webp"
              alt="Meet"
              className="w-full h-full"
            />
          </div>
          <p className="max-w-[250px] text-gray-600 mb-6">
            Skip the calendar and create an instant meeting with just a click.
          </p>
          <DefaultButton
            text="Meet now"
            styles={{
              root: {
                borderRadius: "4px",
                padding: "6px 16px",
                minWidth: "100px",
                borderColor: "#d1d1d1",
              },
            }}
          />
        </div>
      </div>

      <p className="text-gray-600 mt-8">
        Stay connected across all your devices by downloading the{" "}
        <a href="#" className="text-[#5b5fc7]">
          Teams mobile app
        </a>
        .
      </p>
    </div>
  );
};

export default WelcomeCard;