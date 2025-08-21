import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from "react-router-dom";
import axios from '../utils/axios';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  EyeIcon, 
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // show 10 devices per page

  const { teanut } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: teanut || '',
    tenant: '',
    status: '',
    pickDate: ''
  });

  const handleView = (deviceId) => {
    navigate(`/devices/logs/${deviceId}`);
  };

  const handlesync = async (deviceId) => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);

    console.log("Sync queued for", deviceId);

    try {
      const res = await axios.post("/api/mannual_sync", { deviceId });
      console.log("✅ Sync response:", res.data);
    } catch (err) {
      console.error("❌ Sync failed:", err);
    }
  };

  // Fetch devices from API
  const fetchDevices = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/api/devices');
      const apiData = response.data.devices || [];

      const transformedDevices = apiData.map(device => {
        const lastSeenDate = new Date(device.updated_at);
        const now = new Date();
        const diffMinutes = (now - lastSeenDate) / (1000 * 60);
        const isOnline = diffMinutes <= 30;

        return {
          deviceId: device.deviceid,
          deviceName: device.devicename || 'Unnamed Device',
          tenantId: device.tenantid,
          tenant: device.tenantid,
          status: isOnline ? 'Online' : 'Offline',
          lastSeen: lastSeenDate.toLocaleString(),
          syncStatus: isOnline ? 'Synced' : 'Not Synced',
          syncStatusColor: isOnline ? 'text-green-600' : 'text-red-600'
        };
      });

      setDevices(transformedDevices);
      setFilteredDevices(transformedDevices);
    } catch (err) {
      setError('Failed to fetch devices');
      console.error('❌ Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
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
    setCurrentPage(1); // reset to first page when filter changes
  }, [filters, devices]);

  useEffect(() => {
    fetchDevices();
  }, []);

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

  const getSyncStatusIndicator = (status, colorClass) => (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        status === 'Synced' ? 'bg-green-500' : 
        status === 'Failed' ? 'bg-red-500' : 
        'bg-yellow-500'
      }`}></div>
      <span className={`font-medium ${colorClass}`}>{status}</span>
    </div>
  );

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

  // Pagination logic
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          
          <FilterDropdown 
            label="Status" 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            options={['Online', 'Offline']}
          />
          
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
          Showing {paginatedDevices.length} of {filteredDevices.length} filtered devices ({devices.length} total)
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
              {paginatedDevices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 px-6 text-center text-gray-500">
                    No devices found matching your criteria
                  </td>
                </tr>
              ) : (
                paginatedDevices.map((device) => (
                  <tr key={device.deviceId} className="hover:bg-gray-50 transition-colors">
                    <td 
                      onClick={() => console.log('Navigate to device:', device.deviceName)}
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
                      <div className="flex space-x-2 relative">
                        <button
                          onClick={() => handleView(device.deviceId)}
                          className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                          title="View"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>

                        <button
                          className="p-1 text-green-500 hover:text-green-700 transition-colors"
                          onClick={() => handlesync(device.deviceId)}
                          title="Sync"
                        >
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
        
        {/* Real Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            ✅ Sync Queued For this device
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
