'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Head from 'next/head';

// Importaciones de react-share
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  WhatsappShareButton 
} from "react-share";

import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaWhatsapp 
} from 'react-icons/fa';

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [blogData, setBlogData] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1) Cargar datos del post individual (CLIENT-SIDE)
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlogData(docSnap.data());
        } else {
          console.error('No existe el documento');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del blog:', error);
      } finally {
        setLoading(false);
      }
    };

    // 2) Cargar las últimas entradas
    const fetchRecentBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentBlogs(blogs);
      } catch (error) {
        console.error('Error al obtener los últimos blogs:', error);
      }
    };

    if (id) fetchBlogData();
    fetchRecentBlogs();
  }, [id]);

  if (loading) {
    return <p>Cargando los detalles del blog...</p>;
  }

  if (!blogData) {
    return (
      <Layout footerStyle={1}>
        <div className="container">
          <h1>Blog no encontrado</h1>
          <button onClick={() => router.back()} className="btn btn-primary">
            Regresar
          </button>
        </div>
      </Layout>
    );
  }

  // -- Datos del post extraídos de la BD
  const { title, content, image, author, date } = blogData;

  // -- Construimos la URL final (para compartir y canonical)
  const fullUrl =
    typeof window !== 'undefined'
      ? window.location.origin + pathname
      : '';

  // -- Generamos un "resumen" desde el contenido HTML (ejemplo: primeros 150 caracteres)
  const textContent = content?.replace(/<[^>]+>/g, '') || '';
  const summary = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');

  // -- Datos estructurados (JSON-LD) para describir el artículo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": summary,
    "image": image,
    "author": author || "Admin",
    "datePublished": date,
    "url": fullUrl
  };

  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Head>
        {/* Title y meta descripción */}
        <title>{title} | Mi Blog</title>
        <meta name="description" content={summary} />

        {/* Canónico */}
        <link rel="canonical" href={fullUrl} />

        {/* Metadatos Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />

        {/* Datos estructurados en formato JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="container mt-5">
        <div className="row">
          {/* ========== Contenido principal del blog ========== */}
          <div className="col-lg-8">
            <article className="blog-details">
              <header className="blog-header">
                <h1 className="display-4">{title}</h1>
                <p className="lead">
                  Por <span className="author">{author || 'Admin'}</span> el{' '}
                  <time dateTime={date} className="date">
                    {new Date(date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </p>

                {/* Botones para compartir */}
                <div className="share-icons mt-4 d-flex justify-content-end">
                  <span className="mr-3 font-weight-bold">Comparte este blog:</span>

                  {/* Facebook */}
                  <FacebookShareButton url={fullUrl} quote={title} hashtag="#MiBlog">
                    <FaFacebookF size={24} className="mx-2 text-primary" />
                  </FacebookShareButton>

                  {/* Twitter (X) */}
                  <TwitterShareButton url={fullUrl} title={title} hashtags={["MiBlog"]}>
                    <FaTwitter size={24} className="mx-2 text-info" />
                  </TwitterShareButton>

                  {/* LinkedIn */}
                  <LinkedinShareButton
                    url={fullUrl}
                    title={title}
                    summary={summary}
                    source={typeof window !== 'undefined' ? window.location.origin : ''}
                  >
                    <FaLinkedinIn size={24} className="mx-2 text-primary" />
                  </LinkedinShareButton>

                  {/* WhatsApp */}
                  <WhatsappShareButton url={fullUrl} title={title}>
                    <FaWhatsapp size={24} className="mx-2 text-success" />
                  </WhatsappShareButton>
                </div>
              </header>

              {/* Imagen principal */}
              <img
                src={image || 'https://via.placeholder.com/800x400'}
                alt={title}
                className="img-fluid blog-image"
              />

              {/* Contenido del blog en HTML (¡cuidado con XSS!) */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>
          </div>

          {/* ========== Sidebar con los últimos blogs ========== */}
          <div className="col-lg-4">
            <aside className="sidebar mt-4 mt-lg-0">
              <h4 className="mb-3">Últimos Blogs</h4>
              <ul className="list-unstyled">
                {recentBlogs.map((blog) => (
                  <li key={blog.id} className="mb-2">
                    <a
                      href={`/blog-details/${blog.id}`}
                      className="text-decoration-none text-dark font-weight-bold"
                    >
                      {blog.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>

      {/* ========== Estilos ========== */}
      <style jsx>{`
        .blog-details {
          background-color: #f8f9fa;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        .blog-header h1 {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }
        .blog-header .lead {
          font-size: 1.2rem;
          color: #6c757d;
          margin-bottom: 20px;
        }
        .blog-header .author,
        .blog-header .date {
          font-weight: bold;
          color: #343a40;
        }
        .blog-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-top: 20px;
          margin-bottom: 30px;
        }
        .blog-content h2 {
          margin-top: 30px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }
        .blog-content p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 20px;
          color: #555;
        }
        .blog-content ul {
          margin-left: 20px;
          list-style: disc;
        }
        .blog-content ul li {
          margin-bottom: 10px;
        }
        blockquote {
          font-style: italic;
          border-left: 5px solid #007bff;
          padding-left: 20px;
          margin: 30px 0;
          color: #555;
        }
        .sidebar {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        .sidebar h4 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #333;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
        }
        .sidebar ul li {
          margin-bottom: 10px;
        }
        .sidebar ul li a {
          color: #007bff;
          text-decoration: none;
        }
        .sidebar ul li a:hover {
          text-decoration: underline;
        }
        .share-icons {
          display: flex;
          align-items: center;
        }
        .share-icons .mx-2 {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
}
