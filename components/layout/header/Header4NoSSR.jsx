import dynamic from "next/dynamic";

// Importa tu Header1 original dinámicamente, desactivando SSR
const Header4NoSSR = dynamic(() => import("./Header4"), {
  ssr: false,
});

export default Header4NoSSR;
