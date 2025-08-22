// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Tenants from "../Pages/Tenants";
import Devices from "../Pages/Devices"
import SyncMonitor from "../Pages/SyncMoniter";
import SyncMonitorc from "../Pages/SyncMonitor copy";
import Users from "../Pages/Users";
import Login from "../Pages/Login";
import TenantDetailPage from "../Pages/TenantDetailPage";
import ERPConfig from "../Pages/Erpconfiguration"
import SyncDetails from "../Pages/Syndetail";
import DeviceLogViewer from "../Pages/DeviceLogViewer";
import Tables from "../Pages/tables";


// Protected route wrapper
const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/devices/:teanut" element={<Devices />} />
        <Route path="/sync" element={<SyncMonitor />} />
        <Route path="/logs" element={<SyncMonitorc />} />
        <Route path="/erp" element={<ERPConfig />} />
        <Route path="/users" element={<Users />} />
        {/* <Route path="/tenant/:teanut" element={<TenantDetailPage />} /> */}
        <Route path="/sync-details/:tenant" element={<SyncDetails />} />
        <Route path="/devices/logs/:deviceId" element={<DeviceLogViewer/>} />  
        <Route path="/tables" element={<Tables/>} /> 
        <Route path="/tables/:tableName/:recordId" element={<Tables/>} />
        
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
