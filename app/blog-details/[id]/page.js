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

  const { title, content, image, author, date } = blogData;

  const fullUrl =
    typeof window !== 'undefined'
      ? window.location.origin + pathname
      : '';

  const textContent = content?.replace(/<[^>]+>/g, '') || '';
  const summary = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');

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
        <title>{title} | Mi Blog</title>
        <meta name="description" content={summary} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="container mt-5">
        <div className="row">
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

                <div className="share-icons mt-4 d-flex justify-content-end">
                  <span className="mr-3 font-weight-bold">Comparte este blog:</span>

                  <FacebookShareButton url={fullUrl} quote={title} hashtag={`#${title.replace(/ /g, '')}`}>
                    <FaFacebookF size={24} className="mx-2 text-primary" />
                  </FacebookShareButton>

                  <TwitterShareButton url={fullUrl} title={title} hashtags={[title.replace(/ /g, '')]}>
                    <FaTwitter size={24} className="mx-2 text-info" />
                  </TwitterShareButton>

                  <LinkedinShareButton url={fullUrl} title={title} summary={summary}>
                    <FaLinkedinIn size={24} className="mx-2 text-primary" />
                  </LinkedinShareButton>

                  <WhatsappShareButton url={fullUrl} title={title}>
                    <FaWhatsapp size={24} className="mx-2 text-success" />
                  </WhatsappShareButton>
                </div>
              </header>

              <img src={image} alt={title} className="img-fluid blog-image" />

              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>
          </div>

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

      <style jsx>{`
        .blog-details { /* ... */ }
        .share-icons { /* ... */ }
      `}</style>
    </Layout>
  );
}
