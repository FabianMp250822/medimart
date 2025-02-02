"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function News() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener datos de Firestore (blogs y visitas)
    const fetchBlogs = async () => {
      try {
        // Cargamos todos los posts
        const blogsSnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Cargamos la colección "visitas"
        const visitasSnapshot = await getDocs(collection(db, "visitas"));
        const visitasData = visitasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Unimos "blogs" con "visitas" basados en el ID
        const mergedData = blogsData.map((blog) => {
          // Buscamos si hay un documento de 'visitas' cuyo id coincida
          const found = visitasData.find((v) => v.id === blog.id);
          // Asignamos blog.visits
          return {
            ...blog,
            visits: found?.visitas || 0, // 0 si no se encontró
          };
        });

        setBlogs(mergedData);
      } catch (error) {
        console.error("Error obteniendo blogs y visitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Función para limpiar etiquetas HTML del texto
  const cleanText = (text) => {
    if (!text) return "";
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  // Función para truncar texto
  const truncateText = (text, maxLength) => {
    const clean = cleanText(text);
    if (clean.length > maxLength) {
      return clean.substring(0, maxLength) + "...";
    }
    return clean;
  };

  if (loading) {
    return <p>Cargando artículos...</p>; // Indicador de carga
  }

  if (!blogs || blogs.length === 0) {
    return <p>No hay artículos disponibles.</p>; // Mensaje si no hay blogs
  }

  // Ordenamos por número de visitas, de mayor a menor
  const sortedByVisits = [...blogs].sort((a, b) => b.visits - a.visits);

  // Mostramos solo los 3 primeros
  const topThree = sortedByVisits.slice(0, 3);

  return (
    <section className="news-section sec-pad bg-color-1">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Nuestro Blog</span>
          <h2>
            Consulta nuestros artículos más <br />
            recientes
          </h2>
        </div>

        <div className="row clearfix">
          {topThree.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12 news-block">
              <div
                className="news-block-one wow fadeInUp animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <figure className="image-box">
                    <Link href={`/blog-details/${blog.id}`}>
                      <img
                        src={blog.image}
                        alt={cleanText(blog.title)}
                      />
                    </Link>
                  </figure>
                  <div className="lower-content">
                    <ul className="post-info mb_15 clearfix">
                      <li>
                        <Link href={`/blog-details/${blog.id}`}>
                          {blog.author || "Admin"}
                        </Link>
                      </li>
                      <li>
                        {new Date(blog.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </li>
                      {/* <li>{blog.comments || 0} Comentarios</li> */}
                    </ul>
                    <h3>
                      <Link href={`/blog-details/${blog.id}`}>
                        {cleanText(blog.title)}
                      </Link>
                    </h3>
                    <p>{truncateText(blog.content, 150)}</p>
                    <div className="link">
                      <Link href={`/blog-details/${blog.id}`}>
                        <span>Leer más</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para ver la página blog-2 con más posts */}
        <div className="text-center" style={{ marginTop: "30px" }}>
          <Link href="/blog-2" className="theme-btn btn-one">
            <span>Ver más</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
