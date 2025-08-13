import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const DeviceLogViewer = () => {
  const { deviceName } = useParams(); // dynamically get device name from route

  const [filters, setFilters] = useState({
    search: '',
    logType: '',
    severity: '',
    pickDate: ''
  });

  const deviceInfo = {
    name: deviceName || 'Unknown Device',
    tenant: 'Sweet Bakes',
    status: 'Online',
    lastSeen: '14 Jul, 10:05 AM',
    erpType: 'SAP',
    lastSync: '12 July, 10:05am'
  };

  const logEntries = [
    {
      time: '10:05:12',
      type: 'Sync Start',
      severity: 'Success',
      message: 'Sync started for transactions',
      details: '{ "payload": { ... } }',
      severityColor: 'bg-green-100 text-green-800'
    },
    {
      time: '10:05:15',
      type: 'ERP Payload',
      severity: 'Error',
      message: 'Token near expiry',
      details: '{ "payload": { ... } }',
      severityColor: 'bg-red-100 text-red-800'
    },
    {
      time: '10:05:17',
      type: 'ERP Response',
      severity: 'Warning',
      message: 'ERP_AUTH_EXPIRED',
      details: '{ "payload": { ... } }',
      severityColor: 'bg-yellow-100 text-yellow-800'
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

  const getSeverityBadge = (severity, colorClass) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      {severity}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Device Log Viewer</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search log by text or error code"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <FilterDropdown 
            label="Log type" 
            value={filters.logType}
            onChange={(e) => setFilters({...filters, logType: e.target.value})}
            options={['Sync Start', 'ERP Payload', 'ERP Response', 'System']}
          />
          
          <FilterDropdown 
            label="Severity" 
            value={filters.severity}
            onChange={(e) => setFilters({...filters, severity: e.target.value})}
            options={['Success', 'Error', 'Warning', 'Info']}
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

      {/* Device Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{deviceInfo.name}</h2>
              <p className="text-gray-600">Tenant: {deviceInfo.tenant}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <ArrowPathIcon className="w-4 h-4" />
              <span>Sync Now</span>
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last Sync: {deviceInfo.lastSync}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-sm">
          <div>
            <span className="text-gray-600">Status:</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-600">{deviceInfo.status}</span>
            </div>
          </div>
          <div>
            <span className="text-gray-600">Last Seen:</span>
            <p className="font-medium mt-1">{deviceInfo.lastSeen}</p>
          </div>
          <div>
            <span className="text-gray-600">ERP Type:</span>
            <p className="font-medium mt-1">{deviceInfo.erpType}</p>
          </div>
          <div className="flex justify-end">
            <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-2 transition-colors">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>Download Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Time</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Type</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Severity</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Message</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Details</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logEntries.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{log.time}</td>
                  <td className="py-4 px-6 text-gray-600">{log.type}</td>
                  <td className="py-4 px-6">
                    {getSeverityBadge(log.severity, log.severityColor)}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{log.message}</td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">{log.details}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors">
                      <ClipboardDocumentIcon className="w-4 h-4" />
                      <span>Copy JSON</span>
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

export default DeviceLogViewer;
