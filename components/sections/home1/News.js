import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function News() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener datos de Firestore
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error obteniendo blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Función para truncar texto
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  if (loading) {
    return <p>Cargando artículos...</p>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
  }

  if (!blogs || blogs.length === 0) {
    return null; // Retorna nada si no hay blogs
  }

  return (
    <section className="news-section sec-pad bg-color-1">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Nuestro Blog</span>
          <h2>Consulta nuestros artículos más <br />recientes</h2>
        </div>
        <div className="row clearfix">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12 news-block">
              <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                <div className="inner-box">
                  <figure className="image-box">
                    <Link href={`/blog-details/${blog.id}`}>
                      <img src={blog.image} alt={blog.title} />
                    </Link>
                  </figure>
                  <div className="lower-content">
                    <ul className="post-info mb_15 clearfix">
                      <li><Link href={`/blog-details/${blog.id}`}>{blog.author || "Admin"}</Link></li>
                      <li>{new Date(blog.date).toLocaleDateString("es-ES", { year: 'numeric', month: 'short', day: 'numeric' })}</li>
                      <li>{blog.comments || 0} Comentarios</li>
                    </ul>
                    <h3><Link href={`/blog-details/${blog.id}`}>{blog.title}</Link></h3>
                    <p>{truncateText(blog.content, 150)}</p> {/* Limita a 150 caracteres */}
                    <div className="link">
                      <Link href={`/blog-details/${blog.id}`}><span>Leer más</span></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
