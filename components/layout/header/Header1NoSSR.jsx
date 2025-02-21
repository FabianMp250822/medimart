import dynamic from "next/dynamic";

// Importa tu Header1 original dinámicamente, desactivando SSR
const Header1NoSSR = dynamic(() => import("./Header1"), {
  ssr: false,
});

export default Header1NoSSR;
