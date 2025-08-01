import Image from 'next/image';
import type { FC } from 'react';

export const Logo: FC = () => {
  return (
    <div className="flex items-center">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Flogo%20(1).png?alt=media&token=961c0f8e-b866-47fd-b4a1-d942f2011f82"
        alt="Clínica de la Costa Logo"
        width={180}
        height={50}
        priority
        className="h-auto"
        style={{ width: 'auto', height: '50px' }}
      />
    </div>
  );
};
