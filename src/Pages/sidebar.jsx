import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaTachometerAlt,
  FaBuilding,
  FaTabletAlt,
  FaSync,
  FaProjectDiagram,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { label: "Dashboard", to: "/", icon: <FaTachometerAlt /> },
  { label: "Tenets", to: "/tenants", icon: <FaBuilding /> },
  { label: "Devices", to: "/devices", icon: <FaTabletAlt /> },
  //{ label: "Sync Monitors", to: "/sync", icon: <FaSync /> },
  { label: "Sync logs", to: "/logs", icon: <FaSync /> },
  { label: "ERP Integration", to: "/erp", icon: <FaProjectDiagram /> },
  { label: "Manage Users", to: "/users", icon: <FaUsers /> },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between shadow-md border-r border-gray-100">
      {/* Brand Section */}
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <img src={logo} alt="Tappy Logo" className="h-15 w-15 object-contain" />
          <span className="text-xl font-bold text-black tracking-tight">Tappy</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-4 mt-4">
          {navItems.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 mb-2 rounded-lg font-large text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-lime-400 text-black font-semibold shadow"
                    : "text-gray-400 hover:text-gray-600"
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Sectidson */}
      <div className="p-4 space-y-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>

       
        {/* <div className="relative p-4 bg-[#0D0D2B] rounded-xl text-white shadow-md">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
            <span className="text-black text-xl font-bold">?</span>
          </div>
          <h2 className="text-sm font-semibold text-center mt-6">Help Center</h2>
          <p className="text-xs text-center mt-1 leading-snug">
            Having Trouble in Learning? <br />
            Please contact us for more questions.
          </p>
          <button className="mt-4 w-full py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-all">
            Go To Help Center
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
