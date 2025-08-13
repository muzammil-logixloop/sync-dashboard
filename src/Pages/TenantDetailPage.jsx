import React, { useState } from "react";

const tenant = {
  name: "Sweet Bakes",
  id: "com.sweetbakes.pos",
  status: "Active (until Aug 2025)",
  erp: "Sap / Shopify",
  lastSync: "12 July, 10:05am",
  online: 4,
  offline: 1,
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Glowing_Sunset.jpg/1200px-Glowing_Sunset.jpg", // Placeholder
};

const devices = [
  { name: "Tappy Device -01", status: "Online", lastSeen: "12 July, 10:05 am" },
  { name: "Tappy Device -02", status: "Offline", lastSeen: "12 July, 10:05 am" },
  { name: "Tappy Device -03", status: "Online", lastSeen: "12 July, 10:05 am" },
];

const TenantDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Devices");

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Tenants</h1>

      {/* Tenant Info Card */}
      <div className="flex justify-between items-center bg-gray-100 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <img
            src={tenant.logo}
            alt="Tenant Logo"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{tenant.name}</h2>
            <p className="text-sm text-gray-500">{tenant.id}</p>
            <div className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Status:</span> {tenant.status} &nbsp; | &nbsp;
              <span className="font-medium">ERP Type:</span> {tenant.erp} &nbsp; | &nbsp;
              <span className="font-medium">Connected devices:</span>
              <span className="inline-block w-2 h-2 bg-green-600 rounded-full mx-1"></span>
              {tenant.online}
              <span className="mx-1">/</span>
              <span className="inline-block w-2 h-2 bg-red-600 rounded-full mx-1"></span>
              {tenant.offline}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Last Sync:</span> {tenant.lastSync}
          </p>
          <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            🔄 Sync
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Status</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Date</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Sync Type</option>
        </select>
        <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium">
          Apply Filter
        </button>
        <button className="text-sm text-gray-500 underline ml-auto">reset filter</button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        {["Devices", "Sync History", "ERP Integration"].map((tab) => (
          <button
            key={tab}
            className={`mr-6 pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Devices Table */}
      {activeTab === "Devices" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 font-medium border-b">
                <th className="px-4 py-3">Device Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Seen</th>
                <th className="px-4 py-3">Logs</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{device.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        device.status === "Online"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {device.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{device.lastSeen}</td>
                  <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">
                    View logs →
                  </td>
                  <td className="px-4 py-3 text-lime-600 hover:underline cursor-pointer">
                    🔄 Sync
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {[1, 2, 3, "...", 4, 5, 6].map((pg, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              pg === 2 ? "bg-gray-800 text-white" : "text-gray-500 hover:text-black"
            }`}
          >
            {pg}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenantDetailPage;
