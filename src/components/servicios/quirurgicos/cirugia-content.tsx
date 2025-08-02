"use client";

import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const bannerImages = [
    "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551",
    "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94",
];

export function CirugiaContent() {
    return (
        <Card className="overflow-hidden relative">
            <Carousel
                plugins={[Autoplay({ delay: 5000 })]}
                opts={{ loop: true }}
                className="w-full"
            >
                <CarouselContent>
                    {bannerImages.map((src, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-64 sm:h-80 md:h-96 w-full">
                                <Image
                                    src={src}
                                    alt={`Sala de Cirugía ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="z-0"
                                    priority={index === 0}
                                    data-ai-hint="operating room"
                                />
                                <div className="absolute inset-0 bg-black/40 z-10" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-white text-center">
                <h1 className="text-3xl md:text-5xl font-bold max-w-4xl drop-shadow-lg">Servicios Quirúrgicos y Cirugía Ambulatoria</h1>
            </div>
        </Card>
    );
}
