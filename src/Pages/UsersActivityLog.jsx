import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  EyeIcon
} from '@heroicons/react/24/outline';

const UsersActivityLog = () => {
  const [filters, setFilters] = useState({
    search: '',
    user: '',
    actionType: '',
    dateRange: ''
  });

  const activityLogs = [
    {
      timeStamp: '19 Jul, 14:25',
      user: 'Sarah Ahmed',
      action: 'Triggered Sync',
      actionIcon: '🔄',
      target: 'Sweet Bakes',
      details: 'View Log'
    },
    {
      timeStamp: '18 Jul, 17:10',
      user: 'Bilal Qureshi',
      action: 'Edited ERP Config',
      actionIcon: '✏️',
      target: 'Coiffeur Pro',
      details: 'View Log'
    },
    {
      timeStamp: '17 Jul, 10:05',
      user: 'Sarah Ahmed',
      action: 'Viewed Device Log',
      actionIcon: '👁️',
      target: 'Tappy-22B1',
      details: 'View Log'
    },
    {
      timeStamp: '17 Jul, 10:05',
      user: 'Sarah Ahmed',
      action: 'Viewed Device Log',
      actionIcon: '👁️',
      target: 'Tappy-22B1',
      details: 'View Log'
    },
    {
      timeStamp: '17 Jul, 10:05',
      user: 'Sarah Ahmed',
      action: 'Viewed Device Log',
      actionIcon: '👁️',
      target: 'Tappy-22B1',
      details: 'View Log'
    }
  ];

  const FilterDropdown = ({ label, value, onChange, options = [] }) => (
    <div className="relative">
      <select 
        value={value}
        onChange={onChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Users Activity Log</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by username, action type, email..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <FilterDropdown 
            label="User" 
            value={filters.user}
            onChange={(e) => setFilters({...filters, user: e.target.value})}
            options={['Sarah Ahmed', 'Bilal Qureshi']}
          />
          
          <FilterDropdown 
            label="Action type" 
            value={filters.actionType}
            onChange={(e) => setFilters({...filters, actionType: e.target.value})}
            options={['Triggered Sync', 'Edited ERP Config', 'Viewed Device Log']}
          />
          
          <FilterDropdown 
            label="Date Range" 
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            options={['Today', 'Yesterday', 'Last 7 days', 'Last 30 days']}
          />
          
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Search
          </button>
          
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            reset filter
          </button>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Time Stamp</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Target</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activityLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{log.timeStamp}</td>
                  <td className="py-4 px-6 text-gray-600">{log.user}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{log.actionIcon}</span>
                      <span className="text-gray-600">{log.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{log.target}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors">
                      <EyeIcon className="w-4 h-4" />
                      <span>{log.details}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">01</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">02</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">03</button>
            <span className="px-3 py-1 text-sm text-gray-400">...</span>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">04</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">05</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">06</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersActivityLog;