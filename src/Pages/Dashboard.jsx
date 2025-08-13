import React from 'react';
import { Bell, User, ChevronLeft, ChevronRight, RefreshCw, Cloud, GitBranch, Play } from 'lucide-react';
import StatsCard from '../Components/StatsCard';
import RecentActivity from '../Components/RecentActivity';
import HealthStatusView from '../Components/HealthStatusView';

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-400" />
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Tenants"
            value="32"
            icon={<Cloud className="h-8 w-8 text-white" />}
            iconBg="bg-purple-500"
            cardBg="bg-gray-800"
            textColor="text-white"
          />
          <StatsCard
            title="Devices"
            value="78"
            icon={<GitBranch className="h-8 w-8 text-purple-500" />}
            iconBg="bg-purple-100"
            cardBg="bg-white"
            textColor="text-gray-800"
          />
          <StatsCard
            title="ERP Integrations"
            subtitle="Active"
            value="6"
            secondaryValue="8"
            secondaryLabel="Inactive"
            icon={<Play className="h-8 w-8 text-purple-500" />}
            iconBg="bg-purple-100"
            cardBg="bg-white"
            textColor="text-gray-800"
          />
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <div className="flex items-center space-x-2">
              <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          <RecentActivity />
        </div>

        {/* Health Status View */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Health Status View</h2>
          <HealthStatusView />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;