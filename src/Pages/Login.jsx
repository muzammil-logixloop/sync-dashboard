import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios"; // using your axios instance
import dashboardImg from "../assets/bg.png"; // put your left-side image here
import logo from "../assets/logo2.png"; // replace with your logo path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Image Section */}
      <div className="hidden lg:flex w-1/2 bg-gray-50">
        <img
          src={dashboardImg}
          alt="Dashboard Preview"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Login Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 sm:px-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-30 w-30" />
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-center text-gray-800 mb-8 tracking-wide">
            TAPPY SUPPORT DASHBOARD
          </h1>

          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center sm:text-left">
            Login
          </h2>

          {/* Error */}
          {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition"
          >
            Log in
          </button>

          {/* Forgot Password */}
          <div className="text-center sm:text-right mt-4">
            <a
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
