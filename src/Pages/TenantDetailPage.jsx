import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

const TenantDetailPage = () => {
  const { teanut } = useParams(); // Tenant ID from route
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Devices");

  const tenant = {
    name: "Sweet Bakes",
    id: "com.sweetbakes.pos",
    status: "Active (until Aug 2025)",
    erp: "Sap / Shopify",
    lastSync: "12 July, 10:05am",
    online: 4,
    offline: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Glowing_Sunset.jpg/1200px-Glowing_Sunset.jpg",
  };

  // Fetch devices by tenant ID
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `/api/pairing/paired-devices/${teanut}`
        );
        if (response.data && response.data.pairedDevices) {
          // Flatten both main + paired devices into table rows
          const mappedDevices = response.data.pairedDevices.flatMap((d) => [
            {
              id: d.deviceId,
              name: d.deviceName,
              pairedWith: d.pairedWithDeviceName,
              pairedAt: d.pairedAt,
              status: "Online", // adjust logic if API gives status
              lastSeen: new Date(d.pairedAt).toLocaleString(),
            },
            {
              id: d.pairedWithDeviceId,
              name: d.pairedWithDeviceName,
              pairedWith: d.deviceName,
              pairedAt: d.pairedAt,
              status: "Online",
              lastSeen: new Date(d.pairedAt).toLocaleString(),
            },
          ]);
          setDevices(mappedDevices);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [teanut]);

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
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading devices...</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 font-medium border-b">
                  <th className="px-4 py-3">Device Name</th>
                  <th className="px-4 py-3">Device ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Seen</th>
                  <th className="px-4 py-3">Paired With</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr
                    key={device.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">{device.name}</td>
                    <td className="px-4 py-3 font-medium">{device.id}</td>
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
                    <td className="px-4 py-3">{device.pairedWith}</td>
                    <td className="px-4 py-3 text-lime-600 hover:underline cursor-pointer">
                      🔄 Sync
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default TenantDetailPage;
