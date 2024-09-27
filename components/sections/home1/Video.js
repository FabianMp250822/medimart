'use client';
import React, { useState } from 'react';
import Link from "next/link";
import ModalVideo from 'react-modal-video'

export default function Video() {
    const [isOpen, setOpen] = useState(false)
  return (
    <>
    <section className="video-section p_relative">
      <div className="bg-layer parallax-bg" data-parallax='{"y": 100}' style={{ backgroundImage: 'url(assets/images/background/video-bg.jpg)' }}></div>
      <figure className="image-layer"><img src="assets/images/resource/visdeo1.jpg" alt="Clínica de la Costa" /></figure>
      <div className="auto-container">
        <div className="inner-box">
          <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-17.png)' }}></div>
          <div className="video-btn">
          <a onClick={() => setOpen(true)}><i className="fas fa-play"></i>
                            <span className="border-animation border-1"></span>
                            <span className="border-animation border-2"></span>
                            <span className="border-animation border-3"></span>
          </a>
          </div>
          <h2>Consultas Online Con <br />Médicos Calificados</h2>
          <div className="btn-box">
            <Link href="/#" className="theme-btn btn-one"><span>Agendar una Cita</span></Link>
          </div>
        </div>
      </div>
    </section>
     <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="uBTq7G5VgY&ab" onClose={() => setOpen(false)} />
     </>
  );
};
