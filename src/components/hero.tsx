import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative w-full h-[550px]">
      <Image
        src="https://placehold.co/1200x600.png"
        alt="Interior de la clínica"
        fill
        className="object-cover"
        data-ai-hint="hospital interior"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-12 text-white">
        {/* Content over the image can be added here if needed */}
      </div>
    </div>
  );
}
