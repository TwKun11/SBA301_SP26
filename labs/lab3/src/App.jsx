import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import OrchidDetail from "./components/OrchidDetail";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout onSearch={setSearchKeyword} />}>
          <Route path="/" element={<Home searchKeyword={searchKeyword} />} />

          <Route path="/orchid/:id" element={<OrchidDetail />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
