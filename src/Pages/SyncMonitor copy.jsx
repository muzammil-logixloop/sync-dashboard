import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

function SyncMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({ device: "", status: "", date: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/logs");
      setLogs(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching sync logs:", err);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerManualSync = async (deviceId) => {
    try {
      await axios.post(`/api/sync/manual`, { deviceId });
      alert("Manual sync triggered for device: " + deviceId);
      fetchLogs();
    } catch (err) {
      console.error("Error triggering manual sync:", err);
      alert("Failed to trigger sync.");
    }
  };

  const toggleDetails = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const filteredLogs = logs.filter((log) => {
    return (
      (!filter.device || log.device_id.includes(filter.device)) &&
      (!filter.status || log.direction === filter.status) &&
      (!filter.date || log.synced_at.startsWith(filter.date))
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-lime-700 mb-6">🛰️ Sync & Data Monitor</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 bg-lime-100/40 p-4 rounded-lg shadow-sm backdrop-blur-md border border-lime-200">
        <input
          type="text"
          placeholder="Device ID"
          value={filter.device}
          onChange={(e) => setFilter({ ...filter, device: e.target.value })}
          className="border border-lime-300 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border border-lime-300 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-lime-400"
        >
          <option value="">All Directions</option>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
        </select>
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          className="border border-lime-300 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <button
          onClick={fetchLogs}
          className="px-5 py-2 text-white bg-lime-600 rounded-md shadow hover:bg-lime-700 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm rounded-md">
            <thead className="bg-lime-200 text-lime-900">
              <tr>
                <th className="p-3 text-left">Device ID</th>
                <th className="p-3 text-left">Direction</th>
                <th className="p-3 text-left">Table</th>
                <th className="p-3 text-left">Records</th>
                <th className="p-3 text-left">Last Sync</th>
                {/* <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Errors</th> */}
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr className="border-t hover:bg-lime-50 transition">
                    <td className="p-3">{log.device_id}</td>
                    <td className="p-3 capitalize">{log.direction}</td>
                    <td className="p-3">{log.table_name}</td>
                    <td className="p-3">{log.record_ids?.length || 0}</td>
                    <td className="p-3">
                      {new Date(log.synced_at).toLocaleString()}
                    </td>
                    {/* <td className="p-3">{log.duration || "N/A"} ms</td>
                    <td className="p-3 text-red-600">{log.error_count || 0}</td> */}
                    <td className="p-3 flex gap-2">
                      {/* <button
                        onClick={() => triggerManualSync(log.device_id)}
                        className="px-3 py-1 text-sm border border-lime-400 text-lime-700 rounded hover:bg-lime-100 transition"
                      >
                        🔁 Sync
                      </button> */}
                      <button
                        onClick={() => toggleDetails(log.id)}
                        className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                      >
                        🔍 Details
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Detail Row */}
                  {expandedLogId === log.id && (
                    <tr className="bg-lime-50 border-t">
                      <td colSpan="8" className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-gray-800 text-sm">
                          <div>
                            <strong>🕒 Synced At:</strong>{" "}
                            {new Date(log.synced_at).toLocaleString()}
                          </div>
                          {/* <div>
                            <strong>⏱ Duration:</strong>{" "}
                            {log.duration ? `${log.duration} ms` : "N/A"}
                          </div> */}
                          {/* <div>
                            <strong>⚠️ Error Log:</strong>{" "}
                            {log.error_message || "None"}
                          </div> */}
                          <div>
                            <strong>📦 Records:</strong>{" "}
                            {log.record_ids?.join(", ") || "None"}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default SyncMonitor;
