"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Cantidad de posts por página
  const postsPerPage = 3;

  // Carga los blogs y las visitas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsSnap = await getDocs(collection(db, "blogs"));
        const visitsSnap = await getDocs(collection(db, "visitas"));

        // Extraemos data de ambas colecciones
        const blogsData = blogsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const visitsData = visitsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Unimos "blogs" con "visitas"
        const merged = blogsData.map((blog) => {
          const foundVisit = visitsData.find((v) => v.id === blog.id);
          return {
            ...blog,
            visits: foundVisit?.visitas || 0, // si no existe, 0
          };
        });

        setBlogs(merged);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  // Manejo de la búsqueda al hacer submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Al enviar, guardamos el término en "searchQuery"
    setSearchQuery(searchTerm);
    // Regresamos a la primera página
    setCurrentPage(1);
  };

  // Función para crear un resumen recortando HTML
  const createSummary = (htmlContent, limit = 200) => {
    const textOnly = htmlContent.replace(/<[^>]+>/g, "");
    return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
  };

  // Ordenamos por visitas de mayor a menor
  const sortedBlogs = [...blogs].sort((a, b) => b.visits - a.visits);

  // Filtramos solo por título
  const filteredBlogs = sortedBlogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return blog.title?.toLowerCase().includes(query);
  });

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Top 5 con más visitas para el sidebar
  const topFive = sortedBlogs.slice(0, 5);

  return (
    <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Blog Sidebar">
      <div>
        {/* sidebar-page-container */}
        <section className="sidebar-page-container sec-pad-2">
          <div className="auto-container">
            <div className="row clearfix">
              {/* -- SIDEBAR -- */}
              <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                <div className="blog-sidebar default-sidebar mr_10">
                  {/* -- SEARCH WIDGET -- */}
                  {/* <div className="sidebar-widget search-widget">
                    <div className="search-form">
                      <form onSubmit={handleSearchSubmit}>
                        <div className="form-group">
                          <input
                            type="search"
                            name="search-field"
                            placeholder="Search by title"
                            required
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <button type="submit">
                            <i className="icon-27"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div> */}

                  {/* -- TOP 5 POSTS WIDGET -- */}
                  <div className="sidebar-widget category-widget">
                    <div className="widget-title">
                      <h3>Noticias detacadas</h3>
                    </div>
                    <div className="widget-content">
                      <ul className="category-list clearfix">
                        {topFive.map((post) => (
                          <li key={post.id}>
                            <Link href={`/blog-details/${post.id}`}>
                              {post.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Puedes agregar más widgets en el sidebar si lo deseas */}
                </div>
              </div>

              {/* -- CONTENT -- */}
              <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                <div className="blog-classic-content">
                  {/* -- LISTA DE BLOGS (CON PAGINACIÓN) -- */}
                  {currentBlogs.map((blog) => (
                    <div className="news-block-one" key={blog.id}>
                      <div className="inner-box">
                        <figure
                          className="image-box"
                          style={{
                            width: "416px",
                            height: "351px",
                            overflow: "hidden",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Link href={`/blog-details/${blog.id}`}>
                            <img
                              src={blog.image}
                              alt={blog.title || "blog image"}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
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
                            <li>{blog.date}</li>
                            
                          </ul>

                          {/* <h3>
                            <Link href={`/blog-details/${blog.id}`}>
                              {blog.title}
                            </Link>
                          </h3> */}
                          <p>{createSummary(blog.content)}</p>
                          <div className="link">
                            <Link href={`/blog-details/${blog.id}`}>
                              <span>Read More</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* -- PAGINACIÓN DINÁMICA -- */}
                  <div className="pagination-wrapper pt_20">
  <ul className="pagination clearfix">
    {Array.from({ length: totalPages }).map((_, i) => (
      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
        <button
          onClick={() => setCurrentPage(i + 1)}
          className="page-link"
          style={{ 
            border: "none",
            background: "none",
            padding: "8px 12px", // Ajusta el padding según tus necesidades
            margin: "0 5px",     // Ajusta el margen entre los botones
            borderRadius: "5px",   // Borde redondeado
            cursor: "pointer",
            color: currentPage === i + 1 ? "#fff" : "#007bff", // Cambia el color del texto de la página activa
            backgroundColor: currentPage === i + 1 ? "#007bff" : "transparent",  // Cambia el color de fondo de la página activa
            border: currentPage === i + 1 ? "none" : "1px solid #007bff", // Agrega un borde a las páginas inactivas
          }}


        >
          {i + 1}
        </button>
      </li>
    ))}
  </ul>
</div>

                  {/* Mensaje si no hay coincidencias */}
                  {filteredBlogs.length === 0 && (
                    <p>No posts found for "{searchQuery}".</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
