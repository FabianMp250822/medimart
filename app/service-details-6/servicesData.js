const servicesData = [
    {
        title: "Internación",
        subservices: [
           
            { name: "Cuidado Intensivo", url: "/cuidado-intensivo" },
            { name: "Cuidado Crítico", url: "/cuidado-critico" },
            { name: "Hospitalización", url: "/hospitalizacion" },
            { name: "Atención Integral y Especializada para Pacientes con VIH/SIDA", url: "/atencion-expecializada-pacientes-VIH" },
       
        ]
    },
    {
        title: "Quirúrgicos",
        subservices: [
            { name: "Cirugía", url: "/cirugia" },
            { name: "Cirugía De Cabeza Y Cuello", url: "/cirugia-de-cabeza-y-cuello" },
            { name: "Cirugía Cardiovascular", url: "/cirugia-cardiovascular" },
            { name: "Cirugía General", url: "/cirugia-general" },
            { name: "Cirugía Ginecológica", url: "/cirugia-ginecologica" },
            { name: "Cirugía Maxilofacial", url: "/cirugia-maxilofacial" },
            { name: "Cirugía Oftalmológica", url: "/cirugia-oftalmologica" },
            { name: "Cirugía Otorrinolaringología", url: "/cirugia-otorrinolaringologia" },
            { name: "Cirugía Oncológica", url: "/cirugia-oncologica" },
            { name: "Cirugía Oral", url: "/cirugia-oral" },
            { name: "Cirugía Pediátrica", url: "/cirugia-pediatrica" },
            { name: "Cirugía Plástica Y Estética", url: "/cirugia-plastica-y-estetica" },
            { name: "Cirugía Plástica Oncológica", url: "/cirugia-plastica-oncologica" },
            { name: "Cirugía De Mama Y Tumores Tejidos Blandos", url: "/cirugia-de-mama-y-tumores-tejidos-blandos" },
            { name: "Cirugía Vascular Y Angiológica", url: "/cirugia-vascular-y-angiologica" },
            { name: "Cirugía Urológica", url: "/cirugia-urologica" },
            { name: "Cirugía Endovascular Neurológica", url: "/cirugia-endovascular-neurologica" },
            { name: "Cirugía Oncológica Pediátrica", url: "/cirugia-oncologica-pediatrica" },
            { name: "Cirugía De La Mano", url: "/cirugia-de-mano" },
            { name: "Cirugía Dermatológica", url: "/cirugia-dermatologica" },
            { name: "Cirugía De Tórax", url: "/cirugia-de-torax" },
            { name: "Cirugía Ortopédica", url: "/cirugia-ortopedica" },
            { name: "Cirugía Gastrointestinal", url: "/cirugia-gastrointestinal" },
            { name: "Neurocirugía", url: "/neurocirugia" }
        ]
    },
    {
        title: "Consulta Externa",
        subservices: [
            { name: "Consulta Externa", url: "/consulta-externa" },
           { name: "Cardiologia Pediatrica", url: "/cardiologia-pediatrica" },
            { name: "Cardiología", url: "/cardiologia" },
           // { name: "Dolor Y Cuidados Paliativos", url: "/dolor-y-cuidados-paliativos" },
          //  { name: "Endocrinología", url: "/endocrinologia" },
           // { name: "Endodoncia", url: "/endodoncia" },
            //{ name: "Enfermería", url: "/enfermeria" },
           // { name: "Estomatología", url: "/estomatologia" },
            { name: "Gastroenterología", url: "/gastroenterologia" },
           // { name: "Genética", url: "/genetica" },
          //  { name: "Ginecobstetricia", url: "/ginecobstetricia" },
            // { name: "Hematología", url: "/hematologia" },
            { name: "Infectología", url: "/infectologia" },
            { name: "Inmunología", url: "/inmunologia" },
            { name: "Medicina Familiar", url: "/medicina-familiar" },
            { name: "Medicina Física Y Rehabilitación", url: "/medicina-fisica-y-rehabilitacion" },
            { name: "Medicina General", url: "/medicina-general" },
            { name: "Medicina Interna", url: "/medicina-interna" },
            { name: "Nefrología", url: "/nefrologia" },
            { name: "Neumología", url: "/neumologia" },
            { name: "Neurología", url: "/neurologia" },
            { name: "Nutrición Y Dietética", url: "/nutricion-y-dietetica" },
            { name: "Odontología General", url: "/odontologia-general" },
            { name: "Oncología Clínica", url: "/oncologia-clinica" },
            { name: "Ortodoncia", url: "/ortodoncia" },
            { name: "Ortopedia Y/O Traumatología", url: "/ortopedia-y-traumatologia" },
            { name: "Pediatría", url: "/pediatria" },
            { name: "Periodoncia", url: "/periodoncia" },
            { name: "Psiquiatría", url: "/psiquiatria" },
            { name: "Rehabilitación Oral", url: "/rehabilitacion-oral" },
            { name: "Reumatología", url: "/reumatologia" },
            { name: "Toxicología", url: "/toxicologia" },
            { name: "Urología", url: "/urologia" },
           // { name: "Otras Consultas De Especialidad", url: "/otras-consultas-de-especialidad" },
            { name: "Medicina Nuclear", url: "/medicina-nuclear" },
            { name: "Nefrología Pediátrica", url: "/nefrologia-pediatrica" },
            { name: "Neonatología", url: "/neonatologia" },
            { name: "Neumología Pediátrica", url: "/neumologia-pediatrica" },
            { name: "Neuropediatría", url: "/neuropediatria" },
            // { name: "Oncología Y Hematología Pediátrica", url: "/oncologia-y-hematologia-pediatrica" },
            { name: "Urología Oncológica", url: "/urologia-oncologica" },
            { name: "Hematología Oncológica", url: "/hematologia-oncologica" },
            { name: "Radioterapia", url: "/service-details/radioterapia" },
            { name: "Ortopedia Pediátrica", url: "/ortopedia-pediatrica" },
            { name: "Vacunación", url: "/vacunacion" }
        ]
    },
    {
        title: "Apoyo diagnóstico y complementación terapéutica",
        subservices: [
           // { name: "Patología", url: "/patologia" },
            { name: "Laboratorio de Patología", url: "/laboratorio-patologia" },
            { name: "Gestión Pre-Transfusional", url: "/gestion-pre-transfusional" },
            { name: "Imágenes Diagnósticas", url: "/imagenes-diagnosticas" },
          //  { name: "Imágenes Diagnósticas - Ionizantes", url: "/imagenes-diagnosticas-ionizantes" },
            { name: "Hemodinamia E Intervencionismo", url: "/hemodinamia-e-intervencionismo" },
            { name: "Diagnóstico Vascular", url: "/diagnostico-vascular" },
            { name: "Fisioterapia", url: "/fisioterapia" },
           // { name: "Diálisis Peritoneal", url: "/dialisis-peritoneal" },
            { name: "Hemodiálisis", url: "/hemodialisis" },
            { name: "Laboratorio De Histotecnología", url: "/laboratorio-de-histotecnologia" },
           // { name: "Terapia Respiratoria", url: "/terapia-respiratoria" },
            { name: "Laboratorio Citologías Cérvico-Uterinas", url: "/laboratorio-citologias-cervico-uterinas" },
            { name: "Servicio Farmacéutico", url: "/servicio-farmaceutico" },
            // { name: "Toma De Muestras De Laboratorio Clínico", url: "/toma-de-muestras-de-laboratorio-clinico" },
            { name: "Quimioterapia", url: "/quimioterapia" },
            { name: "Laboratorio Clínico", url: "/laboratorio-clinico" },
           // { name: "Toma De Muestras De Cuello Uterino Y Ginecológicas", url: "/toma-de-muestras-de-cuello-uterino-y-ginecologicas" },
           // { name: "Imágenes Diagnósticas - No Ionizantes", url: "/imagenes-diagnosticas-no-ionizantes" },
            { name: "Medicina Nuclear", url: "/medicina-nuclear" },
         //   { name: "Radioterapia", url: "/radioterapia" },
          //  { name: "Terapia Ocupacional", url: "/terapia-ocupacional" },
            { name: "Fonoaudiología Y/O Terapia Del Lenguaje", url: "/fonoaudiologia-y-terapia-del-lenguaje" }
        ]
    },
    {
        title: "Atención Inmediata",
        subservices: [
            { name: "Atención Del Parto", url: "/atencion-del-parto" },
            { name: "Urgencias", url: "/urgencia" },
            { name: "Transporte Asistencial Medicalizado", url: "/transporte-asistencial-medicalizado" },
            { name: "Atención Prehospitalaria", url: "/atencion-prehospitalaria" }
        ]
    },
    {
        title: "Otros Programas", 
        subservices: [ 
            { name: "Trasplantes", url: "/service-details/trasplantes" },
            { name: "Atención de Pacientes con Dolor Torácico", url: "/atencion-de-acientes-con-dolor-toracico" },
            { name: "PET-CT", url: "/PET-CT" },
            { name: "Manejo Integral del Paciente Hematoncológico", url: "/manejo-integral-del-paciente-hematoncologico" }
        ]
    }
];

export default servicesData;
