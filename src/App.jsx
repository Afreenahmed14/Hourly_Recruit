import { useState } from "react";
import Home from "./pages/Home";
import HireDevelopers from "./pages/Hiredevelopers";
import Technologies from "./pages/Technologies";
import HowItWorks from "./pages/Howitworks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigate={navigate} />;
      case "about":
        return <About navigate={navigate} />;
      case "hire":
        return <HireDevelopers navigate={navigate} />;
      case "technologies":
        return <Technologies navigate={navigate} />;
      case "how":
        return <HowItWorks navigate={navigate} />;
      case "contact":
        return <Contact navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  );
}