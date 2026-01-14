import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrchidDetail from "./pages/OrchidDetail";
import Login from "./pages/Login";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onSearch={setSearchText} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetail />} />
      </Routes>

      <Footer
        avatar="/images/kazuha-le-sserafim-3840x2160-21959.jpg"
        name="tri"
        email="tritvvde181@fpt.edu.vn"
      />
    </div>
  );
}

export default App;
