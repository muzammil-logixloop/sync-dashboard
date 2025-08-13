import React from 'react';
import { RefreshCw } from 'lucide-react';
import CircularProgress from './CircularProgress';

const HealthStatusView = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Tenant Sync Health */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Tenant Sync Health</h3>
            <button className="flex items-center space-x-1 text-lime-600 hover:text-lime-700">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">% of successful syncs in the last 24 hours</p>
          
          <div className="flex items-center justify-center mb-6">
            <CircularProgress percentage={95} />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Tenant failing frequently</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tenant</span>
                <span className="text-sm">Status</span>
                <span className="text-sm">Last Error</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-sm">Acme Corp</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Failing</span>
                </div>
                <span className="text-sm">7</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-sm">Beta Inc</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Warning</span>
                </div>
                <span className="text-sm">3</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-sm">Delta Global</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Healthy</span>
                </div>
                <span className="text-sm">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Average Sync Time */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Average Sync time</h3>
            <button className="flex items-center space-x-1 text-lime-600 hover:text-lime-700">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">Overall sync: 3.8s (last 24 hours)</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Tenant A</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <span className="text-sm">4.3s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tenant B</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <span className="text-sm">3.1s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tenant C</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <span className="text-sm">5.0s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tenant D</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <span className="text-sm">1.8s</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Ideal &lt; 4s</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Warning &lt; 4s</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Slow &gt; 6s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Device Connectivity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Device Connectivity</h3>
            <button className="flex items-center space-x-1 text-lime-600 hover:text-lime-700">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Online</span>
                <span className="text-sm text-gray-600">128 devices</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Offline</span>
                <span className="text-sm text-gray-600">56 devices</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-3">Recently disconnected devices (last seen timestamp)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Device 1</span>
                <span className="text-sm text-red-600">13:45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Device 2</span>
                <span className="text-sm text-red-600">11:20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Device 3</span>
                <span className="text-sm text-red-600">09:15</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Average Up-time</span>
                <span className="text-sm text-gray-600">96.3%</span>
              </div>
              <div className="relative h-16 bg-gray-100 rounded">
                <svg className="w-full h-full" viewBox="0 0 200 64">
                  <polyline
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="2"
                    points="0,32 20,28 40,24 60,20 80,16 100,20 120,24 140,28 160,32 180,36 200,40"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ERP Integration Health */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">ERP Integration Health</h3>
            <button className="flex items-center space-x-1 text-lime-600 hover:text-lime-700">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">ERP connection status per tenant</p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tenant</span>
              <span className="text-sm font-medium">Adapter Error</span>
              <span className="text-sm font-medium">Status</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-sm">Acme Corp</span>
              <span className="text-sm">--</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-sm">Beta Inc</span>
              <span className="text-sm">Token expired</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                Sync Error
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-sm">Delta Global</span>
              <span className="text-sm">Sync Error</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Token Expired
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStatusView;