import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({
  searchText,
  onSearchChange,
  isLoggedIn,
  username,
  onLogout,
}) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchText={searchText}
        onSearchChange={onSearchChange}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={onLogout}
      />

      <Outlet />

      <Footer
        avatar="/images/kazuha-le-sserafim-3840x2160-21959.jpg"
        name="tri"
        email="tritvvde181@fpt.edu.vn"
      />
    </div>
  );
}

export default MainLayout;
