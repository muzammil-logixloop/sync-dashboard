import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const ERPConfig = () => {
  const [isEditable, setIsEditable] = useState(true);
  const [apiKey, setApiKey] = useState('********');
  const [logs] = useState([
    { timestamp: '14 Jul, 10:05:17', endpoint: '/sync/products', method: 'POST', status: '200 OK / 401 Unauthorized', size: '48 KB' },
    { timestamp: '14 Jul, 10:05:17', endpoint: '/sync/products', method: 'POST', status: '200 OK / 401 Unauthorized', size: '48 KB' },
    { timestamp: '14 Jul, 10:05:17', endpoint: '/sync/products', method: 'POST', status: '200 OK / 401 Unauthorized', size: '48 KB' },
    { timestamp: '14 Jul, 10:05:17', endpoint: '/sync/products', method: 'POST', status: '200 OK / 401 Unauthorized', size: '48 KB' },
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">ERP Configuration View</h2>
      </div>

      {/* Tenant Card */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/60" alt="Sweet Bakes" className="w-14 h-14 rounded-full" />
          <div>
            <h3 className="font-semibold text-lg">Sweet Bakes</h3>
            <p className="text-sm text-gray-500">Tenant ID: com.sweetbakes.pos</p>
            <p className="text-sm text-green-600">Integration Status: Connected</p>
            <p className="text-sm">ERP Type: Sap / Shopify | ERP Adapter Version: Sap / Shopify</p>
          </div>
        </div>
        <div className="text-right">
          <button className="bg-lime-500 text-white px-4 py-2 rounded-md">Test live status</button>
          <p className="text-xs text-gray-400 mt-1">Last Sync: 12 July, 10:05am</p>
        </div>
      </div>

      {/* ERP Connection Configuration */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <h4 className="text-lg font-semibold">ERP connection Configuration</h4>
          <label className="flex items-center space-x-2">
            <span className="text-sm">Editable</span>
            <input
              type="checkbox"
              className="toggle"
              checked={isEditable}
              onChange={() => setIsEditable(!isEditable)}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input className="input-field" placeholder="Base URL" defaultValue="xyz" disabled={!isEditable} />
          <select className="input-field" disabled={!isEditable}>
            <option value="">Auth Method</option>
          </select>
          <input
            className="input-field"
            type="password"
            placeholder="API key / Token"
            value={apiKey}
            disabled={!isEditable}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <input className="input-field" placeholder="Client ID" defaultValue="xyz-123" disabled={!isEditable} />
          <input className="input-field" type="datetime-local" defaultValue="2025-07-18T15:00" disabled={!isEditable} />
          <input className="input-field" placeholder="Mapping Class / Adapter" defaultValue="SAPMappingAdapterV2" disabled={!isEditable} />
        </div>
        <div className="flex space-x-4">
          <button className="bg-lime-500 text-white px-4 py-2 rounded-md">Refresh token</button>
          <button className="border px-4 py-2 rounded-md">Test Authorization</button>
        </div>
      </div>

      {/* ERP Logs Preview */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">ERP Logs Preview</h4>
          <div className="flex items-center gap-2">
            <select className="input-field w-32 text-sm">
              <option>Status</option>
            </select>
            <input type="date" className="input-field text-sm" />
            <button className="bg-lime-500 text-white px-4 py-1.5 text-sm rounded-md">Apply Filter</button>
            <button className="text-blue-500 text-sm underline">reset filter</button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Timestamp</th>
                <th className="p-2 border">Endpoint</th>
                <th className="p-2 border">Method</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Payload Size</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border">{log.timestamp}</td>
                  <td className="p-2 border">{log.endpoint}</td>
                  <td className="p-2 border">{log.method}</td>
                  <td className="p-2 border">{log.status}</td>
                  <td className="p-2 border">{log.size}</td>
                  <td className="p-2 border text-blue-500 flex items-center gap-1 cursor-pointer"><FaEye /> View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            <button className="bg-lime-500 text-white px-4 py-2 rounded-md">Sync Test Payload</button>
            <button className="border px-4 py-2 rounded-md">Re authenticate</button>
          </div>
          <div className="text-sm text-gray-500">Page 02 of 06</div>
        </div>
      </div>

      {/* Help Center Floating Box */}
      <div className="fixed bottom-6 left-6 bg-white p-4 rounded-xl shadow-md w-64 border">
        <h5 className="font-bold mb-1">Help Center</h5>
        <p className="text-sm text-gray-600">Having trouble in learning? Please contact us for more questions.</p>
        <button className="mt-3 px-3 py-2 bg-black text-white text-sm rounded-md">Go To Help Center</button>
      </div>
    </div>
  );
};

export default ERPConfig;
