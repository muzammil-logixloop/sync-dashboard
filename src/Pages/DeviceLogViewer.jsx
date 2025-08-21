import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios"; // your axios instance

const DeviceLogs = () => {
  const { deviceId } = useParams(); // deviceId from route
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/devicelogs/${deviceId}`);
        console.log("DEVICE LOGS RESPONSE:", deviceId);
        setLogs(res.data);
      } catch (err) {
        setError("Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };

    if (deviceId) {
      fetchLogs();
    }
  }, [deviceId]);

  if (loading) return <p className="text-center p-4">Loading logs...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Device Logs (ID: {deviceId})</h2>
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Date/Time</th>
              <th className="border p-2 text-left">Screen</th>
              <th className="border p-2 text-left">Message</th>
              <th className="border p-2 text-left">Level</th>
              <th className="border p-2 text-left">Device Info</th>
              <th className="border p-2 text-left">Resolved</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.recordID} className="hover:bg-gray-50">
                <td className="border p-2">{log.recordID}</td>
                <td className="border p-2">{log.dateTime}</td>
                <td className="border p-2">{log.locationScreen}</td>
                <td className="border p-2">{log.logMessage}</td>
                <td className="border p-2">{log.logLevel}</td>
                <td className="border p-2 text-sm">{log.deviceInfo}</td>
                <td className="border p-2">
                  {log.isResolved ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceLogs;
