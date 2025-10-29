"use client"
export default function AccessDenied() {

  const handleLogout = () => {
    window.location.href = "/logout"
  };

  const goHome = () => {
    window.location.href = "/"
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">No access</h1>
        <p className="mb-6">You don't have access to this page yet</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
          >
            Logout
          </button>
          <button
            onClick={goHome}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
};
