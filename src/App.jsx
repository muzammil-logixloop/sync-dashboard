// src/App.jsx
import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar"; // Import your Sidebar component
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <main className={`${!isLoginPage ? "ml-64" : ""} flex-1 p-6 bg-gray-100 min-h-screen`}>
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
