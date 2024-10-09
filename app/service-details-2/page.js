'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css' // Estilos para el acordeón
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/src/sweetalert2.scss' // Importa los estilos de SweetAlert2
import './services.css';
export default function Documentos() {
    // Lista de categorías y documentos asociados
    const categories = [
        {
            title: 'Seguridad y Salud en el Trabajo',
            description: `CLÍNICA DE LA COSTA, institución dedicada a la prestación de servicios en salud, manifiesta su interés y preocupación por la protección e integridad de sus trabajadores, independiente de su forma de vinculación o contratación, incluidos contratistas, así como usuarios, proveedores y visitantes de forma segura y eficiente, mediante la implementación de un sistema de Gestión de seguridad y salud en el trabajo, el cual va encaminado a velar por el bienestar físico, social y mental de nuestros colaboradores.`,
            documents: [
                { name: 'Ver más información', file: '/documents/seguridad-salud-en-el-trabajo.pdf' },
            ],
            subcategories: [
                {
                    title: 'Política de Convivencia Laboral',
                    description: `Clínica de la Costa, reconociendo la importancia de una convivencia y un entorno laboral sano, fomenta el trabajo en equipo, el servicio humanizado, el buen trato, la honestidad y el respeto, siendo valores esenciales como mecanismos de prevención, corrección y control de conductas hostiles que promuevan un ambiente de trabajo ofensivo y discriminatorio.`,
                    documents: [
                        { name: 'Ver más información', file: '/documents/politica-convivencia-laboral.pdf' },
                    ],
                },
                {
                    title: 'Política para la Prevención del Consumo de Sustancias Psicoactivas',
                    description: `La CLÍNICA DE LA COSTA, dando cumplimiento a la Resolución 1075 de 1992, la Resolución 1956 de 2008, el decreto único reglamentario del Sector salud y protección social, las demás normas reglamentarias vigentes y la necesidad de prevenir y controlar el uso de alcohol, drogas enervantes y otras sustancias psicoactivas o que generan adicción durante la jornada laboral, establece esta política, la cual está orientada a evitar los daños en la salud individual y colectiva de sus trabajadores, sobre los bienes e intereses de sus clientes, de la empresa, usuarios y de la sociedad en general.`,
                    documents: [
                        { name: 'Ver más información', file: '/documents/politica-prevencion-sustancias.pdf' },
                    ],
                },
                {
                    title: 'Reglamento de Higiene y Seguridad Industrial',
                    description: `CLÍNICA DE LA COSTA prescribe el presente reglamento contenido en los siguientes términos: ARTÍCULO 1. El presente reglamento tiene por finalidad el desarrollo y fomento de la investigación, estudio y prevención de los accidentes de trabajo y enfermedades laborales, como también la adopción de medidas que garanticen la aplicación de normas de Medicina, Higiene y Seguridad Industrial.`,
                    documents: [
                        { name: 'Ver más información', file: '/documents/reglamento-higiene-seguridad.pdf' },
                    ],
                },
            ],
        },
        {
            title: 'Estadísticas en el Marco de la Pandemia COVID-19',
            description: `Con fundamento en los datos y la información antes relacionada y con el propósito de tener una mejor comprensión de los mismos, nos permitimos indicar que durante el marco de la pandemia iniciado el día 21 de marzo de 2020 al día 16 de julio de 2020, en Clínica de la Costa se ha presentado un 10% de casos positivos para el virus COVID-19 en sus colaboradores; de los cuales el 64% se ha recuperado, un 34% aún se encuentra en proceso de recuperación, cumpliendo aislamiento en casa y el 2% de ellos falleció. Cada uno de estos casos ha sido analizado y se ha realizado seguimiento de la evolución de cada uno de los colaboradores con reporte a su ARL correspondiente.`,
            documents: [
                { name: 'Ver más información', file: '/documents/estadisticas-covid19.pdf' },
            ],
            subcategories: [
                {
                    title: 'Informes de Seguimiento y Prevención COVID-19',
                    documents: [
                        // Lista de actas de reunión
                        { name: 'Acta Reunión No 65', file: '/documents/actas/acta-65.pdf' },
                        { name: 'Acta Reunión No 64', file: '/documents/actas/acta-64.pdf' },
                        // ... Continúa con las demás actas hasta la No 11
                        { name: 'Acta Reunión No 11', file: '/documents/actas/acta-11.pdf' },
                    ],
                },
                {
                    title: 'Actividades Realizadas',
                    documents: [
                        { name: 'Estrategias implementadas en el marco de la pandemia COVID-19', file: '/documents/actividades/estrategias-implementadas.pdf' },
                        { name: 'Apoyo brindado por los niños de la IGLESIA ANCLA COMUNIDAD DE FE', file: '/documents/actividades/apoyo-iglesia-ancla.pdf' },
                    ],
                },
            ],
        },
        {
            title: 'Reglamento Interno de Trabajo',
            documents: [
                { name: 'Descargar', file: '/documents/reglamento-interno-trabajo.pdf' },
            ],
        },
        {
            title: 'Certificación de Buenas Prácticas Clínicas',
            documents: [
                { name: 'Descargar', file: '/documents/certificacion-buenas-practicas.pdf' },
            ],
        },
        {
            title: 'Resolución de Habilitación',
            documents: [
                { name: 'Descargar', file: '/documents/resolucion-habilitacion.pdf' },
            ],
        },
        {
            title: 'Estados Financieros',
            documents: [
                { name: 'Descargar', file: '/documents/estados-financieros.pdf' },
            ],
        },
        {
            title: 'Portafolio de Servicios',
            documents: [
                { name: 'Descargar', file: '/documents/portafolio-servicios.pdf' },
            ],
        },
        {
            title: 'Services Portfolio',
            documents: [
                { name: 'Descargar', file: '/documents/services-portfolio.pdf' },
            ],
        },
    ]

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState(null)

    const MySwal = withReactContent(Swal)

    const openPDFModal = (document) => {
        MySwal.fire({
            title: document.name,
            html: (
                <div style={{ width: '100%', height: '500px' }}>
                    <iframe
                        src={document.file}
                        style={{ width: '100%', height: '100%' }}
                        frameBorder="0"
                    ></iframe>
                </div>
            ),
            width: '800px',
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                popup: 'pdf-modal'
            }
        })
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Documentación y Líneas de Atención">
                {/* Sección de Documentación */}
                <section className="documentacion-section pt_120 pb_110">
                    <div className="auto-container">
                        <div className="sec-title text-center mb_50">
                            <h2>Gestión Documental</h2>
                        </div>
                        <div className="row">
                            {/* Lista de Categorías */}
                            <div className="col-lg-4 col-md-5">
                                <div className="category-list">
                                    <h3>Categorías</h3>
                                    <ul>
                                        {categories.map((category, index) => (
                                            <li
                                                key={index}
                                                className={selectedCategory === index ? 'active' : ''}
                                                onClick={() => {
                                                    setSelectedCategory(index)
                                                    setSelectedSubcategory(null)
                                                }}
                                            >
                                                {category.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Lista de Documentos y Subcategorías */}
                            <div className="col-lg-8 col-md-7">
                                {selectedCategory !== null && (
                                    <div className="documents-section">
                                        {/* Tarjeta de la Categoría */}
                                        <div className="category-card">
                                            <h3>{categories[selectedCategory].title}</h3>
                                            {categories[selectedCategory].description && (
                                                <p>{categories[selectedCategory].description}</p>
                                            )}
                                            {/* Mostrar documentos si existen */}
                                            {categories[selectedCategory].documents.length > 0 && (
                                                <ul className="documents-list">
                                                    {categories[selectedCategory].documents.map((doc, idx) => (
                                                        <li key={idx} onClick={() => openPDFModal(doc)}>
                                                            {doc.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        {/* Mostrar subcategorías si existen */}
                                        {categories[selectedCategory].subcategories && (
                                            <div className="subcategories">
                                                {categories[selectedCategory].subcategories.map((subcat, idx) => (
                                                    <div key={idx} className="subcategory-card">
                                                        <h4
                                                            className={selectedSubcategory === idx ? 'active' : ''}
                                                            onClick={() =>
                                                                setSelectedSubcategory(
                                                                    selectedSubcategory === idx ? null : idx
                                                                )
                                                            }
                                                        >
                                                            {subcat.title}
                                                            <span className="toggle-icon">
                                                                {selectedSubcategory === idx ? '-' : '+'}
                                                            </span>
                                                        </h4>
                                                        {selectedSubcategory === idx && (
                                                            <>
                                                                {subcat.description && (
                                                                    <p>{subcat.description}</p>
                                                                )}
                                                                {subcat.documents.length > 0 && (
                                                                    <ul className="documents-list">
                                                                        {subcat.documents.map((doc, idx2) => (
                                                                            <li key={idx2} onClick={() => openPDFModal(doc)}>
                                                                                {doc.name}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {selectedCategory === null && (
                                    <div className="no-category-selected">
                                        <p>Selecciona una categoría para ver la información y los documentos.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Sección de Documentación Fin */}

                {/* Sección de Líneas de Atención por Sede */}
                <section className="sedes-section pt_120 pb_110 bg-color-1">
                    <div className="auto-container">
                        <div className="sec-title text-center mb_50">
                            <h2>Líneas de Atención por Sede</h2>
                        </div>

                        {/* Acordeón para Sedes */}
                        <Accordion allowZeroExpanded>
                            {/* Sede 1 */}
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Sede 1, Carrera 50 No 80 - 90
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="sede">
                                        <div className="row">
                                            {/* Tarjeta de Contacto */}
                                            <div className="col-lg-6">
                                                <div className="contact-card">
                                                    <h4>Contactos</h4>
                                                    <ul className="contact-list">
                                                        <li><strong>Call Center:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:0</Link></li>
                                                        <li><strong>Urgencias:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:100</Link></li>
                                                        <li><strong>Admisiones:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:101</Link></li>
                                                        <li><strong>Cirugía:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:106</Link></li>
                                                        <li><strong>Neurofisiología:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:110</Link></li>
                                                        <li><strong>Unidad Renal:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:125</Link></li>
                                                        <li><strong>Imágenes Diagnósticas y Endoscopia:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:214</Link></li>
                                                        <li><strong>Laboratorio de Patología:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:203</Link></li>
                                                        <li><strong>Diagnóstico Cardiovascular:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:370</Link></li>
                                                        <li><strong>Hemodinamia:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:371</Link></li>
                                                        <li><strong>Laboratorio Clínico:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:472</Link></li>
                                                        <li><strong>Radioterapia:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:141</Link></li>
                                                        <li><strong>Correo Electrónico:</strong> <Link href="mailto:radioterapia@clinicadelacosta.co">radioterapia@clinicadelacosta.co</Link></li>
                                                        <li><strong>Línea de WhatsApp:</strong> <Link href="https://wa.me/573124867987" target="_blank">+57 312 486 7987</Link></li>
                                                        <li><strong>Contacto de Atención al Usuario:</strong> <Link href="tel:+576053369999">+57 (605) 3369999 EXT:112</Link></li>
                                                        <li><strong>Correo Electrónico:</strong> <Link href="mailto:trabajosocial@clinicadelacosta.co">trabajosocial@clinicadelacosta.co</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Tarjeta de Especialidades */}
                                            <div className="col-lg-6">
                                                <div className="specialties-card">
                                                    <h4>Especialidades Médicas / Estudios</h4>
                                                    <ul className="specialties-list">
                                                        <li>Cardiología</li>
                                                        <li>Cirugía General</li>
                                                        {/* Agrega más especialidades si las hay */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>

                            {/* Repite el mismo patrón para las demás sedes */}
                            {/* Sede 3 */}
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Sede 3, Carrera 50 No 80 - 149
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="sede">
                                        <div className="row">
                                            {/* Tarjeta de Contacto */}
                                            <div className="col-lg-6">
                                                <div className="contact-card">
                                                    <h4>Contactos</h4>
                                                    <ul className="contact-list">
                                                        <li><strong>Directo:</strong> <Link href="tel:+576053369907">+57 (605) 3369907</Link> / <Link href="tel:+576053369908">+57 (605) 3369908</Link></li>
                                                        <li><strong>Línea de WhatsApp:</strong> <Link href="https://wa.me/573054704510" target="_blank">+57 305 470 4510</Link> / <Link href="https://wa.me/573218150179" target="_blank">+57 321 815 0179</Link></li>
                                                        <li><strong>Correo Electrónico:</strong> <Link href="mailto:consultaexterna@clinicadelacosta.co">consultaexterna@clinicadelacosta.co</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Tarjeta de Especialidades */}
                                            <div className="col-lg-6">
                                                <div className="specialties-card">
                                                    <h4>Especialidades Médicas / Estudios</h4>
                                                    <ul className="specialties-list">
                                                        <li>Cardiología</li>
                                                        <li>Cirugía General</li>
                                                        <li>Dolor y Cuidados Paliativos – No Oncológico</li>
                                                        <li>Endocrinología</li>
                                                        <li>Ginecobstetricia</li>
                                                        <li>Hematología</li>
                                                        {/* Agrega más especialidades según corresponda */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>

                            {/* Sede 4 - Carrera 50 No 80 - 144 */}
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Sede 4, Carrera 50 No 80 - 144
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="sede">
                                        <div className="row">
                                            {/* Tarjeta de Contacto */}
                                            <div className="col-lg-6">
                                                <div className="contact-card">
                                                    <h4>Contactos</h4>
                                                    <ul className="contact-list">
                                                        <li><strong>Directo:</strong> <Link href="tel:+576053369966">+57 (605) 3369966</Link> / <Link href="tel:+576053369965">+57 (605) 3369965</Link></li>
                                                        <li><strong>Línea de WhatsApp:</strong> <Link href="https://wa.me/573017996077" target="_blank">+57 301 799 6077</Link></li>
                                                        <li><strong>Correo Electrónico:</strong> <Link href="mailto:resonancia@clinicadelacosta.co">resonancia@clinicadelacosta.co</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Tarjeta de Especialidades */}
                                            <div className="col-lg-6">
                                                <div className="specialties-card">
                                                    <h4>Especialidades Médicas</h4>
                                                    <ul className="specialties-list">
                                                        <li>Cardiología</li>
                                                        <li>Cirugía Cardiovascular</li>
                                                        <li>Nefrología</li>
                                                        <li>Cardiología Pediátrica</li>
                                                        {/* Agrega más especialidades según corresponda */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>

                            {/* Sede 4 - Carrera 50 No 80 - 178 */}
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Sede 4, Carrera 50 No 80 - 178
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="sede">
                                        <div className="row">
                                            {/* Tarjeta de Contacto */}
                                            <div className="col-lg-6">
                                                <div className="contact-card">
                                                    <h4>Contactos</h4>
                                                    <ul className="contact-list">
                                                        <li><strong>Directo:</strong> <Link href="tel:+576053369966">+57 (605) 3369966</Link> / <Link href="tel:+576053369965">+57 (605) 3369965</Link></li>
                                                        <li><strong>Línea de WhatsApp:</strong> <Link href="https://wa.me/573108293570" target="_blank">+57 310 829 3570</Link></li>
                                                        <li><strong>Correo Electrónico:</strong> <Link href="mailto:citasmedicas@clinicadelacosta.co">citasmedicas@clinicadelacosta.co</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Tarjeta de Especialidades */}
                                            <div className="col-lg-6">
                                                <div className="specialties-card">
                                                    <h4>Especialidades Médicas / Estudios</h4>
                                                    <ul className="specialties-list">
                                                        <li>Cirugía General</li>
                                                        <li>Cirugía Pediátrica</li>
                                                        <li>Endocrinología</li>
                                                        <li>Ortopedia y Traumatología</li>
                                                        <li>Genética</li>
                                                        {/* Agrega más especialidades según corresponda */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
                {/* Sección de Líneas de Atención Fin */}
            </Layout>
        </>
    )
}
