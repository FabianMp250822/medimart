import dynamic from "next/dynamic";

// Importa tu Header1 original dinámicamente, desactivando SSR
const Header3NoSSR = dynamic(() => import("./Header3"), {
  ssr: false,
});

export default Header3NoSSR;
