import TestimonialSlider1 from '@/components/slider/TestimonialSlider1'

export default function Testimonial() {
    return (
        <>
            <section className="testimonial-section sec-pad bg-color-1">
                <div className="bg-layer" style={{ backgroundImage: 'url(assets/images/background/vision.jpg)' }}></div>
                <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-21.png)' }}></div>
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-xl-6 col-lg-12 col-md-12 offset-xl-6 content-column">
                            <div className="content-box p_relative ml_45">
                                <div className="sec-title mb_50">
                                    <span className="sub-title">Testimonios</span>
                                    <h2>Lo Que Dicen Nuestros Pacientes</h2>
                                    <p style={{ fontSize: '18px', maxWidth: '500px' }}>Nuestros pacientes son nuestra mayor prioridad. Conoce sus experiencias y cómo los hemos ayudado a mejorar su calidad de vida.</p>
                                </div>
                                <div className="content-box">
                                    <TestimonialSlider1 />                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}