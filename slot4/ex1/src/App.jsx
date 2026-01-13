import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Anh from "../public/images/4n.jpg";
import ListOfOrchid from "./components/ListOfOrchid";
import listOrchids from "./data/listOrchids";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="flex-fill py-4">
        <div className="container">
          <h1 className="text-center mb-4">WELCOME TO MY WEBSITE</h1>
          <ListOfOrchid orchids={listOrchids} searchTerm={searchTerm} />
        </div>
      </main>

      <Footer avatar={Anh} name="Tri" email="tri@fpt.edu.vn" />
    </div>
  );
}

export default App;
