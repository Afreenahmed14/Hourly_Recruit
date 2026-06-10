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
import { fetchSiteSettings, clearTokens } from "./api/Api";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [adminAuthed, setAdminAuthed] = useState(
    () => sessionStorage.getItem("hr_admin_auth") === "1"
  );

  // siteData is the merged result of: backend API → localStorage → DEFAULT_DATA
  const [siteData, setSiteData] = useState(() => getData());
  const [siteLoading, setSiteLoading] = useState(true);

  // On mount: try to pull live data from backend; merge with local store
  useEffect(() => {
    async function loadSiteData() {
      try {
        // Fetch public site settings (companyName, logoUrl, faviconUrl)
        const settings = await fetchSiteSettings();
        if (settings) {
          // Merge backend settings into siteData
          setSiteData((prev) => ({
            ...prev,
            siteSettings: settings,
          }));
        }
      } catch {
        // Backend not reachable — use localStorage/defaults (already loaded above)
      } finally {
        setSiteLoading(false);
      }
    }
    loadSiteData();
  }, []);

  // Update favicon/title from siteSettings when available
  useEffect(() => {
    if (siteData?.siteSettings?.companyName) {
      document.title = siteData.siteSettings.companyName + " — Hire Developers";
    }
    if (siteData?.siteSettings?.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = siteData.siteSettings.faviconUrl;
    }
  }, [siteData?.siteSettings]);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Admin flow ────────────────────────────────────────────────────────────
  if (currentPage === "admin-login") {
    if (adminAuthed) {
      return (
        <AdminDashboard
          onLogout={() => {
            setAdminAuthed(false);
            clearTokens();
            navigate("admin-login");
          }}
        />
      );
    }
    return (
      <AdminLogin
        onLogin={() => {
          setAdminAuthed(true);
        }}
      />
    );
  }

  if (currentPage === "admin") {
    if (adminAuthed) {
      return (
        <AdminDashboard
          onLogout={() => {
            setAdminAuthed(false);
            clearTokens();
            navigate("home");
          }}
        />
      );
    }
    navigate("admin-login");
    return null;
  }

  // ── Public site ────────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (currentPage) {
      case "home":         return <Home navigate={navigate} siteData={siteData} />;
      case "about":        return <About navigate={navigate} siteData={siteData} />;
      case "hire":         return <HireDevelopers navigate={navigate} siteData={siteData} />;
      case "technologies": return <Technologies navigate={navigate} siteData={siteData} />;
      case "how":          return <HowItWorks navigate={navigate} siteData={siteData} />;
      case "contact":      return <Contact navigate={navigate} siteData={siteData} />;
      default:             return <Home navigate={navigate} siteData={siteData} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} navigate={navigate} siteData={siteData} />
      <main>
        {siteLoading ? (
          // Skeleton shimmer while backend data loads
          <div style={loadingStyles.wrap}>
            <div style={loadingStyles.spinner} />
          </div>
        ) : (
          renderPage()
        )}
      </main>
      <Footer navigate={navigate} siteData={siteData} />
    </div>
  );
}

const loadingStyles = {
  wrap: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid var(--gray-100, #e8eef8)",
    borderTopColor: "var(--blue, #1a56db)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};