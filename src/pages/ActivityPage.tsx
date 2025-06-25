const ActivityPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Activity</h1>
      <div className="mt-4">
        <p className="text-gray-600">Your recent activity and notifications will appear here.</p>
        <div className="mt-6 text-center text-sm text-gray-500">
          No recent activity to show
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;