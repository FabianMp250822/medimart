"use client";

import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
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
} from "react-icons/fa";

export default function BlogDetailsClient({ blogData, recentBlogs }) {
  const router = useRouter();

  const { id, title, content, image, author, date } = blogData;

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

                {/* Botones de compartir */}
                <div className="share-icons mt-4 d-flex justify-content-end">
                  <span className="mr-3 font-weight-bold">Comparte este blog:</span>

                  <FacebookShareButton url={fullUrl} quote={title} hashtag={`#${title.replace(/ /g, "")}`}>
                    <FaFacebookF size={24} className="mx-2 text-primary" />
                  </FacebookShareButton>

                  <TwitterShareButton url={fullUrl} title={title} hashtags={[title.replace(/ /g, "")]}>
                    <FaTwitter size={24} className="mx-2 text-info" />
                  </TwitterShareButton>

                  <LinkedinShareButton url={fullUrl} title={title} summary={content?.substring(0, 150)}>
                    <FaLinkedinIn size={24} className="mx-2 text-primary" />
                  </LinkedinShareButton>

                  <WhatsappShareButton url={fullUrl} title={title}>
                    <FaWhatsapp size={24} className="mx-2 text-success" />
                  </WhatsappShareButton>
                </div>
              </header>

              {/* Imagen principal */}
              {image && <img src={image} alt={title} className="img-fluid blog-image" />}

              {/* Contenido HTML del blog */}
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
}
