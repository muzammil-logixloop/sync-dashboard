import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState("All");
  const [plan, setPlan] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tenantsPerPage = 5;

  const navigate = useNavigate();

  // Fetch tenants (plans) from API
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/plans"); // adjust API URL
        if (response.data && response.data.plans) {
          setTenants(response.data.plans);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const handleTenantClick = (teanut) => {
    navigate(`/tenant/${teanut}`);
  };

  // Filtered tenants
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.user_email.toLowerCase().includes(search.toLowerCase()) ||
      t.teanut.toLowerCase().includes(search.toLowerCase());

    const matchesSubscription =
      subscription === "All" || t.plan_type === subscription;

    const matchesPlan = plan === "All" || t.plan_id === plan;

    return matchesSearch && matchesSubscription && matchesPlan;
  });

  // Pagination logic
  const indexOfLast = currentPage * tenantsPerPage;
  const indexOfFirst = indexOfLast - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTenants.length / tenantsPerPage);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Tenants</h1>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Tenant name or ID"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="All">All Plans</option>
          <option value="single_device">Single Device</option>
          <option value="three_devices">Up to 3 Devices</option>
        </select>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
        >
          <option value="All">All Subscription Types</option>
          <option value="Single Device">Single Device</option>
          <option value="Up to 3 Devices">Up to 3 Devices</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Sync Health</option>
        </select>
        <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium">
          Apply Filter
        </button>
        <button
          className="text-sm text-gray-500 underline ml-auto"
          onClick={() => {
            setSearch("");
            setSubscription("All");
            setPlan("All");
          }}
        >
          reset filter
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-gray-500 font-medium">
                  <th className="px-4 py-2">Tenant Email</th>
                  <th className="px-4 py-2">Tenant ID</th>
                  <th className="px-4 py-2">Subscription</th>
                  <th className="px-4 py-2">Plan</th>
                  <th className="px-4 py-2">Purchase Date</th>
                  <th className="px-4 py-2">Devices Limit</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTenants.length > 0 ? (
                  currentTenants.map((tenant) => (
                    <tr
                      key={tenant.id}
                      className="bg-white shadow-sm rounded-lg cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => handleTenantClick(tenant.teanut)}
                    >
                      <td className="px-4 py-3 font-medium">
                        {tenant.user_email}
                      </td>
                      <td className="px-4 py-3">{tenant.teanut}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            tenant.plan_id === "three_devices"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {tenant.plan_type}
                        </span>
                      </td>
                      <td className="px-4 py-3">{tenant.plan_id}</td>
                      <td className="px-4 py-3">
                        {new Date(tenant.purchase_date).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{tenant.device_limit}</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline flex items-center gap-2">
                        <FaEye />
                        <span>View</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center text-gray-500 py-6"
                    >
                      No tenants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  pg === currentPage
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Tenants;
