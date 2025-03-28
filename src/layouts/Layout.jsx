import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import GoToTopButton from "../components/GoToTopButton";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This adds smooth scrolling
    });
  }, [location]);

  return (
    <>
    <ToastContainer />
      <Navbar />
      <section id="content">
        <Outlet />
      </section>

      <Footer />
      <GoToTopButton />
    </>
  );
};
