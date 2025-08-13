import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const tenants = [
  {
    id: 1,
    name: "Sweet Bakes",
    tenantId: "12345",
    subscription: "Active",
    erp: "SAP",
    lastSync: "12 July, 10:05 am",
    onlineDevices: 4,
    offlineDevices: 1,
  },
  // ... other tenants (same structure)
];

const Tenants = () => {
  const navigate = useNavigate();

  const handleTenantClick = (tenantId) => {
    navigate(`/tenant/${tenantId}`);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Tenants</h1>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Tenant name or ID"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>All ERP Types</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Subscription type</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Sync Health</option>
        </select>
        <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium">
          Apply Filter
        </button>
        <button className="text-sm text-gray-500 underline ml-auto">
          reset filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-500 font-medium">
              <th className="px-4 py-2">Tenant name</th>
              <th className="px-4 py-2">Tenant ID</th>
              <th className="px-4 py-2">Subscription</th>
              <th className="px-4 py-2">ERP</th>
              <th className="px-4 py-2">Last Sync</th>
              <th className="px-4 py-2">Devices</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr
                key={tenant.id}
                className="bg-white shadow-sm rounded-lg cursor-pointer hover:bg-gray-50 transition"
                onClick={() => handleTenantClick(tenant.tenantId)}
              >
                <td className="px-4 py-3 font-medium">{tenant.name}</td>
                <td className="px-4 py-3">{tenant.tenantId}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tenant.subscription === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tenant.subscription}
                  </span>
                </td>
                <td className="px-4 py-3">{tenant.erp}</td>
                <td className="px-4 py-3">{tenant.lastSync}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>
                  {tenant.onlineDevices}
                  <span className="text-gray-400">/</span>
                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                  {tenant.offlineDevices}
                </td>
                <td className="px-4 py-3 text-blue-600 hover:underline flex items-center gap-2">
                  <FaEye />
                  <span>View</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {[1, 2, 3, "...", 4, 5, 6].map((pg, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              pg === 2
                ? "bg-gray-800 text-white"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {pg}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tenants;
