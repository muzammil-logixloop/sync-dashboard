import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios"; // your axios instance

const DeviceLogs = () => {
  const { deviceId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters & Search
  const [search, setSearch] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [resolved, setResolved] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/devicelogs/${deviceId}`);
        setLogs(res.data || []);
      } catch (err) {
        setError("Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };

    if (deviceId) fetchLogs();
  }, [deviceId]);

  // Filtering & Searching
  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) =>
        search
          ? log.logMessage?.toLowerCase().includes(search.toLowerCase()) ||
            log.locationScreen?.toLowerCase().includes(search.toLowerCase()) ||
            log.logLevel?.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((log) => (logLevel ? log.logLevel === logLevel : true))
      .filter((log) =>
        resolved === ""
          ? true
          : resolved === "true"
          ? log.isResolved
          : !log.isResolved
      );
  }, [logs, search, logLevel, resolved]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  if (loading)
    return <p className="text-center p-6 text-gray-600">Loading logs...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Device Logs (ID: {deviceId})
        </h2>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search logs by screen and message....."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 flex-1 min-w-[250px] focus:ring-2 focus:ring-green-500"
        />

        <select
          value={logLevel}
          onChange={(e) => {
            setLogLevel(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>

        {/* <select
          value={resolved}
          onChange={(e) => {
            setResolved(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          <option value="true">Resolved</option>
          <option value="false">Unresolved</option>
        </select> */}
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Date/Time</th>
              <th className="border p-3 text-left">Screen</th>
              <th className="border p-3 text-left">Message</th>
              <th className="border p-3 text-left">Level</th>
              <th className="border p-3 text-left">Device Info</th>
              {/* <th className="border p-3 text-left">Resolved</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No logs found
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log, i) => (
                <tr
                  key={log.recordID}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border p-2">
                    {(currentPage - 1) * logsPerPage + i + 1}
                  </td>
                  <td className="border p-2">{log.dateTime}</td>
                  <td className="border p-2">{log.locationScreen}</td>
                  <td className="border p-2">{log.logMessage}</td>
                  <td className="border p-2 font-semibold">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        log.logLevel === "ERROR"
                          ? "bg-red-100 text-red-700"
                          : log.logLevel === "WARN"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {log.logLevel}
                    </span>
                  </td>
                  <td className="border p-2 text-sm">{log.deviceInfo}</td>
                  {/* <td className="border p-2 text-center">
                    {log.isResolved ? "✅" : "❌"}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceLogs;
