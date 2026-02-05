import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Home from "./components/Home";
import AccountManagement from "./components/AccountManagement";
import CategoryManagement from "./components/CategoryManagement";
import TagManagement from "./components/TagManagement";
import NewsManagement from "./components/NewsManagement";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App" style={{ display: "flex" }}>
      {!isLoginPage && <Sidebar />}
      <div style={{ marginLeft: isLoginPage ? "0" : "250px", width: "100%", minHeight: "100vh" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <PrivateRoute requiredRole={1}>
                <AccountManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
                <PrivateRoute requiredRole={2}>
                  <CategoryManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/tags"
              element={
                <PrivateRoute requiredRole={2}>
                  <TagManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/news"
              element={
                <PrivateRoute requiredRole={2}>
                  <NewsManagement />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
