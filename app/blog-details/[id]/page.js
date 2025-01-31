import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";
import BlogDetailsClient from "./BlogDetailsClient";

// 1️⃣ Generamos las metaetiquetas de Open Graph para Facebook, Twitter y LinkedIn
export async function generateMetadata({ params }) {
  const { id } = params;

  // Obtenemos el blog desde Firestore
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {};
  }

  const blogData = docSnap.data();

  // Generamos una descripción corta
  const textContent = blogData.content?.replace(/<[^>]+>/g, "") || "";
  const summary = textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");

  // URL absoluta de la imagen (ajusta a tu dominio real)
  const imageUrl = blogData.image || "https://www.clinicadelacosta.com/assets/images/default-image.jpg";

  // URL completa del blog
  const blogUrl = `https://www.clinicadelacosta.com/blog-details/${id}`;

  return {
    title: blogData.title,
    description: summary,
    openGraph: {
      title: blogData.title,
      description: summary,
      type: "article",
      url: blogUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: blogData.title }],
      siteName: "Clínica de la Costa",
    },
    twitter: {
      card: "summary_large_image",
      title: blogData.title,
      description: summary,
      images: [imageUrl],
    },
  };
}

// 2️⃣ Obtenemos el blog y los blogs recientes en SSR
export default async function BlogDetailsPage({ params }) {
  const { id } = params;

  // Buscamos el blog en Firestore
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const blogData = { id: docSnap.id, ...docSnap.data() };

  // Obtenemos blogs recientes
  const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  const recentBlogs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return <BlogDetailsClient blogData={blogData} recentBlogs={recentBlogs} />;
}
