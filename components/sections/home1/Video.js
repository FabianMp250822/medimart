'use client';
import React, { useState } from 'react';
import Link from "next/link";
import ModalVideo from 'react-modal-video';

export default function Video() {
    const [isOpen, setOpen] = useState(false);
  return (
    <>
    <section className="video-section p_relative" style={{ padding: '100px 0', position: 'relative', textAlign: 'center' }}>
      <div className="bg-layer parallax-bg" data-parallax='{"y": 100}' style={{ backgroundImage: 'url(assets/images/background/video-bg.jpg)', filter: 'brightness(0.6)' }}></div>
      <figure className="image-layer"><img src="assets/images/resource/visdeo1.jpg" alt="Clínica de la Costa" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} /></figure>
      <div className="auto-container">
        <div className="inner-box">
          <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-17.png)' }}></div>
          <div className="video-btn" style={{ marginBottom: '30px' }}>
            <a onClick={() => setOpen(true)} className="play-button" style={{ cursor: 'pointer', color: '#fff', fontSize: '36px' }}>
              <i className="fas fa-play"></i>
              <span className="border-animation border-1"></span>
              <span className="border-animation border-2"></span>
              <span className="border-animation border-3"></span>
            </a>
          </div>
          <h2 style={{ color: '#fff', fontSize: '36px', marginBottom: '20px', lineHeight: '1.4em' }}>Consulta en Línea con Nuestros <br /> Especialistas Médicos</h2>
          <p style={{ color: '#fff', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '30px' }}>
            Accede a consultas desde la comodidad de tu hogar. Nuestros médicos están aquí para brindarte la mejor atención con un enfoque cálido y humano.
          </p>
          <div className="btn-box">
            <Link href="/appointment" className="theme-btn btn-one" style={{ padding: '15px 30px', fontSize: '18px' }}><span>Agendar una Cita</span></Link>
          </div>
        </div>
      </div>
    </section>
    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="uBTq7G5VgY" onClose={() => setOpen(false)} />
    </>
  );
};