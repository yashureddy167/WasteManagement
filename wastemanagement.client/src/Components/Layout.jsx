// Components/Layout.jsx
import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SimpleNavbar from "./SimpleNavbar";
import Footer from "./Footer";
import AdminNavbar from "./AdminNavbar"; // Import AdminNavbar
import "../CSS/Layout.css";
import { UserContext } from "../Contexts/UserContext";

const Layout = () => {
  const location = useLocation();
  const { isAdmin } = useContext(UserContext);
  const userData = location.state?.userData || {};
  const initialCoins = userData.data?.coins || 0;
  const hideNavbarPaths = ["/", "/signin", "/signup", "/forgot-password"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  const [totalCoins, setTotalCoins] = useState(initialCoins);

  // Debugging logs
  console.log("location.state:", location.state);
  console.log("isAdmin:", isAdmin);

  useEffect(() => {
    setTotalCoins(initialCoins);
  }, [initialCoins]);

  return (
    <div className="layout background-image">
      {isAdmin ? (
        // If isAdmin is true, render AdminNavbar
        <AdminNavbar />
      ) : shouldHideNavbar ? (
        // If shouldHideNavbar is true and isAdmin is false, render SimpleNavbar
        <SimpleNavbar />
      ) : (
        // If shouldHideNavbar is false and isAdmin is false, render Navbar with totalCoins prop
        <Navbar totalCoins={totalCoins} />
      )}
      <main className="main">
        <Outlet context={{ totalCoins, setTotalCoins }} />
      </main>
      {!isAdmin && !shouldHideNavbar && <Footer />}
      {/* Hide Footer for admin */}
    </div>
  );
};

export default Layout;
