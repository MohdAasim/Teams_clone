import { ServiceBell20Regular } from '@fluentui/react-icons';

const NoActivity = () => {
  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Empty state content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <ServiceBell20Regular
              style={{ fontSize: "48px", color: "#5b5fc7" }}
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Stay up to date</h2>
          <p className="text-gray-600">
            We'll notify you about @mentions, reactions, and other activity
            related to you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoActivity