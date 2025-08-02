import Image from 'next/image';
import type { FC } from 'react';

export const Logo: FC = () => {
  return (
    <div className="flex items-center">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2FChatGPT%20Image%2031%20jul%202025%2C%2023_17_13.png?alt=media&token=67a7820a-9219-41ef-8d56-0d50ee82bb1c"
        alt="Clínica de la Costa Logo"
        width={512}
        height={133}
        priority
        className="h-10 w-auto sm:h-12"
      />
    </div>
  );
};
