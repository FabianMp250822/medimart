'use client'
import Link from "next/link";
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handlePopup, handleSidebar }) {
    return (
        <>
            <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
                {/* Header Top */}
                <div className="header-top">
                    <div className="auto-container">
                        <div className="top-inner">
                            <ul className="info-list clearfix">
                                <li>
                                    <i className="icon-1"></i>Atención al Usuario: <Link href="tel:+576053369973">+57 (605) 3369973</Link>
                                </li>
                                <li>
                                    <i className="icon-2"></i>Call Center: <Link href="tel:+576053369999">+57 (605) 3369999 Ext. 0</Link>
                                </li>
                                <li>
                                    <img src="assets/images/icons/icon-1.png" alt="" /> Cra. 50 #80-149, Sede 3
                                </li>
                            </ul>
                            <ul className="social-links clearfix">
                                {/* Si tienes enlaces a redes sociales, puedes agregarlos aquí */}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Header Upper */}
                <div className="header-lower">
                    <div className="outer-container">
                        <div className="auto-container">
                            <div className="outer-box">
                                <div className="logo-box">
                                    <figure className="logo">
                                        <Link href="/"><img src="assets/images/logo.png" alt="Clínica de la Costa" /></Link>
                                    </figure>
                                </div>
                                <div className="menu-area">
                                    <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                                        <i className="icon-bar"></i>
                                        <i className="icon-bar"></i>
                                        <i className="icon-bar"></i>
                                    </div>
                                    <nav className="main-menu navbar-expand-md navbar-light clearfix">
                                        <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                            <Menu/>
                                        </div>
                                    </nav>
                                </div>
                                <div className="btn-box">
                                    <Link href="/" className="theme-btn btn-one"><span>Asignar Cita</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Header */}
                <div className="sticky-header">
                    <div className="auto-container">
                        <div className="outer-box">
                            <div className="logo-box">
                                <figure className="logo"><Link href="/"><img src="assets/images/logo.png" alt="Clínica de la Costa" /></Link></figure>
                            </div>

                            <nav className="main-menu navbar-expand-md navbar-light clearfix">
                                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <Menu/>
                                </div>
                            </nav>
                            <ul className="menu-right-content">
                                <div className="btn-box">
                                    <Link href="/" className="theme-btn btn-one"><span>Asignar Cita</span></Link>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* End Sticky Menu */}
                {/* Mobile Menu */}
                <MobileMenu handleMobileMenu={handleMobileMenu} />
            </header>
        </>
    )
}
