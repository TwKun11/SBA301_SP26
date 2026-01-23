import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrchidDetail from "./pages/OrchidDetail";
import Login from "./pages/Login";

function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("lab2_isLoggedIn");
    const user = localStorage.getItem("lab2_username");
    if (loggedIn && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("lab2_isLoggedIn", "true");
    localStorage.setItem("lab2_username", user);
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("lab2_isLoggedIn");
    localStorage.removeItem("lab2_username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        element={
          <MainLayout
            searchText={searchText}
            onSearchChange={setSearchText}
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
          />
        }
      >
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
