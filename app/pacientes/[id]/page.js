'use client';
import { useParams, useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function PacientesDetails() {
    const { id } = useParams();
    const [pageData, setPageData] = useState(null);
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                // Obtener el menú de subcategorías de "Pacientes"
                const menuRef = collection(db, 'pacientes');
                const menuSnapshot = await getDocs(menuRef);
                const menu = menuSnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().nombre // Asegúrate de que 'nombre' es el campo que contiene el título de cada subcategoría
                }));
                setMenuList(menu);

                // Obtener datos específicos de la página según el `id`
                const docRef = doc(db, 'pacientes', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPageData(docSnap.data());
                } else {
                    console.log('No existe el documento');
                }
            } catch (error) {
                console.error('Error al obtener el documento:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [id]);

    const handleMenuClick = (menuId) => {
        router.push(`/pacientes/${menuId}`);
    };

    const { nombre, bannerUrl, ...dynamicContent } = pageData || {}; 

    return (
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle={nombre || "Detalles"}>
            <section className="page-details pt_120 pb_110">
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Menú de subcategorías de Pacientes */}
                        <div className="col-lg-3 col-md-4 col-sm-12 sidebar-side">
                            <div className="menu-list">
                                <h3>Pacientes</h3>
                                <ul>
                                    {menuList.map((menu, index) => (
                                        <li
                                            key={index}
                                            className={id === menu.id ? 'active' : ''}
                                            onClick={() => handleMenuClick(menu.id)}
                                        >
                                            {menu.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contenido de la página */}
                        <div className="col-lg-9 col-md-8 col-sm-12 content-side">
                            {loading ? (
                                <p>Cargando contenido, por favor espera...</p>
                            ) : (
                                <div className="page-content">
                                    {bannerUrl && (
                                        <div className="banner-image">
                                            <img src={bannerUrl} alt="Banner de la página" />
                                        </div>
                                    )}

                                    <h2>{nombre || "Título no disponible"}</h2>

                                    {Object.entries(dynamicContent).map(([key, value], index) => (
                                        <div key={index} className="section">
                                            <h3 className="section-title">{formatTitle(key)}</h3>
                                            <p>{value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .menu-list {
                    padding: 20px;
                    border-radius: 8px;
                }
                .menu-list h3 {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .menu-list ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .menu-list li {
                    padding: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .menu-list li.active {
                    font-weight: bold;
                }
                .menu-list li:hover {
                    background-color: #f0f0f0;
                }
                .page-content h2 {
                    font-size: 28px;
                    font-weight: bold;
                    margin-top: 20px;
                }
                .banner-image img {
                    width: 100%;
                    height: auto;
                    margin-bottom: 20px;
                    border-radius: 8px;
                }
                .section {
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .section:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                .section-title {
                    padding: 10px;
                    border-radius: 5px;
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    transition: background-color 0.3s ease;
                }
                .section-title:hover {
                    background-color: #f0f0f0;
                }
                .section p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-top: 10px;
                }
            `}</style>
        </Layout>
    );
}

// Función para formatear las claves en títulos
const formatTitle = (key) => {
    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2') 
        .replace(/_/g, ' ') 
        .replace(/\b\w/g, char => char.toUpperCase()); 
};
