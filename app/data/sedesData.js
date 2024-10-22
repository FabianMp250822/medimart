
import { db } from '@/lib/firebase';
import { setDoc, doc } from 'firebase/firestore';

const sedesData = {
  Barranquilla: {
    nombre: "Clínica de la Costa - Barranquilla",
    direccion: "Calle 85 #47-11, Barranquilla",
    telefono: "+57 5 3855555",
    whatsappNumber: "+573003456789",
    whatsappMessage: "Hola, me gustaría saber más sobre las consultas disponibles en la Clínica de la Costa en Barranquilla.",
    servicios: ["Radioterapia", "Urgencias 24h", "Consultas Médicas Especializadas"],
    image: "/assets/images/banner/banner.webp",
    modalImage: "/assets/images/sedes/barranquilla.png",
    mensaje: "En la Clínica de la Costa Barranquilla, sabemos que en los momentos más importantes de tu salud, necesitas un equipo que te acompañe con calidez y humanidad. Nuestro compromiso es brindarte atención personalizada, asegurando que te sientas en un entorno seguro y de confianza en cada paso de tu recuperación"
  },
  Cartagena: {
    nombre: "Clínica de la Costa - Cartagena",
    direccion: "Calle 23 # 65 - 103 Blas de lezo",
    telefono: "+57 5 6654321",
    whatsappNumber: "+57314 4182091",
    whatsappMessage: "Hola, me gustaría saber más sobre las consultas disponibles en la Clínica de la Costa en Cartagena.",
    servicios: [
      "HOSPITALIZACIÓN PACIENTE CRÓNICO CON VENTILADOR",
      "HOSPITALIZACIÓN PACIENTE CRÓNICO SIN VENTILADOR",
      "ENFERMERÍA",
      "GINECOBSTETRICIA",
      "INFECTOLOGÍA",
      "MEDICINA FÍSICA Y REHABILITACIÓN",
      "MEDICINA GENERAL",
      "MEDICINA INTERNA",
      "NUTRICIÓN Y DIETÉTICA",
      "ODONTOLOGÍA GENERAL",
      "PEDIATRÍA",
      "PSICOLOGÍA",
      "PSIQUIATRÍA",
      "OTRAS CONSULTAS DE ESPECIALIDAD",
      "NEUROPEDIATRÍA",
      "VACUNACIÓN",
      "LABORATORIO CLÍNICO",
      "TOMA DE MUESTRAS DE LABORATORIO CLÍNICO",
      "SERVICIO FARMACÉUTICO",
      "TERAPIA OCUPACIONAL",
      "TERAPIA RESPIRATORIA",
      "FISIOTERAPIA",
      "FONOAUDIOLOGÍA Y/O TERAPIA DEL LENGUAJE",
      "TRANSPORTE ASISTENCIAL BASICO",
      "TRANSPORTE ASISTENCIAL MEDICALIZADO"
    ],
    image: "/assets/images/sedes/Cartagena.png",
    modalImage: "/assets/images/sedes/Cartagena.png",
    mensaje: "En la Clínica de la Costa Cartagena, entendemos que cuidar de tu salud significa más que un tratamiento. Nuestro equipo está dedicado a ofrecerte una atención cálida y cercana, creando un ambiente seguro y confiable para que siempre te sientas acompañado y en las mejores manos."
  },
  "Santa Marta": {
    nombre: "Clínica de la Costa - Santa Marta",
    direccion: "Calle 17 # 20 - 10 Barrio Jardin, Santa Marta",
    telefono: "+57 3112097409",
    whatsappNumber: "+573112097409",
    whatsappMessage: "Hola, me gustaría saber más sobre las consultas disponibles en la Clínica de la Costa en Santa Marta.",
    servicios: ["Consulta Externa", "Radioterapia", "Laboratorio Clínico"],
    image: "/assets/images/sedes/Santamartha.jpeg",
    modalImage: "/assets/images/sedes/Santamartha.jpeg",
    mensaje: "En la Clínica de la Costa Santa Marta, nos comprometemos a brindarte un cuidado integral, centrado en tus necesidades. Nuestro equipo médico ofrece un servicio personalizado y humano, garantizando que te sientas en un entorno de confianza, seguro y acogedor durante tu tratamiento."
  },
  Rioacha: {
    nombre: "Clínica de la Costa - Rioacha",
    direccion: "Calle 51 N 4/15 kL 2 salida valle dupar",
    telefono: "+57 3218085712",
    whatsappNumber: "+573218085712",
    whatsappMessage: "Hola, me gustaría saber más sobre las consultas disponibles en la Clínica de la Costa en Rioacha.",
    servicios: ["Hospitalización", "Pediatría", "Cirugía"],
    image: "/assets/images/sedes/rioacha.jpeg",
    modalImage: "/assets/images/sedes/rioacha.jpeg",
    mensaje: "En la Clínica de la Costa Valledupar, trabajamos para que tu experiencia médica sea excepcional. Nuestro equipo altamente calificado te brindará una atención cercana y personalizada, asegurando que te sientas en un entorno confiable, seguro y con el apoyo que necesitas para tu bienestar."
  }
};

// Subir los datos a Firestore
const subirDatos = async () => {
  try {
    for (const sede in sedesData) {
      await setDoc(doc(db, "sedes", sede), sedesData[sede]);
    }
    console.log("Datos de las sedes subidos correctamente");
  } catch (error) {
    console.error("Error al subir los datos de las sedes:", error);
  }
};

// Ejecuta esta función cuando quieras subir los datos
subirDatos();
