import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderContent = () => {
    if (currentPage === "about") return <About />;
    if (currentPage === "contact") return <Contact />;

    return (
      <div className="container text-center">
        <h1>WELCOME TO MY WEBSITE</h1>
        <p className="lead mb-0">Use the navbar to switch between pages.</p>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-fill py-4">{renderContent()}</main>
      <Footer />
    </div>
  );
}

export default App;
