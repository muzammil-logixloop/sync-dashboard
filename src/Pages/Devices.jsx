import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  EyeIcon, 
  ArrowPathIcon, 
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Devices = () => {
  const [filters, setFilters] = useState({
    search: '',
    tenant: '',
    status: '',
    pickDate: ''
  });

  const devices = [
    {
      deviceName: 'Tappy-23B1',
      tenant: 'Sweet Bakes',
      status: 'Online',
      lastSeen: '12 July, 10:05 am',
      syncStatus: 'Synced',
      syncStatusColor: 'text-green-600'
    },
    {
      deviceName: 'Tappy-78A3',
      tenant: 'Café de Paris',
      status: 'Offline',
      lastSeen: '12 Jul, 4:32 PM',
      syncStatus: 'Failed',
      syncStatusColor: 'text-red-600'
    },
    {
      deviceName: 'Tappy-OPX1',
      tenant: 'Salon Xpress',
      status: 'Offline',
      lastSeen: '13 Jul, 8:55 AM',
      syncStatus: 'Pending',
      syncStatusColor: 'text-yellow-600'
    },
    {
      deviceName: 'Tappy-119C',
      tenant: 'Bread & Butter',
      status: 'Online',
      lastSeen: 'Today, 9:12 AM',
      syncStatus: 'Synced',
      syncStatusColor: 'text-green-600'
    },
    {
      deviceName: 'Tappy-55Z2',
      tenant: 'Deli Delight',
      status: 'Online',
      lastSeen: '14 Jul, 8:45 AM',
      syncStatus: 'Synced',
      syncStatusColor: 'text-green-600'
    }
  ];


  const navigate = useNavigate();
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
      Online: 'bg-green-100 text-green-800',
      Offline: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getSyncStatusIndicator = (status, colorClass) => {
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          status === 'Synced' ? 'bg-green-500' : 
          status === 'Failed' ? 'bg-red-500' : 
          'bg-yellow-500'
        }`}></div>
        <span className={`font-medium ${colorClass}`}>{status}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Devices</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Device ID or name"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <FilterDropdown 
            label="Tenant" 
            value={filters.tenant}
            onChange={(e) => setFilters({...filters, tenant: e.target.value})}
            options={['Sweet Bakes', 'Café de Paris', 'Salon Xpress', 'Bread & Butter', 'Deli Delight']}
          />
          
          <FilterDropdown 
            label="Status" 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            options={['Online', 'Offline']}
          />
          
          <FilterDropdown 
            label="Pick Date" 
            value={filters.pickDate}
            onChange={(e) => setFilters({...filters, pickDate: e.target.value})}
            options={['Today', 'Yesterday', 'Last 7 days', 'Last 30 days']}
          />
          
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Apply Filter
          </button>
          
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            reset filter
          </button>
        </div>
      </div>

      {/* Device Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Device Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Tenant</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Last Seen</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Sync Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {devices.map((device, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td onClick={() => navigate(`/devices/${device.deviceName}`)} className="py-4 px-6 font-medium text-gray-900 hover:underline cursor-pointer">{device.deviceName}</td>
                  <td className="py-4 px-6 text-gray-600">{device.tenant}</td>
                  <td className="py-4 px-6">{getStatusBadge(device.status)}</td>
                  <td className="py-4 px-6 text-gray-600">{device.lastSeen}</td>
                  <td className="py-4 px-6">
                    {getSyncStatusIndicator(device.syncStatus, device.syncStatusColor)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-500 hover:text-blue-700 transition-colors" title="View">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-500 hover:text-green-700 transition-colors" title="Sync">
                        <ArrowPathIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors" title="Settings">
                        <Cog6ToothIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-blue-500 hover:text-blue-700 transition-colors" title="User">
                        <UserIcon className="w-4 h-4" />
                      </button>
                    </div>
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

export default Devices;