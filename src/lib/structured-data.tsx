/**
 * Configuración de datos estructurados Schema.org para SEO
 * Estos datos ayudan a Google a entender el contenido de la clínica
 */

export const clinicaStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://clinica-de-la-costa.app",
  "name": "Clínica de la Costa",
  "alternateName": "Clínica de la Costa S.A.",
  "description": "Clínica líder en atención médica especializada en la Región Caribe de Colombia. Ofrecemos servicios de urgencias 24/7, hospitalización, cirugía avanzada y más de 30 especialidades médicas.",
  "url": "https://clinica-de-la-costa.app",
  "logo": "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Flogo.png?alt=media",
  "image": "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fhospitalizacion.jpg?alt=media",
  "telephone": "+57-5-3363000",
  "email": "info@clinicadelacosta.app",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 52 No. 46-102",
    "addressLocality": "Barranquilla",
    "addressRegion": "Atlántico",
    "postalCode": "080001",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.9878",
    "longitude": "-74.7889"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
      "description": "Urgencias 24/7"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "19:00",
      "description": "Consulta Externa"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card, EPS, Insurance",
  "currenciesAccepted": "COP",
  "availableLanguage": ["Spanish"],
  "medicalSpecialty": [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Surgery",
    "Dermatology",
    "Ophthalmology",
    "Gynecology",
    "Internal Medicine",
    "Urology",
    "Oncology",
    "Emergency Medicine",
    "Plastic Surgery",
    "Gastroenterology",
    "Nephrology",
    "Endocrinology",
    "Rheumatology",
    "Psychiatry",
    "Physical Therapy",
    "Nutrition"
  ],
  "sameAs": [
    "https://www.facebook.com/clinicadelacosta",
    "https://www.instagram.com/clinicadelacosta",
    "https://www.linkedin.com/company/clinicadelacosta"
  ]
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Clínica de la Costa",
  "url": "https://clinica-de-la-costa.app",
  "logo": "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Flogo.png?alt=media",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57-5-3363000",
    "contactType": "customer service",
    "areaServed": "CO",
    "availableLanguage": "Spanish"
  }
};

/**
 * Genera datos estructurados para un médico específico
 */
export function generatePhysicianSchema(medico: {
  id: string;
  nombreCompleto: string;
  especialidad: string;
  profileImage?: string;
  email?: string;
  telefono?: string;
  academicInfo?: Array<{
    gradoAcademico?: string;
    institucion?: string;
    anoGraduacion?: string;
  }>;
  professionalExperience?: Array<{
    posicion?: string;
    institucionTrabajo?: string;
    fechaInicio?: string;
    fechaFin?: string;
  }>;
}) {
  const educationalCredentials = medico.academicInfo
    ?.filter(info => info.gradoAcademico)
    .map(info => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "degree",
      "educationalLevel": info.gradoAcademico,
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": info.institucion
      },
      ...(info.anoGraduacion && { "dateCreated": info.anoGraduacion })
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `https://clinica-de-la-costa.app/especialistas/${medico.id}`,
    "name": medico.nombreCompleto,
    "honorificPrefix": "Dr.",
    "image": medico.profileImage || "https://clinica-de-la-costa.app/default-doctor.jpg",
    "jobTitle": medico.especialidad,
    "medicalSpecialty": medico.especialidad,
    "url": `https://clinica-de-la-costa.app/especialistas/${medico.id}`,
    "worksFor": {
      "@type": "MedicalClinic",
      "name": "Clínica de la Costa",
      "url": "https://clinica-de-la-costa.app",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle 52 No. 46-102",
        "addressLocality": "Barranquilla",
        "addressRegion": "Atlántico",
        "addressCountry": "CO"
      }
    },
    ...(medico.email && { "email": medico.email }),
    ...(medico.telefono && { "telephone": medico.telefono }),
    ...(educationalCredentials && educationalCredentials.length > 0 && {
      "hasCredential": educationalCredentials
    }),
    "knowsAbout": [medico.especialidad, "Medicina", "Atención al Paciente"],
    "alumniOf": medico.academicInfo
      ?.filter(info => info.institucion)
      .map(info => ({
        "@type": "EducationalOrganization",
        "name": info.institucion
      }))
  };
}

/**
 * Genera datos estructurados para un artículo de blog
 */
export function generateArticleSchema(article: {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug?: string;
}) {
  // Usar slug si existe, generar desde título si no
  const slug = article.slug || article.title
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || article.id;
    
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://clinica-de-la-costa.app/noticias/${slug}`,
    "headline": article.title,
    "image": article.image,
    "datePublished": new Date(article.date).toISOString(),
    "dateModified": new Date(article.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Clínica de la Costa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Flogo.png?alt=media"
      }
    },
    "articleSection": article.category,
    "inLanguage": "es-CO"
  };
}

/**
 * Genera datos estructurados para un servicio médico
 */
export function generateMedicalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  alternateName?: string[]; // Nombres alternativos para ayudar a Google a entender variaciones
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "MedicalClinic",
      "name": "Clínica de la Costa",
      "url": "https://clinica-de-la-costa.app"
    }
  };

  // Agregar nombres alternativos si existen (ayuda a Google con búsquedas coloquiales)
  if (service.alternateName && service.alternateName.length > 0) {
    schema.alternateName = service.alternateName;
  }

  return schema;
}

/**
 * Componente para inyectar JSON-LD en el head
 */
export function StructuredData({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : [data])
      }}
    />
  );
}
