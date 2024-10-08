'use client'
import Layout from "@/components/layout/Layout"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Importar los componentes de detalles de servicio
import ServiceDetails1 from '@/components/services/ServiceDetails1'
import PathologyLabDetails from "@/components/services/PathologyLabDetails"
import ClinicalLabDetails from "@/components/services/ClinicalLabDetails"
import PlasticSurgeryDetails from "@/components/services/PlasticSurgeryDetails"
import PediatricCardiologyDetails from "@/components/services/PediatricCardiologyDetails"
import CardiacVascularDetailsComplete from "@/components/services/CardiacVascularDetails"
import HematologyOncologyDetails from "@/components/services/HematologyOncologyDetails"
import RadiotherapyDetails from "@/components/services/RadiotherapyDetails"
import PetCTDetails from "@/components/services/PetCTDetails"
import ServiceDetailsNefrologia from "@/components/services/HIVSupportProgram"
import KidneyLiverTransplant from "@/components/services/KidneyLiverTransplant"
import OrthopedicsTraumatology from "@/components/services/OrthopedicsTraumatology"
import PulmonologyThoracic from "@/components/services/PulmonologyThoracic"
import NeurologyLab from "@/components/services/NeurologyLab"
import NephrologyProgram from "@/components/services/NephrologyProgram"
import HeartFailureSupport from "@/components/services/HeartFailureSupport"
import TransplantServices from "@/components/services/TransplantServices"
import GastroenterologyDetails from "@/components/services/GastroenterologyDetails"
import TuberculosisAndChestPainProgram from "@/components/services/TuberculosisAndChestPainProgram"


export default function Service() {
    const MySwal = withReactContent(Swal)

    const services = [
        {
            title: 'Diagnóstico y Terapia Personalizados',
            link: 'Diagnóstico y Terapia Personalizados',
            description: 'Obtén un diagnóstico preciso y un plan de tratamiento adaptado a tus necesidades únicas.',
            component: ServiceDetails1,
        },
        {
            title: 'Laboratorio de Patología',
            link: 'Laboratorio de Patología',
            description: 'El laboratorio de patología ofrece un diagnóstico seguro para determinar el plan de manejo que se aplicará al paciente.',
            component: PathologyLabDetails,
        },
        {
            title: 'Laboratorio Clínico',
            link: 'Laboratorio Clínico',
            description: 'Conociendo la importancia del diagnóstico, el Laboratorio Clínico ofrece un servicio respaldado por la más completa tecnología.',
            component: ClinicalLabDetails,
        },
        {
            title: 'Cirugía Plástica Reconstructiva y de Estética',
            link: 'Cirugía Plástica Reconstructiva y de Estética',
            description: 'Tecnología de última generación con precisión y excelencia en cirugía plástica, estética y reconstructiva.',
            component: PlasticSurgeryDetails,
        },
        {
            title: 'Cardiología Pediátrica',
            link: 'Cardiología Pediátrica',
            description: 'Programa enfocado en el tratamiento y detección de cardiopatías congénitas en niños.',
            component: PediatricCardiologyDetails,
        },
        {
            title: 'Enfermedades Cardiacas y Vasculares',
            link: 'Enfermedades Cardiacas y Vasculares',
            description: 'Diagnóstico y tratamiento de enfermedades cardíacas y vasculares, con procedimientos no invasivos y cirugía avanzada.',
            component: CardiacVascularDetailsComplete,
        },
        // {
        //     title: 'Unidad de Rehabilitación Cardíaca',
        //     link: 'Unidad de Rehabilitación Cardíaca',
        //     description: 'Rehabilitación cardíaca para pacientes post operados, con atención personalizada.',
        //     component: CardiacRehabilitationDetails,
        // },
        {
            title: 'Gastroenterología Clínica y Endoscopia',
            link: 'Gastroenterología Clínica y Endoscopia',
            description: 'Atención de urgencias por gastroenterología y procedimientos endoscópicos.',
            component: GastroenterologyDetails,
        },
        {
            title: 'Paciente Hematoncológico',
            link: 'Paciente Hematoncológico',
            description: 'Manejo integral del paciente hematoncológico, con los más altos niveles de excelencia académica y de investigación.',
            component: HematologyOncologyDetails,
        },
        {
            title: 'Radioterapia',
            link: 'Radioterapia',
            description: 'Tratamiento con radioterapia avanzada y equipos de alta tecnología para pacientes oncológicos.',
            component: RadiotherapyDetails,
        },
        {
            title: 'PET-CT',
            link: 'PET-CT',
            description: 'Tomografía por emisión de positrones con tomografía computarizada para diagnóstico no invasivo.',
            component: PetCTDetails,
        },
        {
            title: 'Paciente con Tuberculosis',
            link: 'Paciente con Tuberculosis',
            description: 'Detección, diagnóstico y tratamiento de pacientes con tuberculosis.',
            component: TuberculosisAndChestPainProgram,
        },
        // {
        //     title: 'Dolor Torácico',
        //     link: 'Dolor Torácico',
        //     description: 'Atención integral para pacientes con dolor torácico, ofreciendo evaluación y seguimiento especializado.',
        //     component: ChestPainProgramDetails,
        // },
        {
            title: 'Trasplante de Falla Intestinal',
            link: 'Trasplante de Falla Intestinal',
            description: 'Centro de Trasplantes que ofrece tratamientos para falla intestinal y soporte integral.',
            component: TransplantServices,
        },
        {
            title: 'Trasplante: Falla Cardíaca y Asistencia Ventricular',
            link: 'Trasplante: Falla Cardíaca y Asistencia Ventricular',
            description: 'Programa de trasplante para pacientes con falla cardíaca avanzada, con asistencia especializada.',
            component: HeartFailureSupport,
        },
        {
            title: 'Programa de Nefrología',
            link: 'Programa de Nefrología',
            description: 'Manejo de patologías renales y educación para pacientes y sus familias.',
            component: NephrologyProgram,
        },
        {
            title: 'Neurología y Laboratorio Neurofisiología',
            link: 'Neurología y Laboratorio Neurofisiología',
            description: 'Diagnóstico y tratamiento de enfermedades neurológicas y trastornos del sueño.',
            component: NeurologyLab,
        },
        {
            title: 'Neumología Clínica y Cirugía de Tórax',
            link: 'Neumología Clínica y Cirugía de Tórax',
            description: 'Atención integral para enfermedades respiratorias y cirugías del tórax.',
            component: PulmonologyThoracic,
        },
        {
            title: 'Ortopedia y Traumatología',
            link: 'Ortopedia y Traumatología',
            description: 'Tratamiento especializado en reemplazos articulares y atención de urgencias las 24 horas.',
            component: OrthopedicsTraumatology,
        },
        {
            title: 'Trasplante de Riñón e Hígado',
            link: 'Trasplante de Riñón e Hígado',
            description: 'Centro de Trasplante para riñón e hígado con un equipo especializado en el proceso completo.',
            component: KidneyLiverTransplant,
        },
        {
            title: 'VIH/SIDA',
            link: 'VIH/SIDA',
            description: 'Atención integral y especializada para pacientes con VIH/SIDA con enfoque en prevención y tratamiento.',
            component: ServiceDetailsNefrologia,
        },
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
