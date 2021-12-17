import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "../css/Layout.css";

export default function Layout({ children }) {
  // we can remove the currentheader if we want

  return (
    <div className="pageLayout container-fluid">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
