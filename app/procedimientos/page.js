// 'use client';

// import { useState } from 'react';
// import Layout from "@/components/layout/Layout";
// import { db } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";

// export default function UploadSections() {
//     const [sectionTitle, setSectionTitle] = useState("");
//     const [details, setDetails] = useState([]);
//     const [currentDetail, setCurrentDetail] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     // Añadir un detalle a la lista
//     const addDetail = () => {
//         if (currentDetail.trim()) {
//             setDetails([...details, currentDetail.trim()]);
//             setCurrentDetail(""); // Limpiar el campo de entrada de detalle
//         }
//     };

//     // Eliminar un detalle de la lista
//     const removeDetail = (index) => {
//         setDetails(details.filter((_, i) => i !== index));
//     };

//     // Subir la sección con los detalles a Firebase
//     const uploadSectionToFirebase = async () => {
//         if (!sectionTitle.trim() || details.length === 0) {
//             alert("El título de la sección y los detalles son obligatorios.");
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const newSection = {
//                 section: sectionTitle.trim(),
//                 details,
//             };

//             await addDoc(collection(db, "instructions"), newSection);
//             alert("Sección subida correctamente a Firebase");
//             setSectionTitle(""); // Limpiar el campo del título
//             setDetails([]); // Limpiar los detalles
//         } catch (error) {
//             console.error("Error al subir la sección a Firebase: ", error);
//             alert("Hubo un error al subir la sección. Por favor, intenta nuevamente.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Layout footerStyle={1}>
//             <div className="container mt-4">
//                 <h3>Subir Secciones a Firebase</h3>
//                 <div className="form-group">
//                     <label htmlFor="sectionTitle">Título de la Sección</label>
//                     <input
//                         id="sectionTitle"
//                         type="text"
//                         className="form-control"
//                         value={sectionTitle}
//                         onChange={(e) => setSectionTitle(e.target.value)}
//                         placeholder="Ingrese el título de la sección"
//                     />
//                 </div>
//                 <div className="form-group mt-3">
//                     <label htmlFor="currentDetail">Agregar Detalle</label>
//                     <input
//                         id="currentDetail"
//                         type="text"
//                         className="form-control"
//                         value={currentDetail}
//                         onChange={(e) => setCurrentDetail(e.target.value)}
//                         placeholder="Ingrese un detalle"
//                     />
//                     <button className="btn btn-secondary mt-2" onClick={addDetail}>
//                         Añadir Detalle
//                     </button>
//                 </div>
//                 <div className="mt-3">
//                     <h5>Detalles Agregados:</h5>
//                     <ul className="list-group">
//                         {details.map((detail, index) => (
//                             <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                                 {detail}
//                                 <button
//                                     className="btn btn-danger btn-sm"
//                                     onClick={() => removeDetail(index)}
//                                 >
//                                     Eliminar
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <button
//                     className="btn btn-primary mt-4"
//                     onClick={uploadSectionToFirebase}
//                     disabled={isLoading}
//                 >
//                     {isLoading ? "Subiendo..." : "Subir Sección"}
//                 </button>
//             </div>

//             <style jsx>{`
//                 .container {
//                     max-width: 600px;
//                     margin: 0 auto;
//                 }
//                 .form-group {
//                     margin-bottom: 20px;
//                 }
//                 ul {
//                     padding: 0;
//                     list-style: none;
//                 }
//                 li {
//                     margin-bottom: 10px;
//                 }
//             `}</style>
//         </Layout>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PreparationDetails() {
    const [titulo] = useState("Preparación para Exámenes Diagnósticos");
    const [data, setData] = useState([]); // Almacena las secciones y detalles
    const [filteredData, setFilteredData] = useState([]); // Almacena las secciones filtradas
    const [isLoading, setIsLoading] = useState(true); // Indica si los datos están cargando
    const [searchQuery, setSearchQuery] = useState(""); // Controla el texto del buscador
    const [isActive, setIsActive] = useState(0); // Controla qué acordeón está abierto (por defecto el primero)

    // Fetch data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Inicia el indicador de carga
                const querySnapshot = await getDocs(collection(db, "instructions")); // Obtiene los documentos
                const firebaseData = querySnapshot.docs.map(doc => doc.data()); // Mapea los datos
                setData(firebaseData); // Asigna directamente los datos al estado
                setFilteredData(firebaseData); // Inicializa los datos filtrados
            } catch (error) {
                console.error("Error al obtener los datos de Firebase: ", error);
            } finally {
                setIsLoading(false); // Detiene el indicador de carga
            }
        };

        fetchData();
    }, []);

    // Maneja el filtro por el buscador
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            setFilteredData(data); // Restablece los datos originales si no hay búsqueda
        } else {
            const filtered = data.filter(instruction =>
                instruction.section.toLowerCase().includes(query) ||
                instruction.details.some(detail => detail.toLowerCase().includes(query))
            );
            setFilteredData(filtered);
        }
    };

    // Función para procesar y dar formato al texto dinámico
    const procesarTexto = (texto) => {
        if (typeof texto !== 'string') return texto;

        const lineas = texto.split(/(?<=\.)\s+/); // Divide por puntos seguidos de espacios
        return lineas.map((linea, index) => {
            if (linea.toUpperCase().includes("RECOMENDACIONES")) {
                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: '#f9f9f9',
                            padding: '10px',
                            borderLeft: '5px solid #007bff',
                            marginBottom: '10px'
                        }}
                    >
                        <strong>{linea}</strong>
                    </div>
                );
            } else if (linea.match(/^\d+\./)) {
                return <li key={index} style={{ marginLeft: '20px' }}>{linea}</li>;
            } else {
                return <p key={index} style={{ marginBottom: '10px' }}>{linea}</p>;
            }
        });
    };

    return (
        <Layout footerStyle={1}>
            {/* Banner Principal */}
            <div
                className="d-flex flex-column align-items-center p-4"
                style={{
                    backgroundColor: '#1A1A3B',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    color: '#fff',
                }}
            >
                <ServiceHeader titulo={titulo} />
                <h2 className="mt-3">Listado de Preparación para Procedimientos</h2>
            </div>

            {/* Buscador */}
            <div className="container my-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por sección o detalles..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Contenido Principal */}
            <div className="service-details pb_110">
                <div className="container">
                    <div className="row">
                        {/* Menú Lateral */}
                        <div className="col-12 col-md-3">
                            <ServicesMenu />
                        </div>

                        {/* Contenido */}
                        <div className="col-12 col-md-9">
                            <div className="pt-4">
                                {isLoading ? (
                                    <p>Cargando datos...</p>
                                ) : (
                                    filteredData.map((instruction, index) => (
                                        <div key={index} className="mb-4">
                                            <div
                                                className="accordion-header"
                                                onClick={() => setIsActive(isActive === index ? null : index)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === index ? '#007bff' : '#f9f9f9',
                                                    color: isActive === index ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    fontSize: '18px',
                                                }}
                                            >
                                                {instruction.section}
                                            </div>
                                            {isActive === index && (
                                                <div className="accordion-body">
                                                    {instruction.details?.map((detail, i) => (
                                                        <div key={i}>{procesarTexto(detail)}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .category-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #1A1A3B;
                    margin-bottom: 15px;
                }

                .accordion-header:hover {
                    background-color: #007bff !important;
                    color: #fff !important;
                }
            `}</style>
        </Layout>
    );
}
