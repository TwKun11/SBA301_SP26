import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orchid from "./components/Orchid";

const orchids = [
  {
    id: "1",
    orchidName: "Ceasar 4N",
    description: "Lorem ipsum dolor sit amet",
    category: "Dendrobium",
    isSpecial: true,
    image: "images/4n.jpg",
  },
  {
    id: "1",
    orchidName: "Ceasar 4N",
    description: "Lorem ipsum dolor sit amet",
    category: "Dendrobium",
    isSpecial: true,
    image: "images/4n.jpg",
  },
  {
    id: "1",
    orchidName: "Ceasar 4N",
    description: "Lorem ipsum dolor sit amet",
    category: "Dendrobium",
    isSpecial: true,
    image: "images/4n.jpg",
  },
  {
    id: "1",
    orchidName: "Ceasar 4N",
    description: "Lorem ipsum dolor sit amet",
    category: "Dendrobium",
    isSpecial: true,
    image: "images/4n.jpg",
  },
];
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill py-4">
        <div className="container text-center">
          <h1 className="mb-4">Orchid Collection</h1>
          <div className="row g-4">
            {orchids.map((orchid) => (
              <div className="col-12 col-sm-6 col-lg-3" key={orchid.id}>
                <Orchid orchid={orchid} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer
        avatarUrl="https://i.pravatar.cc/100?img=33"
        authorName="Tri"
        role="Frontend Developer"
        email="tritvv1@fpt.edu.vn"
      />
    </div>
  );
}

export default App;
