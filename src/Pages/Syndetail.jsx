import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import TriggerManualSyncModal from './TriggerManualSyncModal';

const SyncDetails = () => {
  const { tenant } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('payload');
  const [showSyncModal, setShowSyncModal] = useState(false); // modal toggle

  const [filters, setFilters] = useState({
    search: '',
    tenant: '',
    device: '',
    syncType: '',
    status: '',
    dateRange: ''
  });

  const syncData = {
    name: tenant || 'Sweet Bakes',
    device: 'Tappy-23B1',
    syncType: 'Transactions',
    status: 'Success',
    timeStamp: '14 Jul, 10:05 am',
    duration: '1.32 seconds',
    errorCount: '0 / 3 / 5',
    lastSync: '12 July, 10:05am'
  };

  const payloadData = {
    timestamp: "2023-04-21T15:30:00Z",
    transactions: {
      id: "1",
      amount: 2500,
      customer_id: "C001"
    }
  };

  const logTimeline = [
    { time: '10:05:12', title: 'Sync Initiated', status: 'success', icon: '✓' },
    { time: '10:05:13', title: 'Payload sent', subtitle: '87 transactions', status: 'success', icon: '✓' },
    { time: '10:05:14', title: 'ERP Response', subtitle: 'Token Expired', status: 'error', icon: '✗' },
    { time: '10:05:15', title: 'Retry Payment', subtitle: 'Retry failed - timeout', status: 'warning', icon: '!' }
  ];

  const handleManualSync = () => {
    // Add sync API logic here
    console.log('Manual sync triggered');
  };

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
      {/* Header with back button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Sync Monitor
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sync Details</h1>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by error message or ID"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <FilterDropdown
            label="Tenant"
            value={filters.tenant}
            onChange={(e) => setFilters({ ...filters, tenant: e.target.value })}
            options={['Sweet Bakes', 'Salon Xpress', 'Bread & Butter']}
          />

          <FilterDropdown
            label="Device"
            value={filters.device}
            onChange={(e) => setFilters({ ...filters, device: e.target.value })}
            options={['Tappy-23B1', 'Tappy-55Z2', 'Tappy-01']}
          />

          <FilterDropdown
            label="Sync Type"
            value={filters.syncType}
            onChange={(e) => setFilters({ ...filters, syncType: e.target.value })}
            options={['Transactions', 'Products', 'Customers', 'Orders']}
          />

          <FilterDropdown
            label="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={['Success', 'Error', 'Warning']}
          />

          <FilterDropdown
            label="Date Range"
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Sync Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sync Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {syncData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{syncData.name}</h2>
                  <p className="text-gray-600">Device: {syncData.device}</p>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => setShowSyncModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium mb-2 transition-colors flex items-center space-x-2"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  <span>Sync</span>
                </button>
                <p className="text-sm text-gray-600">Last Sync: {syncData.lastSync}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Sync Type:</span>
                <p className="font-medium">{syncData.syncType}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-600">{syncData.status}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-600">Time Stamp:</span>
                <p className="font-medium">{syncData.timeStamp}</p>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <p className="font-medium">{syncData.duration}</p>
              </div>
              <div>
                <span className="text-gray-600">Error Count:</span>
                <p className="font-medium">{syncData.errorCount}</p>
              </div>
            </div>
          </div>

          {/* Payload/Response Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('payload')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'payload'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Payload
                </button>
                <button
                  onClick={() => setActiveTab('response')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'response'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Response
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'payload' && (
                <div className="relative">
                  <button className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium transition-colors">
                    Copy JSON
                  </button>
                  <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{JSON.stringify(payloadData, null, 2)}</code>
                  </pre>
                </div>
              )}
              {activeTab === 'response' && (
                <div className="text-gray-500 text-center py-8">
                  <p>Response data would be displayed here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Log Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Log Timeline</h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
              <ArrowPathIcon className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="space-y-4">
            {logTimeline.map((log, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    log.status === 'success'
                      ? 'bg-green-500'
                      : log.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                  }`}
                >
                  {log.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{log.title}</p>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                  {log.subtitle && <p className="text-sm text-gray-600">{log.subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <TriggerManualSyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        onConfirm={handleManualSync}
      />
    </div>
  );
};

export default SyncDetails;
