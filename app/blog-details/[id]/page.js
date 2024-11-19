'use client';

import { useParams, useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BlogDetails() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const structuredContent = parseContent(data.content);
          setBlogData({ ...data, content: structuredContent });
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
        const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title }));
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

  function parseContent(text) {
    const structure = [];
    const lines = text.split(/(?=\n|\t|\s{4})/g); // Divide en líneas o secciones
    let currentList = [];
  
    lines.forEach((line) => {
      line = line.trim(); // Elimina espacios innecesarios
  
      if (line.startsWith("Conclusión") || line.startsWith("El papel") || line.startsWith("Beneficios")) {
        structure.push({ type: "title", text: line });
      } else if (line.startsWith("    ")) {
        // Viñetas
        currentList.push(line.replace(/^    /, "")); // Agrega a la lista actual
      } else if (line.startsWith('"')) {
        // Frases entrecomilladas
        structure.push({ type: "quote", text: line });
      } else if (currentList.length > 0) {
        // Cierra listas si se detecta otra cosa
        structure.push({ type: "list", items: currentList });
        currentList = [];
        structure.push({ type: "paragraph", text: line });
      } else {
        // Resto de párrafos
        structure.push({ type: "paragraph", text: line });
      }
    });
  
    if (currentList.length > 0) {
      structure.push({ type: "list", items: currentList }); // Agrega lista final
    }
  
    return structure;
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

  return (
    <Layout headerStyle={2} footerStyle={1}>
      <div className="container mt-5">
        <div className="row">
          {/* Contenido principal del blog */}
          <div className="col-lg-8">
            <div className="blog-details">
              <div className="blog-header">
                <h1>{title}</h1>
                <p>
                  Por <span className="author">{author || 'Admin'}</span> el{' '}
                  <span className="date">
                    {new Date(date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </div>
              <img
                src={image || 'https://via.placeholder.com/800x400'}
                alt={title}
                className="blog-image"
              />
              <div className="blog-content">
                {content.map((item, index) => {
                  if (item.type === "title") {
                    return <h2 key={index}>{item.text}</h2>;
                  }
                  if (item.type === "subtitle") {
                    return <h3 key={index}>{item.text}</h3>;
                  }
                  if (item.type === "paragraph") {
                    return <p key={index}>{item.text}</p>;
                  }
                  if (item.type === "list") {
                    return (
                      <ul key={index}>
                        {item.items.map((listItem, listIndex) => (
                          <li key={listIndex}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (item.type === "quote") {
                    return <blockquote key={index}>{item.text}</blockquote>;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Sidebar con los últimos blogs */}
          <div className="col-lg-4">
            <aside className="sidebar">
              <h4>Últimos Blogs</h4>
              <ul>
                {recentBlogs.map((blog) => (
                  <li key={blog.id}>
                    <a href={`/blog-details/${blog.id}`}>{blog.title}</a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-details {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .blog-header h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .blog-header p {
          font-size: 1rem;
          color: #6c757d;
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
          margin-bottom: 20px;
        }
        .blog-content h2,
        .blog-content h3 {
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .blog-content p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 15px;
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
          border-left: 5px solid #ccc;
          padding-left: 10px;
          margin: 20px 0;
        }
        .sidebar {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .sidebar h4 {
          font-size: 1.5rem;
          margin-bottom: 15px;
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
      `}</style>
    </Layout>
  );
}
