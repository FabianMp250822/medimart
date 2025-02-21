"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation();

  // Menú "Nosotros"
  const nosotrosMenuItems = [
    {
      title: t("acercaDeNosotros"), // <-- nueva clave
      link: "/service-details-3",
    },
    { title: t("trabajaConNosotros"), link: "/trabaja-con-nosotros" },
    { title: t("gestionDocumental"), link: "/service-details-2" },
    { title: t("certificaciones"), link: "/certificaciones" },
    { title: t("responsabilidadSocial"), link: "/responsabilidad-social" },
    { title: t("direccionamientoEstrategico"), link: "/direccionamiento-estrategico" },
    { title: t("marcoLegal"), link: "/marco-legal" },
    { title: t("sistemaIntegradoDeGestion"), link: "/sistema-integrado-de-gestion" },
    { title: t("politicaDeDatos"), link: "/politica-de-datos" },
  ];

  // Menú "Pacientes"
  const pacientesMenuItems = [
    { title: t("solicitarCitaMedica"), link: "/appointment" },
    { title: t("preparacionProcedimientos"), link: "/procedimientos" },
    {
      title: t("directorioEspecialidadesServicios"),
      link: "/directorio-especialistas",
    },
    { title: t("tusResultadosMedicos"), link: "/reclamar-resultados" },
    { title: t("laboratorioClinico"), link: "/laboratorio-clinico" },
    { title: t("preparacionExamenes"), link: "/preparacion-examenes" },
    { title: t("entidadesConvenio"), link: "/entidades-convenio" },
    { title: t("solicitudHistoriaClinica"), link: "/solicitud-historia-clinica" },
    { title: t("derechosDeberesPaciente"), link: "/derechos-y-deberes" },
    { title: t("duranteSuVisita"), link: "/durante-visita" },
    { title: t("educacionAlPaciente"), link: "/educacion-paciente" },
  ];

  return (
    <>
      <ul className="navigation clearfix">
        {/* Menú principal */}
        <li className="dropdown">
          <Link href="/">{t("inicio")}</Link>
        </li>

        {/* Sección "Nosotros" */}
        <li className="dropdown">
          <Link href="#">{t("nosotros")}</Link>
          <ul className="nosotros-submenu">
            {nosotrosMenuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Sección "Servicios" */}
        <li className="dropdown">
          <Link href="/service-details-6">{t("servicios")}</Link>
        </li>

        {/* Sección "Pacientes" */}
        <li className="dropdown">
          <Link href="#">{t("pacientes")}</Link>
          <ul className="pacientes-submenu">
            {pacientesMenuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Sección "Equipo / Especialistas" */}
        <li className="dropdown">
          <Link href="/team">{t("especialistas")}</Link>
        </li>

        {/* Sección "Preguntas Frecuentes" */}
        <li>
          <Link href="/faq">{t("faqs")}</Link>
        </li>

        {/* Sección "Contacto" */}
        <li>
          <Link href="/contact">{t("contacto")}</Link>
        </li>
      </ul>

      <style jsx>{`
        .nosotros-submenu,
        .pacientes-submenu {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 10px;
          background-color: #f9f9f9;
          min-width: 400px;
        }

        .nosotros-submenu li,
        .pacientes-submenu li {
          list-style: none;
        }

        .nosotros-submenu li a,
        .pacientes-submenu li a {
          color: #333;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .nosotros-submenu li a:hover,
        .pacientes-submenu li a:hover {
          color: #2563eb;
        }
      `}</style>
    </>
  );
}
