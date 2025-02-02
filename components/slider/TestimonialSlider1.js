"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Swiper
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  // Botones de navegación
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },
  // Paginación
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    575: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 1,
    },
    991: {
      slidesPerView: 1,
    },
    1199: {
      slidesPerView: 1,
    },
    1350: {
      slidesPerView: 1,
    },
  },
};

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pqyr"));
        const docsData = querySnapshot.docs.map((doc) => doc.data());
        // Filtramos únicamente los que tengan rating = 5
        const filtered = docsData.filter((item) => item.rating === 5);
        setTestimonials(filtered);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      {...swiperOptions}
      className="single-item-carousel owl-carousel owl-theme owl-dots-none owl-nav-none"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index} className="slide-item">
          <div className="testimonial-block-one">
            <div className="inner-box">
              <div className="icon-box">
                <i className="icon-23"></i>
              </div>
              <p>{`"${testimonial.comment}"`}</p>
              <div className="author-box">
                <figure className="author-thumb">
                  {/* Si en tu documento guardas alguna URL de imagen, sustituye aquí */}
                  <img
                    src="https://picsum.photos/200"
                    alt={`Testimonial de ${testimonial.name}`}
                  />
                </figure>
                <ul className="rating clearfix">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <li key={idx}>
                      <i className="fas fa-star"></i>
                    </li>
                  ))}
                </ul>
                <h3>{testimonial.name}</h3>
                <span className="designation">Paciente</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
