import { useState, useEffect } from "react";
import Home from "./pages/Home";
import HireDevelopers from "./pages/Hiredevelopers";
import Technologies from "./pages/Technologies";
import HowItWorks from "./pages/Howitworks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/Adminloogin";
import AdminDashboard from "./pages/Admindashboard";
import { getData } from "./api/Datastore";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem("hr_admin_auth") === "1"
  );
  const [siteData, setSiteData] = useState(getData);

  // Keep siteData in sync with admin saves
  useEffect(() => {
    const handler = (e) => setSiteData(e.detail);
    window.addEventListener("hr_data_updated", handler);
    return () => window.removeEventListener("hr_data_updated", handler);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Admin portal routes
  if (currentPage === "admin") {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLogin={() => setIsAdminLoggedIn(true)}
          onBack={() => navigate("home")}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => {
          sessionStorage.removeItem("hr_admin_auth");
          setIsAdminLoggedIn(false);
          navigate("home");
        }}
        onNavigateSite={navigate}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":         return <Home navigate={navigate} siteData={siteData} />;
      case "about":        return <About navigate={navigate} siteData={siteData} />;
      case "hire":         return <HireDevelopers navigate={navigate} siteData={siteData} />;
      case "technologies": return <Technologies navigate={navigate} />;
      case "how":          return <HowItWorks navigate={navigate} siteData={siteData} />;
      case "contact":      return <Contact navigate={navigate} siteData={siteData} />;
      default:             return <Home navigate={navigate} siteData={siteData} />;
    }
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        isAdminLoggedIn={isAdminLoggedIn}
      />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} siteData={siteData} />
    </div>
  );
}