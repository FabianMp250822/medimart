// app/blog-details/[id]/BlogDetailsClient.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BlogDetailsClient({ blogData }) {
  const { id, title, content, image, author, date, video } = blogData;
  const [visits, setVisits] = useState(0);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const router = useRouter();

  // Función auxiliar para extraer el ID del video de YouTube
  const getYouTubeVideoID = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1);
      } else if (
        urlObj.hostname === "www.youtube.com" ||
        urlObj.hostname === "youtube.com"
      ) {
        return urlObj.searchParams.get("v");
      }
      return null;
    } catch (error) {
      console.error("URL de YouTube inválida:", error);
      return null;
    }
  };

  const videoID = video ? getYouTubeVideoID(video) : null;

  // Actualizar el contador de visitas
  useEffect(() => {
    let isMounted = true;

    async function updateVisits() {
      try {
        const visitsRef = doc(db, "visitas", id);
        const docSnap = await getDoc(visitsRef);
        let newCount;

        if (docSnap.exists()) {
          // Incrementa el valor de visitas de forma atómica
          await updateDoc(visitsRef, { visitas: increment(1) });
          const updatedSnap = await getDoc(visitsRef);
          newCount = updatedSnap.data().visitas;
        } else {
          // Si el documento no existe, lo crea con valor 1
          await setDoc(visitsRef, { visitas: 1 });
          newCount = 1;
        }

        if (isMounted) {
          setVisits(newCount);
        }
      } catch (error) {
        console.error("Error actualizando visitas:", error);
      }
    }

    updateVisits();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Consultar los blogs recientes ordenados por fecha descendente
  useEffect(() => {
    let isMounted = true;

    async function fetchRecentBlogs() {
      try {
        const blogsRef = collection(db, "blogs");
        // Ordenar por el campo "date" (formato "YYYY-MM-DD") de forma descendente y limitar a 5 resultados
        const q = query(blogsRef, orderBy("date", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const blogs = [];
        querySnapshot.forEach((docSnapshot) => {
          // Opcional: excluir el blog actual
          if (docSnapshot.id !== id) {
            blogs.push({ id: docSnapshot.id, ...docSnapshot.data() });
          }
        });

        if (isMounted) {
          setRecentBlogs(blogs);
        }
      } catch (error) {
        console.error("Error obteniendo blogs recientes:", error);
      }
    }

    fetchRecentBlogs();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // URL absoluta para compartir
  const fullUrl = `https://www.clinicadelacosta.com/blog-details/${id}`;

  return (
    <Layout headerStyle={2} footerStyle={1}>
      <div className="container mt-5">
        <div className="row">
          {/* Contenido principal */}
          <div className="col-lg-8">
            <article className="blog-details">
              <header className="blog-header">
                <h1 className="display-4">{title}</h1>
                <p className="lead">
                  Por <span className="author">{author || "Admin"}</span> el{" "}
                  <time dateTime={date} className="date">
                    {new Date(date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
                <p>Visitas: {visits}</p>
                {/* Botones de compartir */}
                <div className="share-icons mt-4 d-flex justify-content-end">
                  <span className="mr-3 font-weight-bold">
                    Comparte este blog:
                  </span>
                  <FacebookShareButton
                    url={fullUrl}
                    quote={title}
                    hashtag={`#${title.replace(/ /g, "")}`}
                  >
                    <FaFacebookF size={24} className="mx-2 text-primary" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={fullUrl}
                    title={title}
                    hashtags={[title.replace(/ /g, "")]}
                  >
                    <FaTwitter size={24} className="mx-2 text-info" />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={fullUrl}
                    title={title}
                    summary={content?.substring(0, 150)}
                  >
                    <FaLinkedinIn size={24} className="mx-2 text-primary" />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={fullUrl} title={title}>
                    <FaWhatsapp size={24} className="mx-2 text-success" />
                  </WhatsappShareButton>
                </div>
              </header>

              {/* Video de YouTube (si está disponible) */}
              {video && videoID && (
                <div className="my-4">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item"
                      src={`https://www.youtube.com/embed/${videoID}`}
                      title="Video de YouTube"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Imagen principal */}
              {image && (
                <img src={image} alt={title} className="img-fluid blog-image" />
              )}
              {/* Contenido HTML del blog */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>
          </div>

          {/* Sidebar con blogs recientes */}
          <div className="col-lg-4 mt-4">
            <aside className="sidebar">
              <h3>Blogs Recientes</h3>
              {recentBlogs.length > 0 ? (
                <ul className="list-group">
                  {recentBlogs.map((blog) => (
                    <li key={blog.id} className="list-group-item">
                      <Link href={`/blog-details/${blog.id}`}>
                        {blog.title}
                      </Link>
                      <br />
                      <small>
                        {new Date(blog.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay blogs recientes.</p>
              )}
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
