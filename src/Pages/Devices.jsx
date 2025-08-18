import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  EyeIcon, 
  ArrowPathIcon, 
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/react/24/outline';
// import { useNavigate } from 'react-router-dom'; // Uncomment when integrating with router

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    tenant: '',
    status: '',
    pickDate: ''
  });

  // Fetch devices from API using axios
  const fetchDevices = async () => {
    try {
      setLoading(true);
      
      // Replace with your actual API endpoint
      const response = await axios.get('/api/pairing/pair');
      const apiData = response.data;
      
      
      const dataToUse = apiData; 

      // Transform API data to match component structure with placeholders
      const transformedDevices = dataToUse.map(device => ({
        deviceId: device.device_id,
        deviceName: device.device_name,
        tenantId: device.tenant_id,
        tenant: device.tenant_id,
        status: 'Online', // Placeholder - replace with actual data
        lastSeen: '12 July, 10:05 am', // Placeholder - replace with actual data
        syncStatus: 'Synced', // Placeholder - replace with actual data
        syncStatusColor: 'text-green-600' // Placeholder - replace with actual data
      }));

      setDevices(transformedDevices);
      setFilteredDevices(transformedDevices);
    } catch (err) {
      setError('Failed to fetch devices');
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

 

  // Filter devices based on current filters
  useEffect(() => {
    let filtered = devices;

    if (filters.search) {
      filtered = filtered.filter(device => 
        device.deviceName.toLowerCase().includes(filters.search.toLowerCase()) ||
        device.deviceId.toLowerCase().includes(filters.search.toLowerCase()) ||
        device.tenant.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.tenant) {
      filtered = filtered.filter(device => device.tenant === filters.tenant);
    }

    if (filters.status) {
      filtered = filtered.filter(device => device.status === filters.status);
    }

    setFilteredDevices(filtered);
  }, [filters, devices]);

  // Fetch devices on component mount
  useEffect(() => {
    fetchDevices();
  }, []);

  // const navigate = useNavigate(); // Remove this line when integrating with router

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

  const handleApplyFilter = () => {
    // Filter logic is already handled by useEffect
    console.log('Filters applied:', filters);
  };

  const handleResetFilter = () => {
    setFilters({
      search: '',
      tenant: '',
      status: '',
      pickDate: ''
    });
  };

  const handleRefresh = () => {
    fetchDevices();
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800">{error}</div>
          <button 
            onClick={handleRefresh}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Devices</h1>
          <button 
            onClick={handleRefresh}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Device ID or name or Tenant"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          {/* <FilterDropdown 
            label="Tenant" 
            value={filters.tenant}
            onChange={(e) => setFilters({...filters, tenant: e.target.value})}
            options={['Sweet Bakes', 'Café de Paris', 'Salon Xpress', 'Bread & Butter', 'Deli Delight']}
          /> */}
          
          <FilterDropdown 
            label="Status" 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            options={['Online', 'Offline']}
          />
          
          {/* <FilterDropdown 
            label="Pick Date" 
            value={filters.pickDate}
            onChange={(e) => setFilters({...filters, pickDate: e.target.value})}
            options={['Today', 'Yesterday', 'Last 7 days', 'Last 30 days']}
          /> */}
          
          {/* <button 
            onClick={handleApplyFilter}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Apply Filter
          </button> */}
          
          <button 
            onClick={handleResetFilter}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            reset filter
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredDevices.length} of {devices.length} devices
        </p>
      </div>

      {/* Device Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Device Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Device ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Tenant</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Last Seen</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Sync Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 px-6 text-center text-gray-500">
                    No devices found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredDevices.map((device, index) => (
                  <tr key={device.deviceId} className="hover:bg-gray-50 transition-colors">
                    <td 
                      onClick={() => console.log('Navigate to device:', device.deviceName)} // Replace with actual navigation
                      className="py-4 px-6 font-medium text-gray-900 hover:underline cursor-pointer"
                    >
                      {device.deviceName}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{device.deviceId}</td>
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
                        
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination - You can make this dynamic too based on your API pagination */}
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