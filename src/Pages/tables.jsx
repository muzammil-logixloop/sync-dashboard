import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTables = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get("/api/tables/");
      console.log("Tables response:", response.data);
      
      if (Array.isArray(response.data)) {
        setTables(response.data);
        if (response.data.length === 0) {
          setError("No tables available");
        }
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching tables:", err);
      setError("Failed to load tables");
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`/api/tables/${tableName}`);
      console.log("Table data response:", response.data);
      setRows(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching table data:", err);
      setError("Failed to load table data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleTableChange = (e) => {
    const table = e.target.value;
    setSelectedTable(table);
    setRows([]);

    if (table) {
      fetchTableData(table);
    }
  };

  const renderTableOptions = () => {
    if (!Array.isArray(tables) || tables.length === 0) {
      return <option value="">No tables available</option>;
    }

    return tables.map((table) => (
      <option key={table} value={table}>
        {table}
      </option>
    ));
  };

  const renderTableData = () => {
    if (rows.length === 0) {
      if (loading) return null;
      if (selectedTable && !error) {
        return (
          <div className="text-center py-8 text-gray-500">
            No data found for {selectedTable}
          </div>
        );
      }
      return null;
    }

    const columns = Object.keys(rows[0]);

    return (
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            {selectedTable} <span className="text-sm text-gray-500">({rows.length} rows)</span>
          </h2>
          <span className="text-sm text-gray-500">{columns.length} columns</span>
        </div>
        
        <div className="overflow-auto max-h-[600px] border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      {renderCellValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCellValue = (value) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">NULL</span>;
    }
    
    if (typeof value === "object") {
      return (
        <span className="text-xs text-gray-500">
          {JSON.stringify(value)}
        </span>
      );
    }
    
    return value.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Database Tables Viewer
          </h1>
          <p className="text-gray-600">Explore and manage your database tables</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <label htmlFor="table-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Table
              </label>
              <select
                id="table-select"
                value={selectedTable}
                onChange={handleTableChange}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
              >
                <option value="">Choose a table...</option>
                {renderTableOptions()}
              </select>
            </div>
            
            <button
              onClick={fetchTables}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 mt-4 sm:mt-6"
            >
              Refresh Tables
            </button>
          </div>
        </div>

        {/* Status Indicators */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        {/* Table Data */}
        {renderTableData()}
      </div>
    </div>
  );
};

export default Tables;