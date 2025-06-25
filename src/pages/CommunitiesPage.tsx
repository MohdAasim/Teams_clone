const CommunitiesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Communities</h1>
      <div className="mt-4">
        <p className="text-gray-600">Connect with your teams and channels.</p>
        <div className="mt-8 flex justify-center">
          <button className="bg-[#5b5fc7] text-white px-4 py-2 rounded">
            Join or create team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage;