import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import BlogDetailsClient from "./BlogDetailsClient";

export async function generateMetadata({ params }) {
  const { id } = params;

  // Obtenemos el blog desde Firestore
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {};
  }

  const blogData = docSnap.data();

  // Generamos una descripción corta eliminando etiquetas HTML
  const textContent = blogData.content?.replace(/<[^>]+>/g, "") || "";
  const summary = textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");

  // URL absoluta de la imagen (asegúrate de que sea pública y accesible)
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
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl, // Asegura que se use una URL segura (HTTPS)
          width: 1200,
          height: 630,
          alt: blogData.title,
        },
      ],
      siteName: "Clínica de la Costa",
      "fb:app_id": "1152616312324082",
    },
    twitter: {
      card: "summary_large_image",
      title: blogData.title,
      description: summary,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { id } = params;

  // Buscamos el blog en Firestore
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const blogData = { id: docSnap.id, ...docSnap.data() };

  return <BlogDetailsClient blogData={blogData} />;
}
