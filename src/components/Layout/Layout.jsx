import React, { useEffect } from "react";
import { useHref } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import ScrollTop from "../UI/ScrollTop";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const href = useHref();

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    scrollTop();
  }, [href]);

  return (
    <div className="min-h-screen grid grid-cols-12 grid-rows-[auto,1fr,auto]">
      <Navbar />
      <div className="col-span-12 px-4 py-4 md:px-32">{children}</div>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Layout;
