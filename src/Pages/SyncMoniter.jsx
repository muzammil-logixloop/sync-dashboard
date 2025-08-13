import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, MagnifyingGlassIcon, EyeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const SyncMonitor = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    tenant: '',
    device: '',
    syncType: '',
    status: '',
    dateRange: ''
  });

  const stats = [
    {
      title: 'Total Syncs (24h)',
      value: '432',
      bgColor: 'bg-gray-800',
      iconBg: 'bg-purple-100',
      icon: '💻'
    },
    {
      title: 'Failed Syncs',
      value: '38',
      bgColor: 'bg-white',
      iconBg: 'bg-red-100',
      icon: '🎯'
    },
    {
      title: 'Average Duration',
      value: '1.8s',
      bgColor: 'bg-white',
      iconBg: 'bg-purple-100',
      icon: '📊'
    },
    {
      title: 'Affected tenants',
      value: '7',
      bgColor: 'bg-white',
      iconBg: 'bg-yellow-100',
      icon: 'ℹ️'
    }
  ];

  const syncData = [
    {
      tenant: 'Sweet Bakes',
      device: 'Tappy-23B1',
      syncType: 'Products',
      time: '10:05 AM',
      status: 'Success',
      errorCount: 0
    },
    {
      tenant: 'Salon Xpress',
      device: 'Tappy-55Z2',
      syncType: 'Transactions',
      time: '9:55 AM',
      status: 'Error',
      errorCount: 1
    },
    {
      tenant: 'Bread & Butter',
      device: 'Tappy-01',
      syncType: 'Customers',
      time: '9:48 AM',
      status: 'Warning',
      errorCount: 2
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

  const getStatusBadge = (status) => {
    const styles = {
      Success: 'bg-green-100 text-green-800',
      Error: 'bg-red-100 text-red-800',
      Warning: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const handleTenantClick = (tenant) => {
    navigate(`/sync-details/${encodeURIComponent(tenant)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sync Status Overview</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by error message or ID"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <FilterDropdown 
            label="Tenant" 
            value={filters.tenant}
            onChange={(e) => setFilters({...filters, tenant: e.target.value})}
            options={['Sweet Bakes', 'Salon Xpress', 'Bread & Butter']}
          />
          
          <FilterDropdown 
            label="Device" 
            value={filters.device}
            onChange={(e) => setFilters({...filters, device: e.target.value})}
            options={['Tappy-23B1', 'Tappy-55Z2', 'Tappy-01']}
          />
          
          <FilterDropdown 
            label="Sync Type" 
            value={filters.syncType}
            onChange={(e) => setFilters({...filters, syncType: e.target.value})}
            options={['Transactions', 'Products', 'Customers', 'Orders']}
          />
          
          <FilterDropdown 
            label="Status" 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            options={['Success', 'Error', 'Warning']}
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-6 rounded-lg shadow-sm border ${stat.bgColor === 'bg-gray-800' ? 'text-white' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stat.bgColor === 'bg-gray-800' ? 'text-gray-300' : 'text-gray-600'}`}>{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Tenant</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Device</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Sync Type</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Time</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Error Count</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {syncData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td 
                    className="py-4 px-6 font-medium text-gray-900 hover:text-green-600 cursor-pointer transition-colors hover-underline"
                    onClick={() => handleTenantClick(row.tenant)}
                  >
                    {row.tenant}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{row.device}</td>
                  <td className="py-4 px-6 text-gray-600">{row.syncType}</td>
                  <td className="py-4 px-6 text-gray-600">{row.time}</td>
                  <td className="py-4 px-6">{getStatusBadge(row.status)}</td>
                  <td className="py-4 px-6 text-gray-600">{row.errorCount}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-500 hover:text-blue-700 transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-500 hover:text-green-700 transition-colors">
                        <ArrowPathIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SyncMonitor;