import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Utility function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if there's a valid token
};

const App = () => {
  return (
    <Routes>
      {/* Route to Register page */}
      <Route path="/register" element={<Register />} />

      {/* Route to Login page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard (protected route, only accessible if authenticated) */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" /> // Redirect to login if not authenticated
          )
        }
      />

      {/* Default Route: Redirect to register if no match */}
      <Route path="*" element={<Navigate to="/register" />} />
    </Routes>
  );
};

export default App;
