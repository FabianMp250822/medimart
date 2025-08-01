import type { FC } from 'react';

export const Logo: FC = () => {
  return (
    <div className="flex flex-col items-start font-headline leading-none">
      <span className="text-2xl lg:text-3xl font-bold tracking-tighter text-primary">CLÍNICA</span>
      <span className="text-2xl lg:text-3xl font-bold tracking-tighter text-accent">DE LA COSTA</span>
    </div>
  );
};
