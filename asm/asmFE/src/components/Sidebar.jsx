import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, isAdmin, isStaff, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#2d3748",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px 0",
        color: "white",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo/Brand */}
      <div style={{ padding: "20px", borderBottom: "1px solid #4a5568", marginBottom: "20px" }}>
        <h4 style={{ margin: 0, color: "white", fontWeight: "bold" }}>📰 FU News</h4>
        <small style={{ color: "#a0aec0" }}>Management System</small>
      </div>

      {/* User Info */}
      <div style={{ padding: "0 20px", marginBottom: "30px" }}>
        <div style={{ 
          background: "#4a5568", 
          padding: "15px", 
          borderRadius: "10px",
          marginBottom: "10px"
        }}>
          <div style={{ fontSize: "14px", color: "#e2e8f0", marginBottom: "5px" }}>
            👤 {user.accountName}
          </div>
          <div style={{ fontSize: "12px", color: "#a0aec0" }}>
            {user.accountRole === 1 ? "👑 Administrator" : "✍️ Staff Member"}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Nav className="flex-column">
        <Nav.Link
          onClick={() => navigate("/")}
          style={{
            color: isActive("/") ? "#fff" : "#cbd5e0",
            background: isActive("/") ? "#4a5568" : "transparent",
            padding: "12px 20px",
            cursor: "pointer",
            borderLeft: isActive("/") ? "4px solid #4299e1" : "4px solid transparent",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!isActive("/")) e.target.style.background = "#3a4556";
          }}
          onMouseLeave={(e) => {
            if (!isActive("/")) e.target.style.background = "transparent";
          }}
        >
          🏠 Dashboard
        </Nav.Link>

        {isAdmin() && (
          <Nav.Link
            onClick={() => navigate("/accounts")}
            style={{
              color: isActive("/accounts") ? "#fff" : "#cbd5e0",
              background: isActive("/accounts") ? "#4a5568" : "transparent",
              padding: "12px 20px",
              cursor: "pointer",
              borderLeft: isActive("/accounts") ? "4px solid #4299e1" : "4px solid transparent",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isActive("/accounts")) e.target.style.background = "#3a4556";
            }}
            onMouseLeave={(e) => {
              if (!isActive("/accounts")) e.target.style.background = "transparent";
            }}
          >
            👥 Accounts
          </Nav.Link>
        )}

        {isStaff() && (
          <>
            <Nav.Link
              onClick={() => navigate("/news")}
              style={{
                color: isActive("/news") ? "#fff" : "#cbd5e0",
                background: isActive("/news") ? "#4a5568" : "transparent",
                padding: "12px 20px",
                cursor: "pointer",
                borderLeft: isActive("/news") ? "4px solid #4299e1" : "4px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/news")) e.target.style.background = "#3a4556";
              }}
              onMouseLeave={(e) => {
                if (!isActive("/news")) e.target.style.background = "transparent";
              }}
            >
              📰 News Articles
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/categories")}
              style={{
                color: isActive("/categories") ? "#fff" : "#cbd5e0",
                background: isActive("/categories") ? "#4a5568" : "transparent",
                padding: "12px 20px",
                cursor: "pointer",
                borderLeft: isActive("/categories") ? "4px solid #4299e1" : "4px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/categories")) e.target.style.background = "#3a4556";
              }}
              onMouseLeave={(e) => {
                if (!isActive("/categories")) e.target.style.background = "transparent";
              }}
            >
              📁 Categories
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/tags")}
              style={{
                color: isActive("/tags") ? "#fff" : "#cbd5e0",
                background: isActive("/tags") ? "#4a5568" : "transparent",
                padding: "12px 20px",
                cursor: "pointer",
                borderLeft: isActive("/tags") ? "4px solid #4299e1" : "4px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/tags")) e.target.style.background = "#3a4556";
              }}
              onMouseLeave={(e) => {
                if (!isActive("/tags")) e.target.style.background = "transparent";
              }}
            >
              🏷️ Tags
            </Nav.Link>
          </>
        )}

        <div style={{ borderTop: "1px solid #4a5568", margin: "20px 0" }}></div>

        <Nav.Link
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            color: "#fc8181",
            padding: "12px 20px",
            cursor: "pointer",
            borderLeft: "4px solid transparent",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#742a2a";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          🚪 Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
