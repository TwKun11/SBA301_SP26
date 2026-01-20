import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrchidDetail from "./pages/OrchidDetail";
import Login from "./pages/Login";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout searchText={searchText} onSearchChange={setSearchText} />}>
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
