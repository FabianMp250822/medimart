"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { doc, updateDoc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BlogDetailsClient({ blogData, recentBlogs }) {
  const { id, title, content, image, author, date } = blogData;
  const [visits, setVisits] = useState(0);
  
  useEffect(() => {
    // Bandera para evitar actualizar el estado si el componente se desmonta
    let isMounted = true;

    async function updateVisits() {
      try {
        // Referencia al documento de visitas (ID del blog)
        const visitsRef = doc(db, "visitas", id);
        const docSnap = await getDoc(visitsRef);
        let newCount;
        
        if (docSnap.exists()) {
          // Incrementamos de forma atómica el valor de visitas
          await updateDoc(visitsRef, { visitas: increment(1) });
          const updatedSnap = await getDoc(visitsRef);
          newCount = updatedSnap.data().visitas;
        } else {
          // Si no existe, lo creamos inicializando visitas en 1
          await setDoc(visitsRef, { visitas: 1 });
          newCount = 1;
        }
        
        // Solo actualizamos el estado si el componente sigue montado
        if (isMounted) {
          setVisits(newCount);
        }
      } catch (error) {
        console.error("Error actualizando visitas:", error);
      }
    }

    updateVisits();
    
    // Cleanup: en caso de desmontarse, evitamos actualizar el estado
    return () => {
      isMounted = false;
    };
  }, [id]);

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
                {/* Se muestra el contador de visitas */}
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
        </div>
      </div>
    </Layout>
  );
}
