'use client'
import Layout from "@/components/layout/Layout"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Importar los componentes de detalles de servicio
import ServiceDetails1 from '@/components/services/ServiceDetails1'
import PathologyLabDetails from "@/components/services/PathologyLabDetails"
import ClinicalLabDetails from "@/components/services/ClinicalLabDetails"


export default function Service() {
    const MySwal = withReactContent(Swal)

    const services = [
        {
            title: 'Diagnóstico y Terapia Personalizados',
            link: 'service-details-1',
            description: 'Obtén un diagnóstico preciso y un plan de tratamiento adaptado a tus necesidades únicas.',
            component: ServiceDetails1,
        },
        {
            title: 'Laboratorio de Patología',
            link: 'service-details-1',
            description: 'El laboratorio de patología ofrece un diagnóstico seguro para determinar el plan de manejo que se aplicará al paciente.',
            component: PathologyLabDetails,
        },
        {
            title: 'Laboratorio Clínico',
            link: 'service-details-1',
            description: 'El laboratorio de patología ofrece un diagnóstico seguro para determinar el plan de manejo que se aplicará al paciente.',
            component: ClinicalLabDetails,
        },
        // Agrega los demás servicios aquí, incluyendo sus componentes
    ];

    const handleServiceClick = (service) => {
        MySwal.fire({
            html: <service.component />,
            showCloseButton: true,
            showConfirmButton: false,
            width: '800px',
        })
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestros Servicios">
                <section className="service-section sec-pad">
                    <div className="auto-container">
                        <div className="sec-title mb_50 centred">
                            <span className="sub-title">Nuestros Servicios</span>
                            <h2>Atención Integral <br />Cuidando de Ti Siempre</h2>
                        </div>
                        <div className="row clearfix">
                            {services.map((service, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12 service-block">
                                    <div
                                        className="service-block-one wow fadeInUp animated"
                                        data-wow-delay={`${(index % 6) * 100}ms`}
                                        data-wow-duration="1500ms"
                                    >
                                        <div
                                            className="inner-box"
                                            onClick={() => handleServiceClick(service)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="image-box">
                                                <figure className="image">
                                                    <img
                                                        src={`https://picsum.photos/300/200?random=${index + 1}`}
                                                        alt={service.title}
                                                    />
                                                </figure>
                                                <div className="icon-box">
                                                    <i className={`icon-${index + 1}`}></i>
                                                </div>
                                            </div>
                                            <div className="lower-content">
                                                <h3>{service.title}</h3>
                                                <p>{service.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
