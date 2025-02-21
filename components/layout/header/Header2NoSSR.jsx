import dynamic from "next/dynamic";

// Importa tu Header1 original dinámicamente, desactivando SSR
const Header2NoSSR = dynamic(() => import("./Header2"), {
  ssr: false,
});

export default Header2NoSSR;
