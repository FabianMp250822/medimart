"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

// Importa tus demás componentes y estilos
import BackToTop from "../elements/BackToTop";
import DataBg from "../elements/DataBg";
import Breadcrumb from "./Breadcrumb";
import SearchPopup from "./SearchPopup";
import Sidebar from "./Sidebar";
import Footer1 from "./footer/Footer1";
import Footer2 from "./footer/Footer2";
import Header1NoSSR from "./header/Header1NoSSR";
import Header2NoSSR from "./header/Header2NoSSR";
import Header3NoSSR from "./header/Header3NoSSR";
import Header4NoSSR from "./header/Header4NoSSR";

const WOW = dynamic(() => import("wowjs/dist/wow"));

const theme = createTheme({
  // Puedes personalizar el tema si lo deseas
  // breakpoints, palette, typography, etc.
});

export default function Layout({
  headerStyle,
  footerStyle,
  headTitle,
  breadcrumbTitle,
  children,
  wrapperCls,
}) {
  const [scroll, setScroll] = useState(0);
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [isSidebar, setSidebar] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    document.body.classList.toggle("mobile-menu-visible", !isMobileMenu);
  };
  const handlePopup = () => setPopup(!isPopup);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({ live: false });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, [scroll]);

  return (
    <ThemeProvider theme={theme}>
      {/* Scripts de Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EL74C3P69H"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EL74C3P69H');
        `}
      </Script>
      {/* Fin Google Analytics */}

      <DataBg />
      <div
        className={`boxed_wrapper ltr ${wrapperCls ? wrapperCls : ""}`}
        id="#top"
      >
        {(headerStyle === 1 || !headerStyle) && (
          <Header1NoSSR
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        )}
        {headerStyle === 2 && (
          <Header2NoSSR
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        )}
        {headerStyle === 3 && (
          <Header3NoSSR
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        )}
        {headerStyle === 4 && (
          <Header4NoSSR
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        )}

        <Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
        <SearchPopup isPopup={isPopup} handlePopup={handlePopup} />

        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

        {/* Contenido principal (children) */}
        {children}

        {(footerStyle === 1 || !footerStyle) && <Footer1 />}
        {footerStyle === 2 && <Footer2 />}
      </div>
      <BackToTop scroll={scroll} />
    </ThemeProvider>
  );
}
