'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import SidebarMenu from "@/components/elements/SidebarMenu"

export default function Service() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes
    const [sections, setSections] = useState([]); // Estado para almacenar las secciones del acordeón
    const [titulo, setTitulo] = useState(''); // Estado para almacenar el título

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    useEffect(() => {
        // Obtener sedes
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, 'sedes');
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map(doc => {
                    const nombreCompleto = doc.data().nombre;
                    const nombreProcesado = nombreCompleto.replace('Clínica de la Costa - ', ''); // Eliminamos "Clínica de la Costa -"
                    return nombreProcesado; // Devolvemos solo la parte final
                });
                setSedes(sedesList); // Actualizamos el estado con las sedes
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        // Obtener título y secciones del documento "nosotros"
        const fetchNosotrosData = async () => {
            try {
                const nosotrosDocRef = doc(db, 'nosotros', 'PR56zzvdKWdtyz1NZ6fp');
                const nosotrosDoc = await getDoc(nosotrosDocRef);

                if (nosotrosDoc.exists()) {
                    const data = nosotrosDoc.data();
                    setTitulo(data.nombre || ''); // Establecemos el título en el estado
                    setSections(data.sections || []); // Actualizamos el estado con las secciones
                } else {
                    console.log("No se encontró el documento de nosotros");
                }
            } catch (error) {
                console.error("Error al obtener los datos de nosotros:", error);
            }
        };

        fetchSedes();
        fetchNosotrosData();
    }, []);

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner principal */}
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-4"
                    style={{
                        backgroundColor: '#1A1A3B', // Fondo oscuro
                        borderRadius: '8px',
                        marginBottom: '10px',
                        marginTop: '20px',
                        padding: '20px',
                    }}
                >
                    <div className="container">
                        <div
                            className="d-flex flex-column flex-md-row align-items-center"
                            style={{
                                gap: '20px',
                            }}
                        >
                            {/* Imagen */}
                            <div style={{ flex: '1.5' }}> {/* Incrementamos el valor de flex para hacer la imagen más grande */}
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
                                    alt="Imagen de Servicio"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px', // Aumentamos el tamaño máximo
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            {/* Contenido */}
                            <div style={{ flex: '1' }}>
                                <Link href="/servicios" legacyBehavior>
                                    <a
                                        className="text-decoration-none mb-3 d-inline-flex align-items-center"
                                        style={{
                                            fontSize: '16px',
                                            color: '#F0E7D8',
                                            marginBottom: '10px',
                                            marginTop:"50px"
                                        }}
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i> Todos los Servicios
                                    </a>
                                </Link>
                                <h1
                                    style={{
                                        color: '#F0E7D8',
                                        fontSize: '32px',
                                        margin: '20px 0',
                                    }}
                                >
                                    {titulo || 'Cargando...'}
                                </h1>
                                <div className="d-flex mb-4" style={{ gap: '10px' }}>
                                <a
    href="/appointment"
    className="d-flex align-items-center"
    style={{
        backgroundColor: '#2C2C5B',
        padding: '10px 20px',
        borderRadius: '8px',
        color: '#F0E7D8',
        fontWeight: 'bold',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        border: 'none',
    }}
>
    <i className="fas fa-calendar-alt"></i> AGENDA TU CITA
</a>

                                    <div
                                        className="d-flex align-items-center"
                                        style={{
                                            backgroundColor: '#2C2C5B',
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            color: '#F0E7D8',
                                            fontWeight: 'bold',
                                            display: 'inline-flex',
                                            gap: '10px',
                                        }}
                                    >
                                        <i className="fas fa-phone"></i>(605) 3369999 Ext. 1.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenedor principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú lateral */}
                            <div className="col-12 col-md-3">
                            <SidebarMenu /> {/* Usamos el componente SidebarMenu */}
                        </div>

                            {/* Contenido principal */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div
                                        className="d-flex justify-content-between border-bottom pb-4"
                                        style={{ gap: '20px' }}
                                    >
                                        {/* Descripción */}
                                        <div className="col-12 col-md-6 px-3">
                                            <p
                                                className="text-muted text-uppercase mb-2"
                                                style={{
                                                    color: '#F0E7D8',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Descripción:
                                            </p>
                                            <div
                                                style={{
                                                    fontSize: '16px',
                                                    color: '#3B3B3B',
                                                    textAlign: 'justify', // Justificar texto
                                                    lineHeight: '1.8',
                                                }}
                                            >
                                                La Clínica de la Costa se ha posicionado como líder clave en la atención médica de alta complejidad, reconocida en Colombia y América Latina por su excelencia en servicios especializados. <br /><br />
                                                Con más de 3 décadas de experiencia como centro hospitalario de alta complejidad, Clínica de la Costa opera con un equipo de 252 médicos y más de 651 personas dedicadas. Su crecimiento se apoya en principios fundamentales como la calidad en el cuidado de la salud, el compromiso con la gestión de conocimiento y la docencia, el avance en investigación clínica y una fuerte responsabilidad hacia la comunidad.
                                            </div>
                                        </div>
                                        {/* Sedes */}
                                        <div className="col-12 col-md-6 px-3">
                                            <p
                                                className="text-muted text-uppercase mb-2"
                                                style={{
                                                    color: '#F0E7D8',
                                                }}
                                            >
                                                Disponible en las sedes:
                                            </p>
                                            <div className="d-flex flex-wrap" style={{ gap: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                                {sedes.map((sede, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            padding: '5px 15px',
                                                            borderRadius: '20px',
                                                            backgroundColor: '#3B3B3B',
                                                            color: '#F0E7D8',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {sede}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Acordeón */}
                                    <div
                                        className="accordion mt-4"
                                        id="accordionExample"
                                        style={{ width: '100%' }}
                                    >
                                        {sections.map(({ title, content }, index) => (
                                            <div
                                                className="card"
                                                style={{
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    marginBottom: '15px',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                }}
                                                key={index}
                                            >
                                                <div
                                                    className="card-header"
                                                    id={`heading${index}`}
                                                    style={{
                                                        backgroundColor: '#2C2C5B',
                                                        padding: '0',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => handleToggle(index)}
                                                            style={{
                                                                color: isActive.key === index ? '#F0E7D8' : '#F0E7D8CC',
                                                                backgroundColor: 'transparent',
                                                                textDecoration: 'none',
                                                                padding: '15px 20px',
                                                                display: 'block',
                                                                width: '100%',
                                                                textAlign: 'left',
                                                                fontWeight: 'bold',
                                                                fontSize: '16px',
                                                                borderRadius: '8px',
                                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                                            }}
                                                        >
                                                            {title}
                                                            <i
                                                                className={`fas fa-chevron-${isActive.key === index ? 'up' : 'down'}`}
                                                                style={{ float: 'right' }}
                                                            ></i>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id={`collapse${index}`}
                                                    className={`collapse ${isActive.key === index ? 'show' : ''}`}
                                                    aria-labelledby={`heading${index}`}
                                                    data-parent="#accordionExample"
                                                >
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            padding: '20px',
                                                            color: '#3B3B3B',
                                                            backgroundColor: '#FFFFFF',
                                                            borderBottomLeftRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        <p>{content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
