import React from 'react';
import useUserStore from '@/store/userStore';

const Dashboard = () => {
  const user = useUserStore(state => state.user);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Welcome back, {user.name || 'User'}! 🎉</h1>
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role || 'Standard User'}
        </p>
        <p>
          <strong>Apikey:</strong> {user.apiKey}
        </p>
        <p>{user.apiKeyCount}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
