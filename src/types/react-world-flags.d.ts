declare module 'react-world-flags' {
  import { ComponentType } from 'react';

  interface FlagProps {
    code?: string;
    height?: number | string;
    width?: number | string;
    className?: string;
    style?: React.CSSProperties;
    fallback?: React.ReactNode;
  }

  const Flag: ComponentType<FlagProps>;
  export default Flag;
}
