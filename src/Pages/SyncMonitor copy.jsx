import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

function SyncMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({ device: "", status: "", date: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

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

  const toggleDetails = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  // Apply filters
  const filteredLogs = logs.filter((log) => {
    return (
      (!filter.device || log.device_id.includes(filter.device)) &&
      (!filter.status || log.direction === filter.status) &&
      (!filter.date || log.synced_at.startsWith(filter.date))
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

  const handleRecordClick = (recordId, tableName) => {
    navigate(`/tables/${tableName}/${recordId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-lime-700 mb-6">
        🛰️ Sync & Data Monitor
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 bg-lime-100/40 p-4 rounded-lg shadow-sm border border-lime-200">
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
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="overflow-x-auto max-h-[600px] rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-lime-200 text-lime-900 sticky top-0 shadow-sm">
                <tr>
                  <th className="p-3 text-left">Device ID</th>
                  <th className="p-3 text-left">Direction</th>
                  <th className="p-3 text-left">Table</th>
                  <th className="p-3 text-left">Records</th>
                  <th className="p-3 text-left">Last Sync</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr className="border-t hover:bg-lime-50 transition">
                      <td className="p-3">{log.device_id}</td>
                      <td className="p-3 capitalize">{log.direction}</td>
                      <td className="p-3">{log.table_name}</td>
                      <td className="p-3">{log.record_ids?.length || 0}</td>
                      <td className="p-3">
                        {new Date(log.synced_at).toLocaleString()}
                      </td>
                      <td className="p-3">
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
                            <div>
                              <strong>📦 Records:</strong>{" "}
                              {log.record_ids?.length > 0
                                ? log.record_ids.map((rid, idx) => (
                                    <span
                                      key={idx}
                                      onClick={() =>
                                        handleRecordClick(rid, log.table_name)
                                      }
                                      className="cursor-pointer text-blue-600 underline hover:text-blue-800 mr-2"
                                    >
                                      {rid}
                                    </span>
                                  ))
                                : "None"}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {currentLogs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-500">
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-4 border-t bg-gray-50 rounded-b-lg">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirst + 1}-
              {Math.min(indexOfLast, filteredLogs.length)} of{" "}
              {filteredLogs.length} logs
            </span>

            <div className="flex items-center gap-2">
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 px-2 py-1 rounded text-sm focus:ring-lime-400 focus:border-lime-400"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                ◀
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SyncMonitor;
