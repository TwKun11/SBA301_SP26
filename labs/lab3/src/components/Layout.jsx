import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ onSearch }) {
  return (
    <div className="app-wrapper">
      <Header onSearch={onSearch} />

      <main className="main-wrapper">
        <Outlet />
      </main>

      <Footer avatar="/images/whynot.jpg" name="Tran vo Van Tri" email="tranvovantri@gmail.com" />
    </div>
  );
}

export default Layout;
