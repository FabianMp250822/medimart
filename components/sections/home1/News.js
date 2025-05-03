"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function News() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsSnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const visitasSnapshot = await getDocs(collection(db, "visitas"));
        const visitasData = visitasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const mergedData = blogsData.map((blog) => {
          const found = visitasData.find((v) => v.id === blog.id);
          return {
            ...blog,
            visits: found?.visitas || 0,
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

  const cleanText = (text) => {
    if (!text) return "";
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const truncateText = (text, maxLength) => {
    const clean = cleanText(text);
    return clean.length > maxLength ? clean.substring(0, maxLength) + "..." : clean;
  };

  if (loading) {
    return <p>{t("cargandoArticulos")}</p>;
  }

  if (!blogs || blogs.length === 0) {
    return <p>{t("noHayArticulosDisponibles")}</p>;
  }

  // Ordenar por visitas (desc) y tomar los 3 primeros
  const sortedByVisits = [...blogs].sort((a, b) => b.visits - a.visits);
  const topThree = sortedByVisits.slice(0, 3);

  return (
    <section className="news-section sec-pad bg-color-1">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <h2>
            {t("consultaNuestrosArticulosRecientes")}
          </h2>
        </div>

        <div className="row clearfix">
          {topThree.map((blog) => (
            <div
              key={blog.id}
              className="col-lg-4 col-md-6 col-sm-12 news-block"
              style={{ marginBottom: "30px" }}
            >
              <div
                className="news-block-one wow fadeInUp animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
                style={{
                  minHeight: "450px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="inner-box"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <figure
                    className="image-box"
                    style={{
                      height: "200px",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Link href={`/blog-details/${blog.id}`}>
                      <img
                        src={blog.image}
                        alt={cleanText(blog.title)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </figure>

                  <div
                    className="lower-content"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >
                    <div>
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
                      </ul>
                      <h3 style={{ marginBottom: "10px" }}>
                        <Link href={`/blog-details/${blog.id}`}>
                          {cleanText(blog.title)}
                        </Link>
                      </h3>
                      <p style={{ marginBottom: "15px" }}>
                        {truncateText(blog.content, 150)}
                      </p>
                    </div>
                    <div className="link">
                      <Link href={`/blog-details/${blog.id}`}>
                        <span>{t("leerMas")}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "30px" }}>
          <Link href="/blog-2" className="theme-btn btn-one">
            <span>{t("verMas")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
