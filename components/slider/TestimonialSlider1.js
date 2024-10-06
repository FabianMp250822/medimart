'use client'

import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay:2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
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
    }
}

export default function TestimonialSlider1() {
    return (
        <>
            <Swiper {...swiperOptions} className="single-item-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"La atención en la Clínica de la Costa fue excelente. El personal médico siempre estuvo atento a todas mis necesidades. Me siento completamente satisfecho con el servicio."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="https://picsum.photos/200/200" alt="Testimonial 1" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                                <h3>Juan Pérez</h3>
                                <span className="designation">Paciente</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"Gracias al equipo de especialistas de la Clínica de la Costa, mi recuperación fue rápida y eficiente. El trato fue humano y profesional."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="https://picsum.photos/200/201" alt="Testimonial 2" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                                <h3>María Gómez</h3>
                                <span className="designation">Paciente</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"Me sorprendió gratamente el nivel de tecnología y la calidez humana de todo el equipo en la Clínica de la Costa. Un servicio que superó mis expectativas."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="https://picsum.photos/200/202" alt="Testimonial 3" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                                <h3>Carmen Rodríguez</h3>
                                <span className="designation">Paciente</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
