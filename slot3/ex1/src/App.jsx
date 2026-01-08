import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Orchid from "./components/Orchid";
import Anh from "../public/images/4n.jpg";
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-fill py-4">
        <div className="container">
          <h1 className="text-center mb-4">WELCOME TO MY WEBSITE</h1>

          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <Orchid
                id="1"
                orchidName="Ceasar 4N"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                category="Dendrobium"
                isSpecial={true}
                image={Anh}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer avatar={Anh} name="Tri" email="tri@fpt.edu.vn" />
    </div>
  );
}

export default App;
