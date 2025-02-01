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
  const router = useRouter();

  const { id, title, content, image, author, date } = blogData;

  // Estado para almacenar el número de visitas
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    async function updateVisits() {
      // Referencia al documento de visitas con el ID del blog
      const visitsRef = doc(db, "visitas", id);
      const docSnap = await getDoc(visitsRef);

      if (docSnap.exists()) {
        // Incrementamos el campo "visitas" en 1
        await updateDoc(visitsRef, { visitas: increment(1) });
        // Obtenemos el valor actualizado
        const updatedSnap = await getDoc(visitsRef);
        setVisits(updatedSnap.data().visitas);
      } else {
        // Si el documento no existe, lo creamos con valor inicial 1
        await setDoc(visitsRef, { visitas: 1 });
        setVisits(1);
      }
    }

    updateVisits();
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

                {/* Mostramos el contador de visitas */}
                <p>Visitas: <strong>{visits}</strong></p>

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
