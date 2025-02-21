"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
// 1. Importa 'Script' de 'next/script'
import Script from "next/script";

const WOW = dynamic(() => import('wowjs/dist/wow'));

import BackToTop from '../elements/BackToTop';
import DataBg from "../elements/DataBg";
import Breadcrumb from './Breadcrumb';
import SearchPopup from "./SearchPopup";
import Sidebar from "./Sidebar";
import Footer1 from './footer/Footer1';
import Footer2 from './footer/Footer2';
import Header1 from "./header/Header1";
import Header2 from './header/Header2';
import Header3 from "./header/Header3";
import Header4 from "./header/Header4";
import Header1NoSSR from "./header/Header1NoSSR";

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
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    document.body.classList.toggle("mobile-menu-visible", !isMobileMenu);
  };
  const [isPopup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!isPopup);
  const [isSidebar, setSidebar] = useState(false);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, [scroll]);

  return (
    <>
      {/* 2. Agregamos Scripts de Google Analytics (gtag) */}
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
      {/* Fin de integración de Google Analytics */}

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
          <Header2
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        )}
        {headerStyle === 3 && (
          <Header3
            scroll={scroll}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            handlePopup={handlePopup}
            isSidebar={isSidebar}
            handleSidebar={handleSidebar}
          />
        )}
        {headerStyle === 4 && (
          <Header4
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

        {children}

        {(footerStyle === 1 || !footerStyle) && <Footer1 />}
        {footerStyle === 2 && <Footer2 />}
      </div>
      <BackToTop scroll={scroll} />
    </>
  );
}
