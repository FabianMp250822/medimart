'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
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
export default function TestimonialSlider3() {
    return (
        <>
            <Swiper {...swiperOptions} className="single-item-carousel">
                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"La atención médica en urgencias fue excelente. El personal siempre estuvo atento y me sentí bien cuidado durante mi estadía en la clínica."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="assets/images/resource/testimonial-1.png" alt="Paciente" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                                <h3>Juan Pérez</h3>
                                <span className="designation">Paciente de Urgencias</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"El equipo de oncología fue muy profesional y atento. Mi tratamiento de radioterapia fue excelente y siempre me explicaron cada paso del proceso."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="assets/images/resource/testimonial-2.png" alt="Paciente" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                                <h3>María González</h3>
                                <span className="designation">Paciente de Oncología</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"Tuve una excelente experiencia durante mi parto en la Clínica de la Costa. El equipo de maternidad me brindó todo el apoyo necesario, haciendo que todo el proceso fuera más fácil y cómodo."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="assets/images/resource/testimonial-3.png" alt="Paciente" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                                <h3>Luisa Martínez</h3>
                                <span className="designation">Paciente de Maternidad</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="slide-item">
                    <div className="testimonial-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-23"></i></div>
                            <p>"El servicio general fue excelente y el personal fue muy profesional. Me sentí muy bien cuidado durante mi tratamiento en la clínica."</p>
                            <div className="author-box">
                                <figure className="author-thumb"><img src="assets/images/resource/testimonial-4.png" alt="Paciente" /></figure>
                                <ul className="rating clearfix">
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="fas fa-star"></i></li>
                                    <li><i className="far fa-star"></i></li>
                                </ul>
                                <h3>Carlos Ramírez</h3>
                                <span className="designation">Paciente General</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
